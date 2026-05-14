import { mockDrakeAlbumCover, mockDrakeImages } from "./mockImages";

let chartPosition = 0;

function createMockSong(
  position,
  songName,
  artistName,
  artistImage,
  songCover,
  spotifyLink,
  songPreviewUrl,
  spotifyArtistId,
) {
  return {
    key: crypto.randomUUID(),
    position,
    songName,
    artistName,
    artistImage,
    songCover,
    spotifyLink,
    songPreviewUrl,
    spotifyArtistId,
  };
}

const mockCharts = [
  createMockSong(
    ++chartPosition,
    "Different Species",
    "Drake",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "3TVXtAsR1Inumwj472S9r4",
  ),

  createMockSong(
    ++chartPosition,
    "Blinding Lights",
    "The Weeknd",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "1Xyo4u8uXC1ZmMpatF05PJ",
  ),

  createMockSong(
    ++chartPosition,
    "Bad Guy",
    "Billie Eilish",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    null,
    "6qqNVTkY8uBg9cP3Jd7DAH",
  ),

  createMockSong(
    ++chartPosition,
    "Shape of You",
    "Ed Sheeran",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "6eUKZXaKkcviH0Ku9w2n3V",
  ),

  createMockSong(
    ++chartPosition,
    "Levitating",
    "Dua Lipa",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "6M2xZuxGJ5nZBHTp3Qk5cN",
  ),

  createMockSong(
    ++chartPosition,
    "Stay",
    "The Kid LAROI, Justin Bieber",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "2tIP7SsRs7vjIcLrU85W8J",
  ),

  createMockSong(
    ++chartPosition,
    "Heat Waves",
    "Glass Animals",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "4yCbCrFjBwJjJkCbW0rF4e",
  ),

  createMockSong(
    ++chartPosition,
    "As It Was",
    "Harry Styles",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "6K4p31p6K8r0F4YdFcQ4fG",
  ),

  createMockSong(
    ++chartPosition,
    "Industry Baby",
    "Lil Nas X",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "7jVKG8fZyK6W4K4Zg6vZqy",
  ),

  createMockSong(
    ++chartPosition,
    "Good 4 U",
    "Olivia Rodrigo",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "1y6bU4V1L0B3K4eWfQ9TqL",
  ),

  createMockSong(
    ++chartPosition,
    "Montero",
    "Lil Nas X",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "7jVKG8fZyK6W4K4Zg6vZqy",
  ),

  createMockSong(
    ++chartPosition,
    "Save Your Tears",
    "The Weeknd",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    null,
    "1Xyo4u8uXC1ZmMpatF05PJ",
  ),

  createMockSong(
    ++chartPosition,
    "Kill Bill",
    "SZA",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "7fkk2Q5P7q5v5tZ8Z6zK4J",
  ),

  createMockSong(
    ++chartPosition,
    "Flowers",
    "Miley Cyrus",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "5Y1ylE6L7k6J8f4U4z7Q1L",
  ),

  createMockSong(
    ++chartPosition,
    "Anti-Hero",
    "Taylor Swift",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    null,
    "06HL4z0CvFAxyc27GXpf02",
  ),

  createMockSong(
    ++chartPosition,
    "Unholy",
    "Sam Smith, Kim Petras",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "2gR0iT3h7v0vJ8v0q8h9J9",
  ),

  createMockSong(
    ++chartPosition,
    "Vampire",
    "Olivia Rodrigo",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    null,
    "1y6bU4V1L0B3K4eWfQ9TqL",
  ),

  createMockSong(
    ++chartPosition,
    "Calm Down",
    "Rema, Selena Gomez",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    null,
    "46HVymK1B7cL5e1hD6cE1t",
  ),

  createMockSong(
    ++chartPosition,
    "Last Night",
    "Morgan Wallen",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "string",
    "4QTxD5qJ3K5C5Q5d5y0q5J",
  ),
  createMockSong(
    ++chartPosition,
    "Last Night",
    "Morgan Wallen",
    mockDrakeImages,
    mockDrakeAlbumCover,
    "string",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "4QTxD5qJ3K5C5Q5d5y0q5J",
  ),
];

export { mockCharts };
