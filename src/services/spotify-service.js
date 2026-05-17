import { getGlobalTopTracks, getCountryTopTracks } from "./lastfm-service";

async function getSpotifyToken(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  signal,
) {
  try {
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.access_token || null;
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

async function searchSpotifyTrack(trackName, artistName, token, signal) {
  if (!token || !artistName || !trackName) return null;

  const query = encodeURIComponent(`${trackName} ${artistName}`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(errorData.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const tracks = data.tracks?.items;
  if (!tracks?.length) return null;

  const track = tracks[0];
  const artistID = track.artists[0].id;

  return {
    spotifyLink: track.external_urls.spotify,
    previewUrl: track.preview_url,
    songCover: track.album.images || null,
    spotifyId: track.id,
  };
}

async function getChartWithSpotify(
  limit = 20,
  country = "US",
  global = "true",
  token,
  lastfmApiKey,
  signal,
) {
  try {
    const lastFmTracks = global
      ? await getGlobalTopTracks(lastfmApiKey, limit, signal)
      : await getCountryTopTracks(lastfmApiKey, country, limit, signal);

    if (!lastFmTracks) return null;

    const enrichedTracks = [];

    // Process each track to add Spotify data
    for (const track of lastFmTracks) {
      const spotifyData = await searchSpotifyTrack(
        track.artistName,
        track.songName,
        token,
        signal,
      );

      enrichedTracks.push({
        ...track,
        songCover: spotifyData?.songCover || null,
        spotifyLink: spotifyData?.spotifyLink || null,
        songPreviewUrl: spotifyData?.previewUrl || null,
        spotifyArtistId: spotifyData?.spotifyId || null,
      });

      // Add small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return enrichedTracks | null;
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

async function getArtistWithSpotify(token, id, signal) {
  if (!token || !id) {
    console.error("Missing required parameters:", {
      token: !!token,
      id: !!id,
    });
    return null;
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const artistData = await response.json();
    return (
      {
        genre: artistData?.genres[0],
        spotifyLink: artistData.href,
        artistName: artistData.name,
        spotifyArtistId: artistData.id,
        artistImage: artistData.images?.url || null,
      } || null
    );
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

async function getSimilarArtists(artistId, token, signal) {
  if (!token || !artistId) {
    console.error("Missing required parameters:", {
      token: !!token,
      artistId: !!artistId,
    });
    return null;
  }
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.artists.map((artist) => ({
      spotifyLink: artist.href,
      artistName: artist.name,
      spotifyArtistId: artist.id,
      artistImage: artist.images || null,
    }));
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

async function getArtistTopSongs(id, token, signal) {
  if (!token || !id) {
    console.error("Missing required parameters:", {
      token: !!token,
      id: !!id,
    });
    return null;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return (
      data.tracks.map((track) => ({
        spotifyArtistId: track.id,
        songName: track.name,
        songPreviewUrl: track.preview_url,
        spotifyLink: track.external_urls.spotify,

        artistName: artists[0].name,
        // Album image (main album art)
        songCover: track.album.images || null,
        albumName: track.album.name,
      })) || null
    );
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

export {
  getChartWithSpotify,
  getArtistWithSpotify,
  getSimilarArtists,
  getArtistTopSongs,
  getSpotifyToken,
};
