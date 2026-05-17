// Get the charts using Globalfm as Spotify does not provide certain charts. This will be used in conjuction with the Spotify API to provide the needed data

async function getGlobalTopTracks(apiKey, limit = 20, signal) {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json&limit=${limit}`,
      { signal },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    let tracksData = data.tracks?.track;

    if (!tracksData) return null;
    if (!Array.isArray(tracksData)) tracksData = [tracksData];

    const tracks = tracksData.map((track, index) => ({
      position: index + 1,
      songName: track.name,
      artistName: track.artist.name,
      songCover: null,
      artistImage: track.images,
      spotifyLink: null,
      previewUrl: null,
    }));

    return tracks;
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

async function getCountryTopTracks(
  apiKey,
  country = "south africa",
  limit = 20,
  signal,
) {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${encodeURIComponent(country)}&api_key=${apiKey}&format=json&limit=${limit}`,
      { signal },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.tracks.track.map((track, index) => ({
      position: index + 1,
      songName: track.name,
      artistName: track.artist.name,
      artistImage: track.images,
    }));
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

export { getGlobalTopTracks, getCountryTopTracks };
