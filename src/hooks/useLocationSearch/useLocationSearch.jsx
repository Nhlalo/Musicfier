import { useEffect, useState } from "react";
import { getAnyLocation } from "../../services/location-service";

export default function useLocationSearch(characterChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchLocation = async () => {
      try {
        if (signal.aborted) return;

        const value = await getAnyLocation(
          characterChange,
          GEONAMES_USERNAME,
          signal,
        );

        if (signal.aborted) return;

        if (!value) {
          throw new Error("No location");
        }

        setData(value);
        setError(false);
        setLoading(false);
      } catch (err) {
        if (signal.aborted) return;
        if (err.name !== "AbortError") {
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchLocation();

    return () => {
      abortController.abort();
    };
  }, [characterChange]);

  return { data, loading, error };
}
