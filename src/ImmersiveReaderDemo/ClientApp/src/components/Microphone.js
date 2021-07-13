import { useEffect, useRef } from "react";

// local imports
import { useRecorder } from "../hooks";

export const Microphone = ({
  startRecordingLabel = "Record",
  stopRecordingLabel = "Stop",
  playbackRecordingLabel = "Playback",
  disabled,
  onRecordingAvailable,
}) => {
  const audioElement = useRef(undefined);
  const [audioBlob, isInitialized, isRecording, startRecording, stopRecording] =
    useRecorder();

  useEffect(() => {
    if (audioBlob && !isRecording) {
      onRecordingAvailable(audioBlob);
      if (!audioElement) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const srcUrl = e.target.result;
        audioElement.current.src = srcUrl;
      };
      reader.readAsDataURL(audioBlob);
    }
  }, [audioBlob, isRecording, onRecordingAvailable]);
  return (
    <>
      <audio ref={audioElement} style={{ display: "none" }} controls />
      <button
        className="btn btn-primary mr-2"
        onClick={startRecording}
        disabled={!isInitialized | isRecording | disabled}
      >
        {startRecordingLabel}
      </button>
      <button
        className="btn btn-danger mr-2"
        onClick={stopRecording}
        disabled={!isInitialized | !isRecording | disabled}
      >
        {stopRecordingLabel}
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          if (!audioElement) return;
          debugger;
          audioElement.current.play();
        }}
        disabled={!isInitialized | !audioBlob | isRecording | disabled}
      >
        {playbackRecordingLabel}
      </button>
    </>
  );
};
