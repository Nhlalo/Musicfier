import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import searchMockSimilarArtists from "../../data/__mocks__/spotify/spotify-similar-artists.mock";
import Container from "../../components/ui/container/Container";
import FeaturedArtists from "../../components/shared/featuredArtists/FeaturedArtists";
import Styles from "./ArtistInfor.module.css";

export default function SimilarArtists({ artistData }) {
  const [similarArtists, setSimilarArtists] = useState([]);
  const artistID = artistData?.spotifyArtistId;
  const artistName = artistData?.artistName;
  const url = useLocation();

  useEffect(() => {
    if (artistID) {
      const mockSimilarArtists = searchMockSimilarArtists(artistID);
      if (mockSimilarArtists) {
        setSimilarArtists(mockSimilarArtists);
      }
    }
  }, [url, artistID]);

  const artistsSimilar = similarArtists
    .map((similarArtist) => {
      return similarArtist.artistName;
    })
    .join(", ");
  return (
    <Container>
      <h2 className={Styles.similarArtistsHeader}>Similar to {artistName}</h2>
      <p className={Styles.similarArtistsDescr}>
        Discover more music and artists similar to {artistName}, like{" "}
        {artistsSimilar}
      </p>
      <FeaturedArtists data={similarArtists} />
    </Container>
  );
}
