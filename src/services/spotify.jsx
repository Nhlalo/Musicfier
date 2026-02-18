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
    const artistID = track.artists[0].id;
    const artistInforResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID} `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      },
    );
    const artistData = await artistInforResponse.json();

    return {
      spotifyLink: track.external_urls.spotify,
      previewUrl: track.preview_url,
      songCover: track.album.images[0]?.url || null,
      spotifyId: track.id,
      artistImage: artistData.images[0]?.url || null,
    };
  }
  return null;
}

async function getChartWithSpotify(
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

async function getArtistWithSpotify(token, id, signal) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
    }
    const artistData = await response.json();
    return {
      genre: artistData?.genres[0],
      spotifyHref: artistData.href,
      artistName: artistData.name,
      spotifyId: artistData.id,
      artistImage: artistData.images[0]?.url || null,
    };
  } catch (error) {
    return [];
  }
}

async function getSimilarArtists(token, artistId, signal) {
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
      throw new Error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data.artists.map((artist) => ({
      spotifyHref: artist.href,
      artistName: artist.name,
      spotifyId: artist.id,
      artistImage: artist.images?.[0]?.url || null,
    }));
  } catch (error) {
    return [];
  }
}
async function getArtistTopSongs(token, id, signal) {
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
      throw new Error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data.tracks.map((track) => ({
      id: track.id,
      name: track.name,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify,

      // Album image (main album art)
      albumImage: track.album.images[0]?.url || null,
      albumName: track.album.name,
    }));
  } catch (error) {
    return [];
  }
}

export {
  getChartWithSpotify,
  getArtistWithSpotify,
  getSimilarArtists,
  getArtistTopSongs,
};
