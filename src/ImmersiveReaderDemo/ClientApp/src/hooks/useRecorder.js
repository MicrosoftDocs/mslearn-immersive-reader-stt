import { useEffect, useState, useRef } from "react";

export const useRecorder = () => {
  const recorder = useRef(undefined);
  const stream = useRef(undefined);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(undefined);
  const [chunks, setChucks] = useState([]);

  /**
   * Initializes the MediaStream and MediaRecorder if not already initialized
   */
  useEffect(() => {
    if (isInitialized || recorder.current !== undefined) return;

    async function initializeRecorder() {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      stream.current = mediaStream;
      recorder.current = new MediaRecorder(mediaStream);
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
      chunks.push(e.data);
      setChucks([...chunks, e.data]);
    };

    // when recording stop convert chunks to blob with audio/wav and pass to setAudioBlob
    const onstop = function (e) {
      var audio = document.createElement("audio");
      audio.controls = true;
      var blob = new Blob(chunks, { type: "audio/wav; codecs=MS_PCM" });
      setAudioBlob(blob);
      setChucks([]); // reset chucks for next time
    };

    if (isInitialized) {
      recorder.current.addEventListener("stop", onstop);
      recorder.current.addEventListener("dataavailable", onDataAvailable);
    }
  }, [isInitialized, chunks]);

  /**
   * Stops and starts the MediaRecorder based on the isRecording state
   */
  useEffect(() => {
    if (isRecording) {
      recorder.current.start();
    } else if (recorder.state === "recording") {
      recorder.current.recorder.stop();
    }
  }, [isRecording]);

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
