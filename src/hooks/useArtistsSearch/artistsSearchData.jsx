import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router";
import {
  concertsInformationContext,
  artistInforContext,
} from "../../pages/concerts/Concerts";
import { ArtistInputContext } from "../../pages/concerts/concertDetails/FindConcerts";
import { searchMockEvents } from "../../data/__mocks__/ticketmaster.mock";
import {
  generateFallBackImage,
  generateSizes,
  generateSrcset,
} from "../../utils/imagery-utils";
import ImageReplacement from "../../components/ui/ImageReplacement";
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
      setDisplayArtistData(false);
    }
  }, [attractionId]);

  function handleClick(event) {
    const button = event.currentTarget;
    const id = button.dataset.id;
    const imageSrc = button.dataset.imagesrc;
    const artistName = button.dataset.name;
    //Clear the input bar after clicking on your desired artist.
    searchInputRef.current.value = "";
    setAttractionID(id);
    navigate(
      `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}${cityParam}&id=${id}`,
      { state: { imageSrc: imageSrc, artistName: artistName } },
    );
  }
  return (
    <button
      type="button"
      aria-label={`Select to view ${name} concert details`}
      data-id={dataID}
      data-imagesrc={imagesrc}
      data-name={name}
      className={Styles.artistInfor}
      onClick={handleClick}
    >
      {imagesrc && (
        <img
          src={generateFallBackImage(imagesrc)}
          srcSet={generateSrcset(imagesrc)}
          sizes={generateSizes(imagesrc)}
          alt={`${name}`}
          className={Styles.artistImg}
          aria-hidden="true"
        />
      )}
      {!imagesrc && <ImageReplacement iconClass={Styles.artistImg} />}
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
