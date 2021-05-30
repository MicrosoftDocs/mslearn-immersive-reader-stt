function Create-ImmersiveReaderResource(
    [Parameter(Mandatory=$true, Position=0)] [String] $SubscriptionName,
    [Parameter(Mandatory=$true)] [String] $ResourceName,
    [Parameter(Mandatory=$true)] [String] $ResourceSubdomain,
    [Parameter(Mandatory=$true)] [String] $ResourceSKU,
    [Parameter(Mandatory=$true)] [String] $ResourceLocation,
    [Parameter(Mandatory=$true)] [String] $ResourceGroupName,
    [Parameter(Mandatory=$true)] [String] $ResourceGroupLocation,
    [Parameter(Mandatory=$true)] [String] $AADAppDisplayName="ImmersiveReaderAAD",
    [Parameter(Mandatory=$true)] [String] $AADAppIdentifierUri,
    [Parameter(Mandatory=$true)] [String] $AADAppClientSecret,
    [Parameter(Mandatory=$true)] [String] $AADAppClientSecretExpiration
)
{
    $unused = ''
    if (-not [System.Uri]::TryCreate($AADAppIdentifierUri, [System.UriKind]::Absolute, [ref] $unused)) {
        throw "Error: AADAppIdentifierUri must be a valid URI"
    }

    Write-Host "Setting the active subscription to '$SubscriptionName'"
    $subscriptionExists = Get-AzSubscription -SubscriptionName $SubscriptionName
    if (-not $subscriptionExists) {
        throw "Error: Subscription does not exist"
    }
    az account set --subscription $SubscriptionName

    $resourceGroupExists = az group exists --name $ResourceGroupName
    if ($resourceGroupExists -eq "false") {
        Write-Host "Resource group does not exist. Creating resource group"
        $groupResult = az group create --name $ResourceGroupName --location $ResourceGroupLocation
        if (-not $groupResult) {
            throw "Error: Failed to create resource group"
        }
        Write-Host "Resource group created successfully"
    }

    # Create an Immersive Reader resource if it doesn't already exist
    $resourceId = az cognitiveservices account show --resource-group $ResourceGroupName --name $ResourceName --query "id" -o tsv
    if (-not $resourceId) {
        Write-Host "Creating the new Immersive Reader resource '$ResourceName' (SKU '$ResourceSKU') in '$ResourceLocation' with subdomain '$ResourceSubdomain'"
        $resourceId = az cognitiveservices account create `
                        --name $ResourceName `
                        --resource-group $ResourceGroupName `
                        --kind ImmersiveReader `
                        --sku $ResourceSKU `
                        --location $ResourceLocation `
                        --custom-domain $ResourceSubdomain `
                        --query "id" `
                        -o tsv

        if (-not $resourceId) {
            throw "Error: Failed to create Immersive Reader resource"
        }
        Write-Host "Immersive Reader resource created successfully"
    }

    # Create an Azure Active Directory app if it doesn't already exist
    $clientId = az ad app show --id $AADAppIdentifierUri --query "appId" -o tsv
    if (-not $clientId) {
        Write-Host "Creating new Azure Active Directory app"
        $clientId = az ad app create --password $AADAppClientSecret --end-date "$AADAppClientSecretExpiration" --display-name $AADAppDisplayName --identifier-uris $AADAppIdentifierUri --query "appId" -o tsv

        if (-not $clientId) {
            throw "Error: Failed to create Azure Active Directory app"
        }
        Write-Host "Azure Active Directory app created successfully."
        Write-Host "NOTE: To manage your Active Directory app client secrets after this Immersive Reader Resource has been created please visit https://portal.azure.com and go to Home -> Azure Active Directory -> App Registrations -> $AADAppDisplayName -> Certificates and Secrets blade -> Client Secrets section" -ForegroundColor Yellow
    }

    # Create a service principal if it doesn't already exist
    $principalId = az ad sp show --id $AADAppIdentifierUri --query "objectId" -o tsv
    if (-not $principalId) {
        Write-Host "Creating new service principal"
        az ad sp create --id $clientId | Out-Null
        $principalId = az ad sp show --id $AADAppIdentifierUri --query "objectId" -o tsv

        if (-not $principalId) {
            throw "Error: Failed to create new service principal"
        }
        Write-Host "New service principal created successfully"
    }

    # Sleep for 5 seconds to allow the new service principal to propagate
    Write-Host "Sleeping for 5 seconds"
    Start-Sleep -Seconds 5

    Write-Host "Granting service principal access to the newly created Immersive Reader resource"
    $accessResult = az role assignment create --assignee $principalId --scope $resourceId --role "Cognitive Services User"
    if (-not $accessResult) {
        throw "Error: Failed to grant service principal access"
    }
    Write-Host "Service principal access granted successfully"

    # Grab the tenant ID, which is needed when obtaining an Azure AD token
    $tenantId = az account show --query "tenantId" -o tsv

    # Collect the information needed to obtain an Azure AD token into one object
    $result = @{}
    $result.TenantId = $tenantId
    $result.ClientId = $clientId
    $result.ClientSecret = $AADAppClientSecret
    $result.Subdomain = $ResourceSubdomain

    Write-Host "Success! " -ForegroundColor Green -NoNewline
    Write-Host "Save the following JSON object to a text file for future reference:"
    Write-Output (ConvertTo-Json $result)
}