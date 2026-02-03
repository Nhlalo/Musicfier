import Select from "react-select";
import { mockCountries } from "../../../data/mock/allcountries-mock";
import "./countrySelect.css";

export default function CountrySelect({
  location = "South Africa",
  classname,
  classPrefix,
}) {
  const { setCountry, country } = useContext(countryContext);
  const { setChart } = useContext(chartContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setChart(mockCountries);
  }, [selected, country]);

  //Selecting a new country, will show charts of that country
  function handleChange(selectedOption) {
    setSelected(selectedOption);
    setCountry(selectedOption.value);
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
