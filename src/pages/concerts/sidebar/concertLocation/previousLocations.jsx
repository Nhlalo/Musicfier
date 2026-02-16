import { useContext, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { searchMockEvents } from "../../../../data/mock/ticketmaster-mock";
import {
  concertsDurationContext,
  concertsLocationContext,
  concertsInformationContext,
} from "../../concerts";
import {
  previousLocationSearchesContext,
  previousLocationsBTNContext,
} from "./concertLocation";
import Styles from "../sidebar.module.css";
import { LocationContext } from "../../../../components/layout/rootLayout";

const countryKeys = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];

//This will display/ clear the default concert location or the the previous searched concert location.
export default function PreviousLocations() {
  const { dateDuration } = useContext(concertsDurationContext);
  const { concertsDetails, setConcertsDetails } = useContext(
    concertsInformationContext,
  );
  const { previousConcertLocations, setPreviousConcertLocations } = useContext(
    previousLocationSearchesContext,
  );
  const { isLocationClicked, setIsLocationClicked } = useContext(
    previousLocationsBTNContext,
  );

  const { setConcertsLocation } = useContext(concertsLocationContext);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const locationState = useMemo(() => isLocationClicked, [isLocationClicked]);

  function changeURL(index) {
    const startDate = searchParams.get("sd");
    const endDate = searchParams.get("ed");
    const id = searchParams.get("id");

    const location = previousConcertLocations[index];
    const countryCode = location.country_code;
    const city = location.city;
    const cityParam = city ? `&c=${city}` : "";
    const idParam = id ? `&id=${id}` : "";

    navigate(
      `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}${cityParam}${idParam}`,
    );
  }

  //Function to help establish which location button has been pressed by the user.
  function changeClickedLocation(
    nearMe,
    secondLocation,
    thirdLocation,
    fourthLocation,
  ) {
    return setIsLocationClicked({
      location0: nearMe,
      location1: secondLocation,
      location2: thirdLocation,
      location3: fourthLocation,
    });
  }

  //Clear the location search
  function handleClearLocation() {
    //Only leave the default location, user's location, after clearing the search location history.
    setPreviousConcertLocations([previousConcertLocations[0]]);
    //After clearing the location search history, return to the default location , user location, and ensure the button is clicked.
    changeClickedLocation(true, false, false, false);
    setConcertsLocation(previousConcertLocations[0]);
    changeURL(0);
  }

  //Clicking button will allow concerts within the user's desired area
  function handleLocationChange(event) {
    const button = event.currentTarget;
    const index = button.dataset.index;

    if (index == 0) {
      changeClickedLocation(true, false, false, false);
      setConcertsLocation(previousConcertLocations[0]);
      changeURL(0);
    } else if (index == 1) {
      changeClickedLocation(false, true, false, false);
      setConcertsLocation(previousConcertLocations[1]);
      changeURL(1);
    } else if (index == 2) {
      changeClickedLocation(false, false, true, false);
      setConcertsLocation(previousConcertLocations[2]);
      changeURL(2);
    } else if (index == 3) {
      changeClickedLocation(false, false, false, true);
      setConcertsLocation(previousConcertLocations[3]);
      changeURL(3);
    }
  }
  return (
    <>
      <div>
        <div className={Styles.clearContainer}>
          <h3 className={Styles.visuallyHidden}>
            Select the locatiion of the concerts
          </h3>
          <h3 className={Styles.where} aria-hidden="true">
            Where?
          </h3>
          <button
            type="button"
            className={Styles.clearBTN}
            onClick={handleClearLocation}
          >
            clear
          </button>
        </div>
      </div>
      <div className={Styles.concertLocationContainer}>
        <div className={Styles.nearMeContainer}>
          {previousConcertLocations.slice(0, 2).map((location, index) => {
            return (
              <button
                type="button"
                className={
                  isLocationClicked[`location${index}`]
                    ? `${Styles.blue} ${Styles.BTNs}`
                    : `${Styles.BTNs}`
                }
                key={countryKeys[index]}
                data-city={location.city}
                data-country={location.country}
                data-countrycode={location.country_code}
                data-index={index}
                onClick={(e) => handleLocationChange(e)}
              >
                {index == 0
                  ? location.country
                  : location.city
                    ? location.city
                    : location.country}
              </button>
            );
          })}
        </div>
        {/* Display the third and fourth location if the array consists of 3 or more locations */}
        {previousConcertLocations.length > 2 && (
          <div className={Styles.locationContainer}>
            {previousConcertLocations.slice(2, 4).map((location, index) => {
              //This index starts at two because is essentially the third and fourth elements being constructured
              const indexContinuation = index + 2;

              return (
                <button
                  type="button"
                  className={
                    isLocationClicked[`location${indexContinuation}`]
                      ? `${Styles.blue} ${Styles.BTNs}`
                      : `${Styles.BTNs}`
                  }
                  key={countryKeys[indexContinuation]}
                  data-city={location.city}
                  data-country={location.country}
                  data-countrycode={location.country_code}
                  data-index={indexContinuation}
                  onClick={(e) => handleLocationChange(e)}
                >
                  {location.city ? location.city : location.country}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
