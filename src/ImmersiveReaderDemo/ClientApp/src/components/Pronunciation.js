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
  const renderControl = () => {
    const hasAssessmentAudio = assessmentAudio !== undefined;
    const hasPronunciationAssessment = pronunciationAssessment !== undefined;
    return (
      <>
        <div className="row">
          <div className="col">
            <p>
              <Microphone
                disabled={isLoading}
                onRecordingAvailable={onRecordingAvailable}
              />
            </p>
            {hasAssessmentAudio && !hasPronunciationAssessment ? (
              <p>
                <button
                  className="btn btn-primary"
                  disabled={(assessmentAudio === undefined) | isLoading}
                  onClick={() => getResults(assessmentAudio)}
                >
                  Get results
                </button>
              </p>
            ) : null}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <h2>Pronunciation assessment</h2>
        </div>
      </div>
      {renderControl()}
      <div className="row my-5">
        <div className="col">
          {pronunciationAssessment ? "Success" : undefined}
        </div>
      </div>
    </>
  );
};