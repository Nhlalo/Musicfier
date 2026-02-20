import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { mockTopTracks } from "../../data/mock/spotifyArtistTopSongs-mock";
import Container from "../../components/ui/container/container";
import ChartContainer from "../../components/shared/chartContainer/chartContainer";
import Styles from "./artistInfor.module.css";

export default function TopTracks({ artistName }) {
  const [topTracks, setTopTracks] = useState([]);

  const url = useLocation();

  const topTracksAdjustment = useMemo(() => topTracks, [topTracks]);

  useEffect(() => {
    const artistTopTracks = mockTopTracks;
    if (artistTopTracks) {
      setTopTracks(artistTopTracks);
    }
  }, [url, topTracksAdjustment]);

  return (
    <Container>
      <h2 className={Styles.topSongsHeading}>Top Songs by {artistName}</h2>
      <ChartContainer data={topTracksAdjustment} />
    </Container>
  );
}
