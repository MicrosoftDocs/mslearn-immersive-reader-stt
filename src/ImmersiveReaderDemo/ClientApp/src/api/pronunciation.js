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
  let result = undefined;
  try {
    result = await response.json();
  } catch {
    result = "Success"; // catch error if the API returns nothing so we can test the page logic
  }
  return result;
}
