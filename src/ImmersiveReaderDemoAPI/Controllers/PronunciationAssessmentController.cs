using System;
using System.IO;
using System.Threading.Tasks;
using ImmersiveReaderDemoAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ImmersiveReaderDemoAPI.Controllers
{
    [ApiController]
    [Route("pronunciation-assessment")]
    public class PronunciationAssessmentController : ControllerBase
    {
        private readonly ILogger<PronunciationAssessmentController> _logger;
        private readonly SpeechService _speechService;

        public PronunciationAssessmentController(ILogger<PronunciationAssessmentController> logger, SpeechService speechService)
        {
            _logger = logger;
            _speechService = speechService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IFormFile file, [FromForm] string referenceText)
        {
            if (string.IsNullOrWhiteSpace(referenceText))
            {
                return BadRequest("referenceText is required");
            }
            
            if (file.ContentType != "audio/wav" && file.Length <= 0)
            {
                return BadRequest("You must provide a wave file");
            }

            try
            {
                var audioData = ConvertToByteArray(file);
                var result = await _speechService.GetPronunciationScoreAsync(referenceText, audioData);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError("Error analyzing file", e);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        private byte[] ConvertToByteArray(IFormFile audioFile)
        {
            using var br = new BinaryReader(audioFile.OpenReadStream());
            
            var data = br.ReadBytes((int) audioFile.OpenReadStream().Length);

            return data;
        }
    }
}