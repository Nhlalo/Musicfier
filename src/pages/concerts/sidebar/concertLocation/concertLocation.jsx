import { createContext, useEffect, useState, useMemo } from "react";
import { mockUserLocation } from "../../../../data/mock/user-location-mock";
import PreviousLocations from "./previousLocations";
import ConcertLocationOptions from "./searchLocation";
import Styles from "../sidebar.module.css";

const userLocation = mockUserLocation;
const previousLocationSearchesContext = createContext([]);
const previousLocationsBTNContext = createContext();

//This displays the previous location searches and the input to search for new locations, within the side bar.
export default function ConcertLocations() {
  const [previousConcertLocations, setPreviousConcertLocations] = useState([]);
  const [isLocationClicked, setIsLocationClicked] = useState({
    location0: false,
    location1: false,
    location2: false,
    location3: false,
  });

  const previousConcertLocationsAdjustement = useMemo(
    () => ({
      previousConcertLocations,
      setPreviousConcertLocations,
    }),
    [previousConcertLocations],
  );
  const previousConcertLocationsBTNAdjustement = useMemo(
    () => ({
      isLocationClicked,
      setIsLocationClicked,
    }),
    [isLocationClicked],
  );

  useEffect(() => {
    setPreviousConcertLocations([
      {
        country: "Near Me",
        country_code: userLocation.country_code,
        city: userLocation.city,
      },
      { country: "USA", country_code: "US", city: null },
      { country: "South Africa", country_code: "ZA", city: null },
      { country: "Australia", country_code: "AU", city: null },
    ]);
  }, []);
  return (
    <previousLocationSearchesContext.Provider
      value={previousConcertLocationsAdjustement}
    >
      <previousLocationsBTNContext.Provider
        value={previousConcertLocationsBTNAdjustement}
      >
        <div className={Styles.whereContainer}>
          <PreviousLocations />
          <ConcertLocationOptions />
        </div>
      </previousLocationsBTNContext.Provider>
    </previousLocationSearchesContext.Provider>
  );
}

export { previousLocationSearchesContext, previousLocationsBTNContext };
