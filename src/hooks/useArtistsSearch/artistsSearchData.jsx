import { useState, useContext, useEffect } from "react";
import {
  concertsDurationContext,
  concertsLocationContext,
  concertsInformationContext,
} from "../../pages/concerts/concerts";
import { searchMockEvents } from "../../data/mock/ticketmaster-mock";
import Styles from "./artistsSearch.module.css";

function Artists({ imagesrc, name, dataID }) {
  const { concertLocation } = useContext(concertsLocationContext);
  const { dateDuration } = useContext(concertsDurationContext);
  const { setConcertsDetails } = useContext(concertsInformationContext);

  const [attractionId, setAttractionID] = useState(null);

  useEffect(() => {
    if (attractionId) {
      const inforConcerts = async () => {
        return searchMockEvents(
          attractionId,
          name,
          dateDuration.startDate,
          dateDuration.endDate,
          concertLocation.country_code,
          concertLocation.city,
        );
      };
      setConcertsDetails(inforConcerts);
    }
  }, [attractionId]);

  function handleClick(event) {
    const button = event.currentTarget;
    const id = button.dataset.id;
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

      {artistsInfor.slice(0, artistCount).map((artist) => {
        return (
          <Artists
            imagesrc={artist.image}
            name={artist.name}
            dataId={artist.id}
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
