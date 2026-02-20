import { useState, useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import searchMockArtist from "../../data/mock/spotifyArtist-mock";
import { searchMockEvents } from "../../data/mock/ticketmaster-mock";
import ArtistInforHeader from "./header";
import TopTracks from "./topSongs";
import UpcomingConcerts from "./upcomingConcerts";
import SimilarArtists from "./similarArtists";

export default function ArtistInfor() {
  const [artistData, setArtistData] = useState([]);
  const [concerts, setConcerts] = useState([]);

  const url = useLocation();

  const params = useParams();

  const artistDataAdjustement = useMemo(() => artistData, [artistData]);
  const concertsAdjustment = useMemo(() => concerts, [concerts]);

  const artistID = params.id;
  const artistName = params.artist;

  useEffect(() => {
    const mockArtistData = searchMockArtist(artistID);
    const mockAvailableEvents = searchMockEvents(
      null,
      artistName,
      null,
      null,
      null,
      null,
    );
    if (mockArtistData) {
      setArtistData(mockArtistData);
    }
    if (mockAvailableEvents) {
      setConcerts(mockAvailableEvents);
    }
  }, [url]);

  return (
    <>
      <ArtistInforHeader
        artistData={artistDataAdjustement}
        concerts={concertsAdjustment}
      />
      <TopTracks artistName={artistName} />
      <UpcomingConcerts artistName={artistName} concerts={concertsAdjustment} />
      <SimilarArtists artistData={artistDataAdjustement} />
    </>
  );
}
