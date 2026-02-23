import { mockCharts } from "./spotify-mock";

export default function findSong(id) {
  const track = mockCharts.find(
    (song) => song.songName.toLowerCase() == id.toLowerCase(),
  );

  if (track) {
    return {
      artist: track.artistName,
      title: track.songName,
      coverUrl: track.songCover,
    };
  }

  return track;
}
