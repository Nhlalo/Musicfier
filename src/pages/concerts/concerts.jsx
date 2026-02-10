import { useState, useMemo, useEffect, createContext, useContext } from "react";
import { LocationContext } from "../../components/layout/rootLayout";
import { searchMockEvents } from "../../data/mock/ticketmaster-mock";
import { getTodayDate, getTomorrowDate } from "../../utils/dates";
import Concerts from "./concertDetails/concertDetails";
import { useLocation } from "react-router";

const concertsDurationContext = createContext({});
const concertsLocationContext = createContext({});
const concertsInformationContext = createContext({});
const artistInforContext = createContext({});

export default function ConcertList() {
  const [dateDuration, setDateDuration] = useState({
    startDate: getTodayDate(),
    endDate: getTomorrowDate(),
  });
  //The initial location for concerts searching will be the user's location
  const [concertsLocation, setConcertsLocation] = useState({});
  const [concertsDetails, setConcertsDetails] = useState([]);
  const [artistInfor, setArtistInfor] = useState({});

  const userLocation = useContext(LocationContext);

  const dateAdjustement = useMemo(
    () => ({
      dateDuration,
      setDateDuration,
    }),
    [dateDuration],
  );
  const locationAdjustement = useMemo(
    () => ({
      concertsLocation,
      setConcertsLocation,
    }),
    [concertsLocation],
  );
  const concertDetailsAdjustement = useMemo(
    () => ({
      concertsDetails,
      setConcertsDetails,
    }),
    [concertsDetails],
  );
  const artistInforAdjustement = useMemo(
    () => ({
      artistInfor,
      setArtistInfor,
    }),
    [concertsDetails],
  );
  const userLocationStored = useMemo(() => userLocation, [userLocation]);

  function searchConcertDetails(artistID, keyWord, countryCode, city) {
    const startDate = `${dateDuration.startDate}T00:00:00Z`;
    const endDate = `${dateDuration.endDate}T23:59:59Z`;

    const getConcertDetails = () => {
      const concertInfor = searchMockEvents(
        artistID,
        keyWord,
        startDate,
        endDate,
        countryCode,
        city,
      );
      return concertInfor;
    };
    setConcertsDetails(getConcertDetails());
  }

  useEffect(() => {
    if (userLocation) {
      const countryCode = userLocation.country_code;
      const city = userLocation.city;
      searchConcertDetails(null, null, countryCode, city);
    }
  }, [userLocationStored]);

  useEffect(() => {
    //Use JSON.stringify for object comparisons because for object comparisons, JS compares their address in memory.
    if (JSON.stringify(concertsLocation) !== JSON.stringify({})) {
      const artistID = artistInfor?.artistId;
      const keyWord = artistInfor?.artistName;
      const currentartistID = artistID ? attractionID : null;
      const currentKeyWord = keyWord ? keyWord : null;
      const countryCode = concertsLocation.country_code;
      const city = concertsLocation.city;

      searchConcertDetails(currentartistID, currentKeyWord, countryCode, city);
    }
  }, [locationAdjustement]);

  return (
    <>
      <artistInforContext.Provider value={artistInforAdjustement}>
        <concertsInformationContext.Provider value={concertDetailsAdjustement}>
          <concertsLocationContext.Provider value={locationAdjustement}>
            <concertsDurationContext.Provider value={dateAdjustement}>
              <Concerts />
            </concertsDurationContext.Provider>
          </concertsLocationContext.Provider>
        </concertsInformationContext.Provider>
      </artistInforContext.Provider>
    </>
  );
}

export {
  concertsDurationContext,
  concertsLocationContext,
  concertsInformationContext,
  artistInforContext,
};
