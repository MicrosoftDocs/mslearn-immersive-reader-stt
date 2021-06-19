using System;
using System.Threading.Tasks;
using ImmersiveReaderDemo.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ImmersiveReaderDemo.Models;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;

namespace ImmersiveReaderDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly ADAuthenticationService _authenticationService;
        private readonly ILogger<SettingsController> _logger;
        private readonly ImmersiveReaderAuthOptions _options;

        public SettingsController(
            ILogger<SettingsController> logger,
            IOptions<ImmersiveReaderAuthOptions> options,
            ADAuthenticationService authenticationService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            _options = options.Value;
        }

        [HttpGet]
        public async Task<ActionResult<ImmersiveReaderSettingsDto>> Settings()
        {
            try
            {
                var token = await _authenticationService.GetTokenAsync();
                return Ok(new ImmersiveReaderSettingsDto()
                {
                    Token = token,
                    SubDomain = _options.SubDomain
                });
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Error getting Immersive Reader settings");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}