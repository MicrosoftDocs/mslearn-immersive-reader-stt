import { HTTP_STATUS_CODES } from "../constants";

export async function fetchToken() {
  const response = await fetch("/authentication/token");
  if (
    response.status === HTTP_STATUS_CODES.Unauthorized ||
    response.status === HTTP_STATUS_CODES.NotFound
  ) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error("Error loading the access token.");
  }
  return await response.json();
}
