import { useEffect, useState } from "react";
import getLocation from "../../data/mock/anylocation-mock";

export default function useLocationSearch(characterChange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    /* Implement abort Controller*/
    // const abortController = new AbortController();
    // const signal = abortController.signal;

    getLocation(characterChange)
      .then((value) => {
        // Check if request was cancelled
        if (value === undefined) {
          throw new Error("No location");
        }
        /* if (!signal.aborted) {
          setData(value);
          setError(false);
        } */
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
        /*
        if (!signal.aborted) {
          setLoading(false);
        } */

        setLoading(false);
      });

    /* return () => {
      abortController.abort();
    }; */
  }, [characterChange]);
  return { data, loading, error };
}
