using System;

namespace ImmersiveReaderDemoAPI.Models
{
    public class ImmersiveReaderAuthOptions
    {
        /// <summary>
        /// Azure subscription TenantId
        /// </summary>
        public string TenantId { get; set; }
        
        /// <summary>
        /// Azure AD ApplicationId
        /// </summary>
        public string ClientId { get; set; }
        
        /// <summary>
        /// Azure AD Application Service Principal password
        /// </summary>
        public string ClientSecret { get; set; }
        
        /// <summary>
        /// // Immersive Reader resource subdomain (resource 'Name' if the resource was created in the Azure portal,
        /// or 'CustomSubDomain' option if the resource was created with Azure CLI Powershell. Check the Azure portal
        /// for the subdomain on the Endpoint in the resource Overview page, for example, 'https://[SUBDOMAIN].cognitiveservices.azure.com/')
        /// </summary>
        public string SubDomain { get; set; } 
        
        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(TenantId))
            {
                throw new ArgumentNullException("TenantId is null! Did you add that info to secrets.json?");
            }

            if (string.IsNullOrWhiteSpace(ClientId))
            {
                throw new ArgumentNullException("ClientId is null! Did you add that info to secrets.json?");
            }

            if (string.IsNullOrWhiteSpace(ClientSecret))
            {
                throw new ArgumentNullException("ClientSecret is null! Did you add that info to secrets.json?");
            }

            if (string.IsNullOrWhiteSpace(SubDomain))
            {
                throw new ArgumentNullException("SubDomain is null! Did you add that info to secrets.json?");
            }
        }
    }
}