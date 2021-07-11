import { useEffect, useRef } from "react";

// local imports
import { useRecorder } from "../hooks";

export const Microphone = ({
  startRecordingLabel = "Record",
  stopRecordingLabel = "Stop",
  disabled,
  onRecordingAvailable,
}) => {
  const audioElement = useRef(undefined);
  const [audioBlob, isInitialized, isRecording, startRecording, stopRecording] =
    useRecorder();

  useEffect(() => {
    if (audioBlob && !isRecording) {
      onRecordingAvailable(audioBlob);
      if (audioElement) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const srcUrl = e.target.result;
          debugger;
          audioElement.current.src = srcUrl;
        };
        reader.readAsDataURL(audioBlob);
      }
    }
  }, [audioBlob, isRecording, onRecordingAvailable]);

  return (
    <>
      <audio ref={audioElement} controls />
      <button
        className="btn btn-primary mr-2"
        onClick={startRecording}
        disabled={!isInitialized | isRecording | disabled}
      >
        {startRecordingLabel}
      </button>
      <button
        className="btn btn-danger"
        onClick={stopRecording}
        disabled={!isInitialized | !isRecording | disabled}
      >
        {stopRecordingLabel}
      </button>
    </>
  );
};
