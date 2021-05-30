using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ImmersiveReaderDemoAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ImmersiveReaderDemoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ADAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(ILogger<AuthenticationController> logger, ADAuthenticationService authenticationService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            var token = await _authenticationService.GetTokenAsync();
            return Ok(token);
        }
    }
}