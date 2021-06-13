import { HTTP_STATUS_CODES } from "../constants";

export async function fetchSetting() {
    const response = await fetch("/settings");
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
