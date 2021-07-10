import { useEffect } from "react";

// local imports
import { useRecorder } from "../hooks";

export const Microphone = ({
  startRecordingLabel = "Record",
  stopRecordingLabel = "Stop",
  disabled,
  onRecordingAvailable,
}) => {
  let [audioBlob, isInitialized, isRecording, startRecording, stopRecording] =
    useRecorder();

  useEffect(() => {
    if (audioBlob && !isRecording) {
      onRecordingAvailable(audioBlob);
    }
  }, [audioBlob, isRecording, onRecordingAvailable]);
  return (
    <>
      <audio style={{ display: "none" }} controls />
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
