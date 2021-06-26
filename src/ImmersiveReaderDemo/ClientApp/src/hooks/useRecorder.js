import { useEffect, useState } from "react";

export const useRecorder = () => {
  const [audioBlob, setAudioBlob] = useState("");
  const [chunks, setChucks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else if (!isRecording && recorder.state === "recording") {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const onDataAvailable = (e) => {
      chunks.push(e.data);
      setChucks([...chunks, e.data]);
    };

    const onstop = function (e) {
      debugger;
      console.log("MediaRecorder.stop() called.");

      var audio = document.createElement("audio");
      audio.controls = true;
      var blob = new Blob(chunks, { type: "audio/wav; codecs=MS_PCM" });
      setAudioBlob(blob);
    };

    recorder.addEventListener("stop", onstop);
    recorder.addEventListener("dataavailable", onDataAvailable);
    return () => {
      recorder.removeEventListener("stop", onstop);
      recorder.removeEventListener("dataavailable", onDataAvailable);
    };
  }, [recorder, isRecording, chunks]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioBlob, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
