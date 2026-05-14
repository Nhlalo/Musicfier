import { mockCharts } from "./spotify/spotify.mock";

export default function findSong(songName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const track = mockCharts.find(
        (song) => song.songName.toLowerCase() == songName.toLowerCase(),
      );

      if (track) {
        resolve({
          artist: track.artistName,
          title: track.songName,
          coverUrl: track.songCover,
        });
      } else {
        resolve(null);
      }
    }, 5000);
  });
}
