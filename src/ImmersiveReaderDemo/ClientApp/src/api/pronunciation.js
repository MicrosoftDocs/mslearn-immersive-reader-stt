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
    if (!response.ok) {
      throw Error(response.statusText);
    }
  }
  try {
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
