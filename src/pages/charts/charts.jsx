import { createContext, useEffect } from "react";
import { mockUserLocation } from "../../data/mock/user-location-mock";
import getMockCountryCharts from "../../data/mock/spotifyCountry-mock";

const countryContext = createContext({});
const chartContext = createContext({});

export default function ChartList() {
  const [country, setCountry] = useState(null);
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
    [country],
  );

  useEffect(() => {
    const location = mockUserLocation;
    const country = location.country;
    setCountry(country);

    const chartData = getMockCountryCharts(country);
    setChart(chartData);
  }, []);

  return (
    <chartContext.Provider value={chartAjustment}>
      <countryContext.Provider value={countryAdjustement}>
        <ChartHeader />
        <Footer />
      </countryContext.Provider>
    </chartContext.Provider>
  );
}
export { countryContext, chartContext };
