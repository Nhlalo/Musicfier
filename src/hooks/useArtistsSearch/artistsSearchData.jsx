import { useState, useContext, useEffect } from "react";
import {
  concertsDurationContext,
  concertsLocationContext,
  concertsInformationContext,
  artistInforContext,
} from "../../pages/concerts/concerts";
import { ArtistInputContext } from "../../pages/concerts/concertDetails/findConcerts";
import { LocationContext } from "../../components/layout/rootLayout";
import { searchMockEvents } from "../../data/mock/ticketmaster-mock";
import Styles from "./artistsSearch.module.css";

function Artists({ imagesrc, name, dataID }) {
  const userLocation = useContext(LocationContext);
  const { concertLocation } = useContext(concertsLocationContext);
  const { dateDuration } = useContext(concertsDurationContext);
  const { setConcertsDetails } = useContext(concertsInformationContext);
  const { setArtistInfor } = useContext(artistInforContext);
  const { searchInputRef, setDisplayArtistData } =
    useContext(ArtistInputContext);

  const [attractionId, setAttractionID] = useState(null);
  console.log("Name", name);
  console.log("dataId", dataID);

  useEffect(() => {
    if (attractionId) {
      //if the location has not been changed, use the default country code, user's country code.
      const countryCode = concertLocation?.country_code
        ? concertLocation.country_code
        : userLocation.country_code;
      //if the location has not been changed, use the default city, user's city.
      const city = concertLocation?.city
        ? concertLocation.city
        : userLocation.city;
      const inforConcerts = searchMockEvents(
        attractionId,
        name,
        dateDuration.startDate,
        dateDuration.endDate,
        countryCode,
        city,
      );
      setArtistInfor({ artistID: attractionId, artistName: name });
      setConcertsDetails(inforConcerts);
      //Remove the artist suggestion after clicking on your preferred artist.
      setDisplayArtistData(false);
    }
  }, [attractionId]);

  function handleClick(event) {
    console.log("Pressed");
    const button = event.currentTarget;
    const id = button.dataset.id;
    //Clear the input bar after clicking on your desired artist.
    searchInputRef.current.value = "";
    setAttractionID(id);
  }
  return (
    <button
      type="button"
      aria-label={`Select to view ${name} concert details`}
      data-id={dataID}
      className={Styles.artistInfor}
      onClick={handleClick}
    >
      <img
        src={imagesrc}
        alt={`${name}`}
        className={Styles.artistImg}
        aria-hidden="true"
      />
      <span className={Styles.artistName} aria-hidden="true">
        {name}
      </span>
    </button>
  );
}

export default function Data({ artistsInfor }) {
  const [artistCount, setArtistCount] = useState(3);

  function handleClick() {
    setArtistCount((prev) => prev + 3);
  }

  return (
    <div className={Styles.artistsContainer}>
      <span className={Styles.artists}>Artists</span>

      {artistsInfor.slice(0, artistCount).map((artist, index) => {
        return (
          <Artists
            imagesrc={artist.image}
            name={artist.name}
            dataID={artist.id}
            key={index}
          />
        );
      })}

      {artistsInfor.length > artistCount && (
        <button
          type="button"
          className={Styles.showMoreBTN}
          onClick={handleClick}
        >
          Show More
        </button>
      )}
    </div>
  );
}
