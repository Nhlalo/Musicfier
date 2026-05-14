import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import searchMockArtist from "../../data/__mocks__/spotify/spotify-artist-mock";
import { searchMockEvents } from "../../data/__mocks__/ticketmaster-mock";
import ArtistInforHeader from "./Header";
import TopTracks from "./TopSongs";
import UpcomingConcerts from "./UpcomingConcerts";
import SimilarArtists from "./SimilarArtists";

export default function ArtistInfor() {
  const [artistData, setArtistData] = useState([]);
  const [concerts, setConcerts] = useState([]);

  const url = useLocation();

  const params = useParams();

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
      <ArtistInforHeader artistData={artistData} concerts={concerts} />
      <TopTracks artistName={artistName} />
      <UpcomingConcerts artistName={artistName} concerts={concerts} />
      <SimilarArtists artistData={artistData} />
    </>
  );
}
