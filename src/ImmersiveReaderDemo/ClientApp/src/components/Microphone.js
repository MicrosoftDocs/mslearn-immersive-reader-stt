import { useEffect } from "react";

// local imports
import { useRecorder } from "../hooks";

export const Microphone = ({ disabled, onRecordingAvailable }) => {
  let [audioBlob, isRecording, startRecording, stopRecording] = useRecorder();

  useEffect(() => {
    if (audioBlob && !isRecording) {
      onRecordingAvailable(audioBlob);
    }
  }, [audioBlob, isRecording, onRecordingAvailable]);
  return (
    <>
      <audio style={{ display: "none" }} controls />
      <button
        className="btn btn-primary"
        onClick={startRecording}
        disabled={isRecording | disabled}
      >
        start recording
      </button>
      <button
        className="btn btn-danger"
        onClick={stopRecording}
        disabled={!isRecording | disabled}
      >
        stop recording
      </button>
    </>
  );
};
