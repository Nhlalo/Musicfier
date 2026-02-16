import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ChevronRight } from "lucide-react";
import { previousLocationSearchesContext } from "../../pages/concerts/sidebar/concertLocation/concertLocation";
import { InputContext } from "../../pages/concerts/sidebar/concertLocation/searchLocation";
import Styles from "./locationSearch.module.css";

export default function Data({ locationData }) {
  const { previousConcertLocations, setPreviousConcertLocations } = useContext(
    previousLocationSearchesContext,
  );
  const searchInputBTNRef = useContext(InputContext);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleLocation(event) {
    // Get data from the button's data attribute
    const button = event.currentTarget;
    const city = button.dataset.city;
    const country = button.dataset.country;
    const countryCode = button.dataset.countrycode;
    const updatedLocations = [...previousConcertLocations];
    searchInputBTNRef.current.value = ""; //Clear the input after searching

    const startDate = searchParams.get("sd");
    const endDate = searchParams.get("ed");
    const id = searchParams.get("id");
    const cityParam = city ? `&c=${city}` : "";
    const idParam = id ? `&id=${id}` : "";

    if (updatedLocations.length >= 4) {
      updatedLocations.pop();
    }

    updatedLocations.push({
      country: country,
      country_code: countryCode,
      city: city,
    });
    setPreviousConcertLocations(updatedLocations);

    navigate(
      `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}${cityParam}${idParam}`,
    );
  }

  return (
    <div className={Styles.dataContainer}>
      <span className={Styles.visuallyHidden}>Results</span>
      <span aria-hidden="true" className={Styles.dataSuggestion}>
        SUGGESTION
      </span>
      <div className={Styles.dataWrapper}>
        {locationData.length &&
          locationData.slice(0, 6).map((location, index) => {
            return (
              <button
                type="button"
                className={Styles.locationBTN}
                key={location.key}
                onClick={(e) => handleLocation(e, index)}
                data-city={location?.city}
                data-country={location.country}
                data-countrycode={location.countryCode}
              >
                <div className={Styles.locationContainer}>
                  <span className={Styles.locationCity}>{location.city}</span>
                  <span className={Styles.locationCountry}>
                    {location.country}
                  </span>
                </div>
                <ChevronRight
                  aria-hidden="true"
                  className={Styles.chevronRight}
                />
              </button>
            );
          })}
      </div>
    </div>
  );
}
