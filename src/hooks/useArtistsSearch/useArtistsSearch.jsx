import { useState, useEffect } from "react";
export default function useArtistSearch(characterChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    /* Implement abort Controller*/
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    getArtistData(characterChange)
      .then((value) => {
        // Check if request was cancelled
        if (value === undefined) {
          throw new Error("No location");
        }
        /*if (!signal.aborted) {
          setData(value);
          setError(false);
        }*/
        //Delete this part and use the above when using real data
        setData(value);
        setError(false);
      })
      .catch((error) => {
        // Only set error if it wasn't an abort error
        if (error.name !== "AbortError") {
          setError(true);
        }
      })
      .finally(() => {
        /* if (!signal.aborted) {
          setLoading(false);
        }*/
        //Delete this part and use the above when using real data
        setLoading(false);
      });

    /* return () => {
      abortController.abort();
    }; */
  }, [characterChange]);
  return { data, loading, error };
}
