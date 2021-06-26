import { useEffect, useState } from "react";

export const useRecorder = () => {
  const [audioBlob, setAudioBlob] = useState("");
  const [chunks, setChucks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    }

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
