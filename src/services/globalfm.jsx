// Get the charts using Globalfm as Spotify does not provide certain charts. This will be used in conjuction with the Spotify API to provide the needed data

async function getGlobalTopTracks(limit = 20, signal) {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`,
      { signal },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Format the response into the structure you want
    const tracks = data.tracks.track.map((track, index) => ({
      position: index + 1,
      songName: track.name,
      artistName: track.artist.name,
      songCover: null,
      spotifyLink: null, // We'll add Spotify links later
      previewUrl: null,
    }));

    return tracks;
  } catch (error) {
    return [];
  }
}

async function getCountryTopTracks(
  country = "south africa",
  limit = 20,
  signal,
) {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${encodeURIComponent(country)}&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`,
      { signal },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.tracks.track.map((track, index) => ({
      position: index + 1,
      songName: track.name,
      artistName: track.artist.name,
    }));
  } catch (error) {
    return [];
  }
}

export { getGlobalTopTracks, getCountryTopTracks };
