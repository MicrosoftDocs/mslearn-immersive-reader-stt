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
  return await response.json();
}
