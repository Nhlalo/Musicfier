import ArtistImg from "../../assets/images/artistImg.jpg";
let chartPosition = 1;

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
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "3TVXtAsR1Inumwj472S9r4",
  ),

  createMockSong(
    ++chartPosition,
    "Blinding Lights",
    "The Weeknd",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "1Xyo4u8uXC1ZmMpatF05PJ",
  ),

  createMockSong(
    ++chartPosition,
    "Bad Guy",
    "Billie Eilish",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "6qqNVTkY8uBg9cP3Jd7DAH",
  ),

  createMockSong(
    ++chartPosition,
    "Shape of You",
    "Ed Sheeran",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "6eUKZXaKkcviH0Ku9w2n3V",
  ),

  createMockSong(
    ++chartPosition,
    "Levitating",
    "Dua Lipa",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "6M2xZuxGJ5nZBHTp3Qk5cN",
  ),

  createMockSong(
    ++chartPosition,
    "Stay",
    "The Kid LAROI, Justin Bieber",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "2tIP7SsRs7vjIcLrU85W8J",
  ),

  createMockSong(
    ++chartPosition,
    "Heat Waves",
    "Glass Animals",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "4yCbCrFjBwJjJkCbW0rF4e",
  ),

  createMockSong(
    ++chartPosition,
    "As It Was",
    "Harry Styles",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "6K4p31p6K8r0F4YdFcQ4fG",
  ),

  createMockSong(
    ++chartPosition,
    "Industry Baby",
    "Lil Nas X",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "7jVKG8fZyK6W4K4Zg6vZqy",
  ),

  createMockSong(
    ++chartPosition,
    "Good 4 U",
    "Olivia Rodrigo",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "1y6bU4V1L0B3K4eWfQ9TqL",
  ),

  createMockSong(
    ++chartPosition,
    "Montero",
    "Lil Nas X",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "7jVKG8fZyK6W4K4Zg6vZqy",
  ),

  createMockSong(
    ++chartPosition,
    "Save Your Tears",
    "The Weeknd",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "1Xyo4u8uXC1ZmMpatF05PJ",
  ),

  createMockSong(
    ++chartPosition,
    "Kill Bill",
    "SZA",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "7fkk2Q5P7q5v5tZ8Z6zK4J",
  ),

  createMockSong(
    ++chartPosition,
    "Flowers",
    "Miley Cyrus",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "5Y1ylE6L7k6J8f4U4z7Q1L",
  ),

  createMockSong(
    ++chartPosition,
    "Anti-Hero",
    "Taylor Swift",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "06HL4z0CvFAxyc27GXpf02",
  ),

  createMockSong(
    ++chartPosition,
    "Unholy",
    "Sam Smith, Kim Petras",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "2gR0iT3h7v0vJ8v0q8h9J9",
  ),

  createMockSong(
    ++chartPosition,
    "Vampire",
    "Olivia Rodrigo",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "1y6bU4V1L0B3K4eWfQ9TqL",
  ),

  createMockSong(
    ++chartPosition,
    "Calm Down",
    "Rema, Selena Gomez",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "46HVymK1B7cL5e1hD6cE1t",
  ),

  createMockSong(
    ++chartPosition,
    "Last Night",
    "Morgan Wallen",
    ArtistImg,
    ArtistImg,
    "string",
    "string",
    "4QTxD5qJ3K5C5Q5d5y0q5J",
  ),
];

export { mockCharts };
