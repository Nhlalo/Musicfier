import { createContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import getMockCountryCharts from "../../data/__mocks__/spotify/spotify-country.mock";
import ChartHeader from "./chartsHeader/ChartsHeader";
import { getChartWithSpotify } from "../../services/spotify-service";

const countryContext = createContext({});
const chartContext = createContext({});

export default function ChartList() {
  const { countryname } = useParams();
  const countryName = countryname;

  const [country, setCountry] = useState(countryName);
  const [chart, setChart] = useState([]);

  const countryAdjustement = useMemo(
    () => ({
      country,
      setCountry,
    }),
    [country],
  );

  const chartAjustment = useMemo(
    () => ({
      chart,
      setChart,
    }),
    [chart],
  );

  useEffect(() => {
    if (countryName) {
      const chartSongs = getMockCountryCharts(countryName);
      setCountry(countryName);
      if (chartSongs) {
        setChart(chartSongs);
      }
    }
  }, [countryName, country, chart]);

  useEffect(() => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireCharts = async () => {
      try {
        if (!countryName) return null;

        let token = localStorage.getItem("SpotifyToken");
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

        const chartData = await getChartWithSpotify(
          20,
          countryName,
          false,
          token,
          LASTFM_API_KEY,
          signal,
        );

        if (signal.aborted) return;
        setCountry(countryName);
        setChart(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    acquireCharts();

    return () => {
      abortController.abort();
    };
  }, [countryName, country, chart]);

  return (
    <chartContext.Provider value={chartAjustment}>
      <countryContext.Provider value={countryAdjustement}>
        <ChartHeader />
      </countryContext.Provider>
    </chartContext.Provider>
  );
}
export { countryContext, chartContext };
