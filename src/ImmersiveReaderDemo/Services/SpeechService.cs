using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ImmersiveReaderDemo.Models;
using Microsoft.CognitiveServices.Speech.PronunciationAssessment;

namespace ImmersiveReaderDemo.Services
{
    public class SpeechService : IDisposable
    {
        private static readonly AudioStreamFormat AudioInputFormat = AudioStreamFormat.GetWaveFormatPCM(16000, 16, 1);

        private readonly ILogger<SpeechService> _logger;
        private readonly SpeechServiceOptions _options;
        private PushAudioInputStream _audioInputStream;

        private SpeechRecognizer _recognizer;
        private AudioConfig _streamConfig;

        public SpeechService(ILogger<SpeechService> logger, IOptions<SpeechServiceOptions> options)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _options = options.Value ?? throw new ArgumentNullException(nameof(options));
        }

        public void Dispose()
        {
            if (_recognizer != null)
            {
                _recognizer.Dispose();
                _audioInputStream.Dispose();
                _streamConfig.Dispose();
            }
        }

        public async Task<PronunciationAssessmentResult> GetPronunciationScoreAsync(string referenceText, byte[] audioData)
        {
            var speechRecognizer = GetSpeechRecognizer();

            // Create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
            var pronAssessmentConfig = new PronunciationAssessmentConfig(referenceText, GradingSystem.HundredMark, Granularity.Phoneme, false);
            pronAssessmentConfig.ApplyTo(speechRecognizer);

            _audioInputStream.Write(audioData);
            _audioInputStream.Write(new byte[0]); // send a zero-size chunk to signal the end of stream

            var result = await speechRecognizer.RecognizeOnceAsync().ConfigureAwait(false);
            if (result.Reason == ResultReason.Canceled)
            {
                var cancellationDetail = CancellationDetails.FromResult(result);
                Console.Write(cancellationDetail);
            }
            else
            {
                return PronunciationAssessmentResult.FromResult(result);
            }

            return null;
        }

        private SpeechRecognizer GetSpeechRecognizer()
        {
            if (_recognizer == null)
            {
                var config = SpeechConfig.FromSubscription(_options.ApiKey, _options.Region);

                // Creates an audio input stream.
                _audioInputStream = AudioInputStream.CreatePushStream(AudioInputFormat);
                _streamConfig = AudioConfig.FromStreamInput(_audioInputStream);

                // Creates a speech synthesizer, reuse this instance in real world applications to reduce number of connections
                _recognizer = new SpeechRecognizer(config, _streamConfig);
            }

            return _recognizer;
        }
    }
}