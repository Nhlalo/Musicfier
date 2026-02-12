import { useState, useRef, useMemo, createContext } from "react";
import { ChevronDown, ChevronUp, MapPinCheck, Search } from "lucide-react";
import useLocationSearch from "../../../../hooks/useLocationSearch/useLocationSearch";
import debounce from "../../../../utils/debounce";
import Data from "../../../../hooks/useLocationSearch/locationSearchData";
import ErrorMessage from "../../../../hooks/useLocationSearch/locationSearchError";
import Loading from "../../../../hooks/useLocationSearch/locationSearchLoading";
import Styles from "../sidebar.module.css";

const InputContext = createContext("");
//This will display the optional concert location as you search for your desired concert location.
export default function ConcertLocationOptions() {
  const searchInputBTNRef = useRef(null);

  //This will ensure  that the location searching state data, loading and error is displayed
  const [displayLocationStatus, setDisplayLocationStatus] = useState(false);

  const [inputChange, setInputChange] = useState("");

  //Determine the visibility of the location input search
  const [locationSearchVisibility, setLocationSearchVisibility] =
    useState("hide");

  const inputAdjustment = useMemo(() => searchInputBTNRef, [searchInputBTNRef]);

  //show the location search input & results
  function handleShowLocationSearch() {
    setLocationSearchVisibility("show");
  }
  //hide the location search input & results
  function handleHideLocationSearch() {
    setLocationSearchVisibility("hide");
    searchInputBTNRef.current.value = "";
    setDisplayLocationStatus(false);
    searchInputBTNRef.current.value = "";
    setInputChange("");
  }

  //Initiate the user's desired concert location
  const handleLocationSearch = debounce(() => {
    const inputValue = searchInputBTNRef.current.value;

    //Display if the input value is not empty or only contains one character or is only filled with white spaces
    if (inputValue.trim().length > 1) {
      setDisplayLocationStatus(true);
      setInputChange(inputValue);
    } else {
      setDisplayLocationStatus(false);
    }
  }, 250);

  return (
    <>
      <InputContext.Provider value={inputAdjustment}>
        <button
          type="button"
          className={Styles.newLocationBTN}
          onClick={
            locationSearchVisibility == "hide"
              ? handleShowLocationSearch
              : handleHideLocationSearch
          }
        >
          <MapPinCheck aria-hidden="true" />
          <span className={Styles.newLocation}>New Location</span>{" "}
          {locationSearchVisibility == "hide" ? (
            <ChevronDown aria-hidden="true" />
          ) : (
            <ChevronUp aria-hidden="true" />
          )}
        </button>
        <div
          className={
            locationSearchVisibility == "show"
              ? Styles.countryInputContainer
              : Styles.noVisibility
          }
        >
          <Search className={Styles.searchIcon} />
          <input
            type="text"
            name="country"
            className={Styles.countryInput}
            ref={searchInputBTNRef}
            disabled={locationSearchVisibility == "show" ? false : true}
            onChange={handleLocationSearch}
          />
        </div>
        {displayLocationStatus && <Location characterChange={inputChange} />}
      </InputContext.Provider>
    </>
  );
}

function Location({ characterChange }) {
  const { data, loading, error } = useLocationSearch(characterChange);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;
  if (data) return <Data locationData={data} />;
}

export { InputContext };
