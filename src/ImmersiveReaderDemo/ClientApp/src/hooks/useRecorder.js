import { useEffect, useState, useRef } from "react";
import { MediaRecorder } from "extendable-media-recorder";

export const useRecorder = () => {
  const recorder = useRef(undefined);
  const stream = useRef(undefined);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(undefined);

  /**
   * Initializes the MediaStream and MediaRecorder if not already initialized
   */
  useEffect(() => {
    if (isInitialized || recorder.current !== undefined) return;

    async function initializeRecorder() {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: "audio/wav",
      });
      stream.current = mediaStream;
      recorder.current = mediaRecorder;
      setIsInitialized(true);
    }

    initializeRecorder();
  }, [isInitialized]);

  /**
   * Attaches event handlers to the the MediaRecorder once it is initialized
   */
  useEffect(() => {
    if (!isInitialized) return;

    // set chunks as available for processing when recording stops
    const onDataAvailable = (e) => {
      setAudioBlob(e.data);
    };

    if (isInitialized) {
      recorder.current.addEventListener("dataavailable", onDataAvailable);
    }
    return () => {
      recorder.current.removeEventListener("dataavailable", onDataAvailable);
    };
  }, [isInitialized, setAudioBlob]);

  /**
   * Stops and starts the MediaRecorder based on the isRecording state
   */
  useEffect(() => {
    if (!isInitialized || recorder.current === undefined) return;
    if (isRecording) {
      recorder.current.start();
    } else if (!isRecording && recorder.current.state === "recording") {
      recorder.current.stop();
    }
  }, [isInitialized, isRecording]);

  /**
   * Start the recording
   */
  const startRecording = () => {
    setIsRecording(true);
  };

  /**
   * Stop the recording
   */
  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioBlob, isInitialized, isRecording, startRecording, stopRecording];
};
