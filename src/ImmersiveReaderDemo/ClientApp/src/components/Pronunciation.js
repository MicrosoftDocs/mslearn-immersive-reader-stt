import { useState } from "react";

// local imports
import { postAudio } from "../api";
import { Microphone } from "../components";

export const Pronunciation = ({ referenceText }) => {
  const [assessmentAudio, setAssessmentAudio] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [pronunciationAssessment, setPronunciationAssessment] =
    useState(undefined);
  const onRecordingAvailable = (audioUrl) => {
    setAssessmentAudio(audioUrl);
  };
  const getResults = async () => {
    setIsLoading(true);
    const results = await postAudio(assessmentAudio, referenceText);
    setPronunciationAssessment(results);
    setIsLoading(false);
  };
  return (
    <>
      <div className="row my-5">
        <Microphone
          disabled={isLoading}
          onRecordingAvailable={onRecordingAvailable}
        />
      </div>
      <div className="row my-5">
        <button
          className="btn btn-primary"
          disabled={(assessmentAudio === undefined) | isLoading}
          onClick={() => getResults(assessmentAudio)}
        >
          Get results
        </button>{" "}
      </div>
      <div className="row my-5">
        {pronunciationAssessment ? "Success" : undefined}
      </div>
    </>
  );
};
