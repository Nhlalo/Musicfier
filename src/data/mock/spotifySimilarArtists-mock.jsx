import { mockArtists } from "./spotifyArtist-mock";
import ArtistImg from "../../assets/images/artistImg.jpg";

const allArtists = mockArtists.map((artist) => {
  return {
    name: artist.artistName,
    id: artist.spotifyArtistId,
  };
});
const mockSimilarArtists = [
  {
    href: "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
    name: "The Weeknd",
    id: "1Xyo4u8uXC1ZmMpatF05PJ",
    image: ArtistImg,
  },
  {
    href: "https://api.spotify.com/v1/artists/6qqNVTkY8uBg9cP3Jd7DAH",
    name: "Billie Eilish",
    id: "6qqNVTkY8uBg9cP3Jd7DAH",
    image: ArtistImg,
  },
];

function generateMockSimilarArtists(artistsData) {
  const similarArtists = artistsData.map((artistData) => {
    const similarArtists = {
      artist: {
        artistName: artistData.name,
        spotifyId: artistData.id,
      },
      similarArtists: mockSimilarArtists,
    };

    return similarArtists;
  });

  return similarArtists;
}

const mockData = generateMockSimilarArtists(allArtists);

export default function searchMockSimilarArtists(spotifyId) {
  const artistData = mockData.find(
    (mockArtist) => mockArtist.artist.spotifyId == spotifyId,
  );

  return artistData.similarArtists.map((artist) => ({
    spotifyLink: artist.href,
    artistName: artist.name,
    spotifyArtistId: artist.id,
    artistImage: artist?.image,
  }));
}
