import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import searchMockArtist from "../../data/__mocks__/spotify/spotify-artist-mock";
import { searchMockEvents } from "../../data/__mocks__/ticketmaster-mock";
import ArtistInforHeader from "./Header";
import TopTracks from "./TopSongs";
import UpcomingConcerts from "./UpcomingConcerts";
import SimilarArtists from "./SimilarArtists";
import { getArtistWithSpotify } from "../../services/spotify-service";
import { searchEvents } from "../../services/ticketmaster-service";

export default function ArtistInfor() {
  const [artistData, setArtistData] = useState([]);
  const [concerts, setConcerts] = useState([]);

  const url = useLocation();

  const params = useParams();

  const artistID = params.id;
  const artistName = params.artist;

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

        const artistInfor = await getArtistWithSpotify(token, artistID, signal);

        const availableEvents = searchEvents(
          null,
          artistName,
          null,
          null,
          null,
          null,
        );
        if (signal.aborted) return;

        setArtistData(artistInfor);

        setConcerts(availableEvents);
      } catch (err) {
        console.error(err);
      }
    };
    acquireArtistInfor();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return (
    <>
      <ArtistInforHeader artistData={artistData} concerts={concerts} />
      <TopTracks artistData={artistData} />
      <UpcomingConcerts artistName={artistName} concerts={concerts} />
      <SimilarArtists artistData={artistData} />
    </>
  );
}
