import { mockCharts } from "./spotify/spotify.mock";

export default function findSong(songName) {
  const track = mockCharts.find(
    (song) => song.songName.toLowerCase() == songName.toLowerCase(),
  );

  return track
    ? {
        artist: track.artistName,
        title: track.songName,
        coverUrl: track.songCover,
        id: track.spotifyArtistId,
      }
    : null;
}
