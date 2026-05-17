import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import searchMockSimilarArtists from "../../data/__mocks__/spotify/spotify-similar-artists.mock";
import Container from "../../components/ui/container/Container";
import FeaturedArtists from "../../components/shared/featuredArtists/FeaturedArtists";
import Styles from "./ArtistInfor.module.css";
import { getSimilarArtists } from "../../services/spotify-service";

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

  useEffect(() => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireSimilarArtistInfor = async () => {
      if (!artistID) throw Error("Missing parameter: artist id");
      try {
        let token = localStorage.getItem("SpotifyToken");
        console.log("Token", token);
        if (!token) {
          token = await await getSpotifyToken(
            SPOTIFY_CLIENT_ID,
            SPOTIFY_CLIENT_SECRET,
            signal,
          );

          if (!token) {
            throw new Error("Failed to obtain access token");
          }
          localStorage.setItem("SpotifyToken", token);
        }

        const similarArtistsInfor = getSimilarArtists(artistID, token, signal);

        if (signal.aborted) return;
        setSimilarArtists(similarArtistsInfor);
      } catch (err) {
        console.error(err);
      }
    };
    acquireSimilarArtistInfor();

    return () => {
      abortController.abort();
    };
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
