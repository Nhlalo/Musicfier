import { useState, useEffect } from "react";
import { getMockArtistData } from "../../data/__mocks__/ticketmaster.mock";
import { getArtistData } from "../../services/ticketmaster-service";
import { getAccessToken } from "../../services/ticketmaster-service";

export default function useArtistSearch(characterChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireArtistData = async () => {
      try {
        if (signal.aborted) return;

        let token = localStorage.getItem("TicketMasterToken");
        if (!token) {
          token = await getAccessToken(signal);
          console.log("Token");
          if (signal.aborted) return;
          if (!token) {
            throw new Error("Failed to obtain access token");
          }
          localStorage.setItem("TicketMasterToken", token);
        }

        const artistData = await getArtistData(characterChange, token, signal);
        if (signal.aborted) return;

        if (!artistData) {
          throw new Error("No artist data found");
        }

        setData(artistData);
        setError(null);
        setLoading(false);
      } catch (err) {
        if (signal.aborted) return;

        setError(err.message || true);
        setLoading(false);
      }
    };

    acquireArtistData();

    return () => {
      abortController.abort();
    };
  }, [characterChange]);

  return { data, loading, error };
}
