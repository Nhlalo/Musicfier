import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { LocationContext } from "../../components/layout/rootLayout";
import { mockUserLocation } from "../../data/mock/user-location-mock";
import getMockCountryCharts from "../../data/mock/spotifyCountry-mock";
import ChartHeader from "./chartsHeader/chartsHeader";

const countryContext = createContext({});
const chartContext = createContext({});

export default function ChartList() {
  const countryName = useContext(LocationContext);

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
    const chartSongs = getMockCountryCharts(countryName);
    setChart(chartSongs);
  }, []);

  return (
    <chartContext.Provider value={chartAjustment}>
      <countryContext.Provider value={countryAdjustement}>
        <ChartHeader />
      </countryContext.Provider>
    </chartContext.Provider>
  );
}
export { countryContext, chartContext };
