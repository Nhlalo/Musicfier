import { createContext, useEffect, useState, useMemo } from "react";
import { mockUserLocation } from "../../../../data/mock/user-location-mock";
import PreviousLocations from "./previousLocations";
import ConcertLocationOptions from "./searchLocation";
import Styles from "../sidebar.module.css";

const userLocation = mockUserLocation;
const previousLocationSearchesContext = createContext([]);

//This displays the previous location searches and the input to search for new locations, within the side bar.
export default function ConcertLocations() {
  const [previousConcertLocations, setPreviousConcertLocations] = useState([]);

  const previousConcertLocationsAdjustement = useMemo(
    () => ({
      previousConcertLocations,
      setPreviousConcertLocations,
    }),
    [previousConcertLocations],
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
      <div className={Styles.whereContainer}>
        <PreviousLocations />
        <ConcertLocationOptions />
      </div>
    </previousLocationSearchesContext.Provider>
  );
}

export { previousLocationSearchesContext };
