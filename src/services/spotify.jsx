import { getGlobalTopTracks, getCountryTopTracks } from "./globalfm";

async function getSpotifyToken(signal) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
    signal,
  });

  const data = await response.json();
  return data.access_token;
}

async function searchSpotifyTrack(trackName, artistName, token, signal) {
  const query = encodeURIComponent(`${trackName} ${artistName}`);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    },
  );

  const data = await response.json();
  if (data.tracks.items.length > 0) {
    const track = data.tracks.items[0];
    return {
      spotifyLink: track.external_urls.spotify,
      previewUrl: track.preview_url,
      songCover: track.album.images[0]?.url || null,
      spotifyId: track.id,
    };
  }
  return null;
}

export default async function getChartWithSpotify(
  limit = 20,
  country = "US",
  global = "true",
  signal,
) {
  try {
    const lastFmTracks = global
      ? await getGlobalTopTracks(limit, signal)
      : await getCountryTopTracks(country, limit, signal);

    const spotifyToken = await getSpotifyToken();

    const enrichedTracks = [];

    // Process each track to add Spotify data
    for (const track of lastFmTracks) {
      const spotifyData = await searchSpotifyTrack(
        track.songName,
        track.artistName,
        spotifyToken,
        signal,
      );

      enrichedTracks.push({
        ...track,
        songCover: spotifyData?.songCover || null,
        spotifyLink: spotifyData?.spotifyLink || null,
        previewUrl: spotifyData?.previewUrl || null,
      });

      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return enrichedTracks;
  } catch (error) {
    return [];
  }
}
