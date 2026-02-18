import ArtistImg from "../../assets/images/artistImg.jpg";

const mockArtists = [
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4",
    artistName: "Drake",
    spotifyId: "3TVXtAsR1Inumwj472S9r4",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
    artistName: "The Weeknd",
    spotifyId: "1Xyo4u8uXC1ZmMpatF05PJ",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/6qqNVTkY8uBg9cP3Jd7DAH",
    artistName: "Billie Eilish",
    spotifyId: "6qqNVTkY8uBg9cP3Jd7DAH",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V",
    artistName: "Ed Sheeran",
    spotifyId: "6eUKZXaKkcviH0Ku9w2n3V",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/6M2xZuxGJ5nZBHTp3Qk5cN",
    artistName: "Dua Lipa",
    spotifyId: "6M2xZuxGJ5nZBHTp3Qk5cN",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/2tIP7SsRs7vjIcLrU85W8J",
    artistName: "The Kid LAROI, Justin Bieber",
    spotifyId: "2tIP7SsRs7vjIcLrU85W8J",
    artistImage: ArtistImg,
  },
  {
    genre: "alternative",
    spotifyHref: "https://api.spotify.com/v1/artists/4yCbCrFjBwJjJkCbW0rF4e",
    artistName: "Glass Animals",
    spotifyId: "4yCbCrFjBwJjJkCbW0rF4e",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/6K4p31p6K8r0F4YdFcQ4fG",
    artistName: "Harry Styles",
    spotifyId: "6K4p31p6K8r0F4YdFcQ4fG",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/7jVKG8fZyK6W4K4Zg6vZqy",
    artistName: "Lil Nas X",
    spotifyId: "7jVKG8fZyK6W4K4Zg6vZqy",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/1y6bU4V1L0B3K4eWfQ9TqL",
    artistName: "Olivia Rodrigo",
    spotifyId: "1y6bU4V1L0B3K4eWfQ9TqL",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/7fkk2Q5P7q5v5tZ8Z6zK4J",
    artistName: "SZA",
    spotifyId: "7fkk2Q5P7q5v5tZ8Z6zK4J",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/5Y1ylE6L7k6J8f4U4z7Q1L",
    artistName: "Miley Cyrus",
    spotifyId: "5Y1ylE6L7k6J8f4U4z7Q1L",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
    artistName: "Taylor Swift",
    spotifyId: "06HL4z0CvFAxyc27GXpf02",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/2gR0iT3h7v0vJ8v0q8h9J9",
    artistName: "Sam Smith, Kim Petras",
    spotifyId: "2gR0iT3h7v0vJ8v0q8h9J9",
    artistImage: ArtistImg,
  },
  {
    genre: "pop",
    spotifyHref: "https://api.spotify.com/v1/artists/46HVymK1B7cL5e1hD6cE1t",
    artistName: "Rema, Selena Gomez",
    spotifyId: "46HVymK1B7cL5e1hD6cE1t",
    artistImage: ArtistImg,
  },
  {
    genre: "country",
    spotifyHref: "https://api.spotify.com/v1/artists/4QTxD5qJ3K5C5Q5d5y0q5J",
    artistName: "Morgan Wallen",
    spotifyId: "4QTxD5qJ3K5C5Q5d5y0q5J",
    artistImage: ArtistImg,
  },
];

export default function searchMockArtist(spotifyId) {
  return mockArtists.find((artist) => artist.spotifyId === spotifyId);
}
export { mockArtists };
