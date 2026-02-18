import { useState, useContext, useRef, createContext, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router";
import { Calendar, Rows3 } from "lucide-react";
import useArtistSearch from "../../../hooks/useArtistsSearch/useArtistsSearch";
import { concertsInformationContext } from "../concerts";
import debounce from "../../../utils/debounce";
import formatDate from "../../../utils/dateConversion";
import ErrorMessage from "../../../hooks/useArtistsSearch/artistsSearchError";
import Data from "../../../hooks/useArtistsSearch/artistsSearchData";
import LoadingSpinner from "../../../components/ui/loadingSpinner/loadingSpinner";
import ImageReplacement from "../../../components/ui/imageReplacement";
import Styles from "./concertDetails.module.css";

const ArtistInputContext = createContext({});

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

  const searchInputAdjustment = useMemo(() => {
    return { searchInputRef, setDisplayArtistData };
  }, [searchInputRef, displayArtistData]);

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
    <ArtistInputContext.Provider value={searchInputAdjustment}>
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
    </ArtistInputContext.Provider>
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
      {/* Use an icon when there is no artist image source */}
      {artistImg && (
        <img
          src={artistImg}
          alt={`${artist}`}
          loading="lazy"
          aria-hidden="true"
          className={Styles.artistImage}
        />
      )}
      {!artistImg && <ImageReplacement iconClass={Styles.artistImage} />}
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

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const artistID = searchParams.get("id");

  const navigationState = location?.state;
  const imageSrc = navigationState?.imageSrc;
  console.log("FindConcerts", imageSrc);
  const artistName = navigationState?.artistName;

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
          {!concertsDetails.length && !artistID && (
            <div className={Styles.NoConcerts}>
              <span className={Styles.NoConcertsIndication}>
                No Concerts Here
              </span>
              <span className={Styles.NoConcertsDescr}>
                Looks like there are no upcoming concerts with your preferred
                options
              </span>
            </div>
          )}
          {!concertsDetails.length && artistID && (
            <div className={Styles.NoConcerts}>
              <img
                src={imageSrc}
                alt={artistName}
                className={Styles.NoConcertsArtistImg}
              />
              <span className={Styles.NoConcertsIndication}>
                No Concerts Here
              </span>
              <span className={Styles.NoConcertsDescr}>
                Looks like this artist has no concerts with your preferred
                options
              </span>
            </div>
          )}

          {concertsDetails.length > 0 &&
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
export { ArtistInputContext };
