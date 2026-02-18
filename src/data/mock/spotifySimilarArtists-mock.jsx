import { mockArtists } from "./spotifyArtist-mock";
import ArtistImg from "../../assets/images/artistImg.jpg";

const mockSimilarArtists = [
  {
    href: "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
    name: "The Weeknd",
    id: "1Xyo4u8uXC1ZmMpatF05PJ",
    image: "ArtistImg",
  },
  {
    href: "https://api.spotify.com/v1/artists/6qqNVTkY8uBg9cP3Jd7DAH",
    name: "Billie Eilish",
    id: "6qqNVTkY8uBg9cP3Jd7DAH",
    image: "ArtistImg",
  },
];

const generateMockSimilarArtists = mockArtists.map((artist) => {
  const similarArtists = {
    artist: {
      artistName: artist.artistName,
      spotifyId: artist.spotifyId,
    },
    similarArtists: mockSimilarArtists,
  };

  return similarArtists;
});

export default function searchMockSimilarArtists(spotifyId) {
  const artistData = generateMockSimilarArtists.find(
    (artist) => artist.artist.spotifyId == spotifyId,
  );

  return artistData.similarArtists.map((artist) => ({
    spotifyHref: artist.href,
    artistName: artist.name,
    spotifyId: artist.id,
    artistImage: artist?.image,
  }));
}
