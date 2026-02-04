import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import { chartContext, countryContext } from "../charts";
import getMockCountryCharts from "../../../data/mock/spotifyCountry-mock";
import { mockCountries } from "../../../data/mock/allcountries-mock";
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
    const countryName = selectedOption.value;
    setSelected(selectedOption);
    setCountry(countryName);
    navigate(`/charts/${chartType}/${countryName}`);
  }

  return (
    <Select
      options={mockCountries}
      value={selected}
      placeholder={location}
      onChange={handleChange}
      isSearchable={true} // ✅ Control open state
      className={classname}
      classNamePrefix={classPrefix}
    />
  );
}
