export default async function recognizeWithAudD(audioBlob, apiToken, signal) {
  if (!audioBlob || !apiToken) {
    throw new Error("Missing required parameters: audioBlob and apiToken");
  }
  const formData = new FormData();
  formData.append("api_token", apiToken);
  formData.append("file", audioBlob, "recording.webm");

  try {
    const response = await fetch("https://api.audd.io/", {
      method: "POST",
      body: formData,
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.error?.message || "Recognition API error");
    }

    const result = data.result;
    if (!result) return null;

    return {
      artist: result.artist,
      title: result.title,
      coverUrl: result.spotify.album?.images,
      id: result.spotify.id,
    };
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}
