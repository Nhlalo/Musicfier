import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import getMockCountryCharts from "../../../data/mock/spotifyCountry-mock";
import "./countrySelect.css";

export default function CountrySelect({
  location = "South Africa",
  classname,
  classPrefix,
}) {
  const navigate = useNavigate();
  const { chartType } = useParams();

  const { setCountry, country } = useContext(countryContext);
  const { setChart } = useContext(chartContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const countryChart = getMockCountryCharts(country);
    setChart(countryChart);
  }, [selected, country]);

  //Selecting a new country, will show charts of that country
  function handleChange(selectedOption) {
    const countryChosenData = selectedOption;
    const countryName = valueChosen.value;
    setSelected(countryChosenData);
    setCountry(countryName);
    navigate(`./charts/${chartType}/${countryName}`);
  }

  return (
    <Select
      options={getAllCountries()}
      value={selected}
      placeholder={location}
      onChange={handleChange}
      isSearchable={true} // ✅ Control open state
      className={classname}
      classNamePrefix={classPrefix}
    />
  );
}
