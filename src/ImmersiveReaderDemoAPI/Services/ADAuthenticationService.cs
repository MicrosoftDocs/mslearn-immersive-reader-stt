using System;
using System.Threading.Tasks;
using ImmersiveReaderDemoAPI.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace ImmersiveReaderDemoAPI.Services
{
    public class ADAuthenticationService
    {
        private readonly ImmersiveReaderAuthOptions _options;

        public ADAuthenticationService(IOptions<ImmersiveReaderAuthOptions> options)
        {
            _options = options == null ? throw new ArgumentNullException(nameof(options)) : options.Value;
        }

        /// <summary>
        /// Get an Azure AD authentication token
        /// </summary>
        public async Task<string> GetTokenAsync()
        {
            string authority = $"https://login.windows.net/{_options.TenantId}";
            const string resource = "https://cognitiveservices.azure.com/";

            AuthenticationContext authContext = new AuthenticationContext(authority);
            ClientCredential clientCredential = new ClientCredential(_options.ClientId, _options.ClientSecret);

            AuthenticationResult authResult = await authContext.AcquireTokenAsync(resource, clientCredential);

            return authResult.AccessToken;
        }
    }
}