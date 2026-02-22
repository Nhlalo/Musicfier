import { createContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import getMockCountryCharts from "../../data/mock/spotifyCountry-mock";
import ChartHeader from "./chartsHeader/chartsHeader";

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

  return (
    <chartContext.Provider value={chartAjustment}>
      <countryContext.Provider value={countryAdjustement}>
        <ChartHeader />
      </countryContext.Provider>
    </chartContext.Provider>
  );
}
export { countryContext, chartContext };
