export default function createYouTubeMusicLink(artistName, songName) {
  const searchQuery = encodeURIComponent(`${artistName} ${songName}`);
  return `https://music.youtube.com/search?q=${searchQuery}`;
}
