# Immersive Reader Demo

This repo contains the code for the MS Learn Immersive Reader Demo.

## Pre-requisites

- [Node >=12](https://nodejs.org)
- [.Net Core 5](https://dotnet.microsoft.com/download/dotnet/5.0)

## Getting started

The first thing you need to do is add various secrets to your app replacing the values in `{}` from the Azure Portal:

```
cd src
dotnet user-secrets set ImmersiveReader:SubDomain "{immersiveReaderSubDomain}"
dotnet user-secrets set ImmersiveReader:ClientId "{immersiveReaderClientId}"
dotnet user-secrets set ImmersiveReader:TenantId "{immersiveReaderTenantId}"
dotnet user-secrets set ImmersiveReader:ClientSecret "{immersiveReaderClientSecret}"
dotnet user-secrets set SpeechService:Region "{speechServiceApiKey}"
dotnet user-secrets set SpeechService:ApiKey "{speechServiceApiKey}"
```

To run the app with live reload run the following:

```bash
cd src
dotnet watch run
```

To publish the app:

```bash
cd src
dotnet publish
```

## Create the Azure Resources

An Immersive Reader resource configured for Azure Active Directory authentication is required.

1. Sign in to [Azure Cloud Shell](https://shell.azure.com/) if you haven't done so already.

1. In Cloud Shell, run the command provided in [these instructions](https://docs.microsoft.com/azure/cognitive-services/immersive-reader/how-to-create-immersive-reader) to create a funtion for provisioning the resources. Save the output of your session into a text file as you will need them later on.

1. Run the following command to create the resources:

```
Create-ImmersiveReaderResource `
    -SubscriptionName 'Microsoft Partner Network' `
    -ResourceName 'immersive-reader-svc' `
    -ResourceSubdomain 'immersive-reader-svc' `
    -ResourceSKU 'S0' `
    -ResourceLocation 'eastus' `
    -ResourceGroupName 'immersive-reader-demo' `
    -ResourceGroupLocation 'eastus' `
    -AADAppDisplayName 'ImmersiveReaderDemoAADApp' `
    -AADAppIdentifierUri 'https://ImmersiveReaderDemoAADApp' `
    -AADAppClientSecret 'S0meStr0ngP@ssw0rd' `
    -AADAppClientSecretExpiration '2021-12-31'
```

## Run the Sample API

1. Open **ImmersiveReaderDemo.sln** in [Visual Studio 2019](https://visualstudio.microsoft.com/downloads).

1. Open **appsettings.json**. Replace the contents of that file with the following, supplying your values as appropriate:

   ```json
   {
     "TenantId": "<YOUR_TENANT_ID>",
     "ClientId": "<YOUR_CLIENT_ID>",
     "ClientSecret": "<YOUR_CLIENT_SECRET>",
     "Subdomain": "<YOUR_SUBDOMAIN>"
   }
   ```

1. Run **Debug > Start Debugging**.

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

# Legal Notices

Microsoft and any contributors grant you a license to the Microsoft documentation and other content
in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode),
see the [LICENSE](LICENSE) file, and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the
[LICENSE-CODE](LICENSE-CODE) file.

Microsoft, Windows, Microsoft Azure and/or other Microsoft products and services referenced in the documentation
may be either trademarks or registered trademarks of Microsoft in the United States and/or other countries.
The licenses for this project do not grant you rights to use any Microsoft names, logos, or trademarks.
Microsoft's general trademark guidelines can be found at http://go.microsoft.com/fwlink/?LinkID=254653.

Privacy information can be found at https://privacy.microsoft.com/en-us/

Microsoft and any contributors reserve all other rights, whether under their respective copyrights, patents,
or trademarks, whether by implication, estoppel or otherwise.
