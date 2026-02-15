import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router";
import {
  concertsInformationContext,
  artistInforContext,
} from "../../pages/concerts/concerts";
import { ArtistInputContext } from "../../pages/concerts/concertDetails/findConcerts";
import { searchMockEvents } from "../../data/mock/ticketmaster-mock";
import Styles from "./artistsSearch.module.css";

function Artists({ imagesrc, name, dataID }) {
  const { setConcertsDetails } = useContext(concertsInformationContext);
  const { setArtistInfor } = useContext(artistInforContext);
  const { searchInputRef, setDisplayArtistData } =
    useContext(ArtistInputContext);

  const [attractionId, setAttractionID] = useState(null);

  const navigate = useNavigate();

  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const countryCode = params.countrycode;
  const startDate = searchParams.get("sd");
  const endDate = searchParams.get("ed");
  const city = searchParams.get("c");
  const cityParam = city ? `&c=${city}` : "";

  useEffect(() => {
    if (attractionId) {
      const cityName = city ? city : null;
      const inforConcerts = searchMockEvents(
        attractionId,
        null,
        startDate,
        endDate,
        countryCode,
        cityName,
      );
      setArtistInfor({ artistID: attractionId, artistName: name });
      setConcertsDetails(inforConcerts);
      //Remove the artist suggestion after clicking on your preferred artist.
      setDisplayArtistData(false);
    }
  }, [attractionId]);

  function handleClick(event) {
    const button = event.currentTarget;
    const id = button.dataset.id;
    //Clear the input bar after clicking on your des`ired artist.
    searchInputRef.current.value = "";
    setAttractionID(id);
    navigate(
      `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}${cityParam}&ad=${id}`,
    );
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
