export async function fetchSetting() {
  const response = await fetch("/settings");
  if (!response.ok) {
    throw new Error("Error loading the access token.");
  }
  return await response.json();
}
