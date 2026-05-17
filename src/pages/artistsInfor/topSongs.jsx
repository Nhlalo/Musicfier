import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { mockTopTracks } from "../../data/__mocks__/spotify/spotify-artist-top-songs.mock";
import Container from "../../components/ui/container/Container";
import ChartContainer from "../../components/shared/chartContainer/ChartContainer";
import Styles from "./ArtistInfor.module.css";
import { getArtistTopSongs } from "../../services/spotify-service";

export default function TopTracks({ artistData }) {
  const [topTracks, setTopTracks] = useState([]);
  const artistID = artistData?.spotifyArtistId;

  const url = useLocation();

  const topTracksAdjustment = useMemo(() => topTracks, [topTracks]);

  useEffect(() => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireArtistInfor = async () => {
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

        if (signal.aborted) return;
        const artistTopTracks = getArtistTopSongs(artistID, token, signal);
        setTopTracks(artistTopTracks);
      } catch (err) {
        console.error(err);
      }
    };
    acquireArtistInfor();

    return () => {
      abortController.abort();
    };
  }, [url, topTracksAdjustment]);

  return (
    <Container>
      <h2 className={Styles.topSongsHeading}>
        Top Songs by {artistData?.artistName}
      </h2>
      <ChartContainer data={topTracksAdjustment} />
    </Container>
  );
}
