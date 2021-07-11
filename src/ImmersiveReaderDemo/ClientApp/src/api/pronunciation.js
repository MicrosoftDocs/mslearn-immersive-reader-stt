export async function postAudio(audioBlob, referenceText) {
  console.log("posting audio");
  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("referenceText", referenceText);
  const response = await fetch("/pronunciation-assessment", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(
      "Error posting audio to the pronunciation assessment endpoint."
    );
  }
  try {
    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      accuracyScore: 10.2,
      pronunciationScore: 10.2,
      completenessScore: 10.2,
      fluencyScore: 10.2,
    };
  }
}
