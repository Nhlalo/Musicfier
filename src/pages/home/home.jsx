import { useContext, createContext } from "react";
import About from "./about/About";
import GlobalCharts from "./charts/GlobalChart";
import LocalCharts from "./charts/LocalChart";
import MoreCharts from "./charts/MoreCharts";
import { LocationContext } from "../../components/layout/RootLayout";

const GlobalChartsContext = createContext();
const LocalChartsContext = createContext();

export default function Home() {
  const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

  const userLocation = useContext(LocationContext);
  const [globalChart, setGlobalChart] = useState([]);
  const [userCountry, setUserCountry] = useState(null);
  const [localChart, setLocalChart] = useState(null);

  useEffect(() => {
    const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireGlobalCharts = async () => {
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

        const globalChartData = await getChartWithSpotify(
          20,
          "US",
          true,
          token,
          LASTFM_API_KEY,
          signal,
        );

        if (signal.aborted) return;

        setGlobalChart(globalChartData);
      } catch (err) {
        console.error(err);
      }
    };
    acquireGlobalCharts();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireLocalCharts = async () => {
      try {
        const country = await userLocation?.country;
        if (!country) return null;

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

        const localChartData = await getChartWithSpotify(
          20,
          country,
          false,
          token,
          LASTFM_API_KEY,
          signal,
        );

        if (signal.aborted) return;
        setUserCountry(country);
        setGlobalChart(localChartData);
      } catch (err) {
        console.error(err);
      }
    };

    acquireLocalCharts();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <About />
      <GlobalCharts globalChart={globalChart} />
      <LocalCharts localChart={localChart} userCountry={userCountry} />
      <MoreCharts location={userLocation} localChart={localChart} />
    </>
  );
}
