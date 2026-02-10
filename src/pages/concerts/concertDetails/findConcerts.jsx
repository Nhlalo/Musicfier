import { useState, useContext, useRef } from "react";
import { Calendar, Rows3 } from "lucide-react";
import useArtistSearch from "../../../hooks/useArtistsSearch/useArtistsSearch";
import {
  concertsDurationContext,
  concertsLocationContext,
  concertsInformationContext,
} from "../concerts";
import { searchMockEvents } from "../../../data/mock/ticketmaster-mock";
import debounce from "../../../utils/debounce";
import formatDate from "../../../utils/dateConversion";
import ErrorMessage from "../../../hooks/useArtistsSearch/artistsSearchError";
import Data from "../../../hooks/useArtistsSearch/artistsSearchData";
import LoadingSpinner from "../../../components/ui/loadingSpinner/loadingSpinner";
import Styles from "./concertDetails.module.css";

function ArtistInfor({ characterChange }) {
  const { data, loading, error } = useArtistSearch(characterChange);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  if (data) return <Data artistsInfor={data} />;
}
//This is the component that will search and display the artist information
function ArtistDetails({ showFilter }) {
  const [displayArtistData, setDisplayArtistData] = useState(false);
  const [inputChange, setInputChange] = useState("");
  const searchInputRef = useRef(null);

  //Initiate the user's desired concert location
  const handleArtistSearch = debounce(() => {
    const inputValue = searchInputRef.current.value;

    //Display if the input value is not empty or only contains one character or is only filled with white spaces
    if (inputValue.trim().length > 1) {
      setDisplayArtistData(true);
      setInputChange(inputValue);
    } else {
      setDisplayArtistData(false);
    }
  }, 250);

  function handleShowFilter() {
    showFilter(true);
  }
  return (
    <div className={Styles.searchFilterContainer}>
      {/* Search results of artist information, error or loading will be displayed when the search input is not empty or filled with white spaces */}
      {displayArtistData && <ArtistInfor characterChange={inputChange} />}
      <input
        type="text"
        name="concerts"
        className={Styles.concertInputSearch}
        placeholder="Artists or Bands"
        aria-label="Search for an artist's or a bands's concerts"
        onChange={handleArtistSearch}
        ref={searchInputRef}
      />
      <button
        type="button"
        className={Styles.filterBTN}
        onClick={handleShowFilter}
      >
        <Rows3 className={Styles.filterIcon} aria-hidden="true" />
        <span className={Styles.filter}>Filter</span>
      </button>
    </div>
  );
}

function ArtistConcert({
  artist,
  location,
  date,
  genre,
  artistImg,
  concertLink,
}) {
  return (
    <a
      href={concertLink}
      aria-label={`Purchase ticket for ${artist}'s concert on ${date} in ${location}`}
      className={Styles.concertLink}
    >
      <img
        src={artistImg}
        alt={`${artist}`}
        loading="lazy"
        aria-hidden="true"
        className={Styles.artistImage}
      />
      <div aria-hidden="true" className={Styles.concertInfor}>
        <span className={Styles.date}>
          <Calendar className={Styles.calendarIcon} />
          {date}
        </span>
        <span className={Styles.artistName}>{artist}</span>
        <span className={Styles.location}>{location}</span>
        <span className={Styles.genre}>{genre}</span>
      </div>
    </a>
  );
}

export default function ConcertsInformation({ visibilityConcert, showFilter }) {
  const { concertsDetails } = useContext(concertsInformationContext);

  return (
    <div className={Styles.allConcertsWrapper}>
      <h1 className={Styles.concertCountry}>
        Concerts in <span className={Styles.country}>South Africa</span>{" "}
      </h1>
      <p className={Styles.allConcertsDescr}>
        Find live music events in South Africa, get concert tickets, see tour
        dates and more.
      </p>
      <ArtistDetails showFilter={showFilter} />
      {/* Concerts by the searched artists will dynamically appear here */}
      {visibilityConcert && (
        <div className={Styles.artistConcertContainer}>
          {concertsDetails &&
            concertsDetails.map((concertDetails, index) => {
              return (
                <ArtistConcert
                  artist={concertDetails.artistName}
                  location={`${concertDetails.venueName}, ${concertDetails.venueCity ? concertDetails.venueCity : concertDetails.venueState}`}
                  date={formatDate(concertDetails.eventDate)}
                  genre={concertDetails.artistGenre}
                  artistImg={concertDetails.artistImage}
                  concertLink={concertDetails.ticketUrl}
                  key={index}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
