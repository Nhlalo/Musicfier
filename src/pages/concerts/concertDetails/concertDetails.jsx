import { useState, useEffect, useRef, forwardRef } from "react";
import { Calendar, Rows3 } from "lucide-react";
import useArtistSearch from "../../../hooks/useArtistsSearch/useArtistsSearch";
import {
  getTodayDate,
  getTomorrowDate,
  getDayAfterTomorrowDate,
  getThisWeekendDates,
} from "../../../utils/dates";
import ErrorMessage from "../../../hooks/useArtistsSearch/artistsSearchError";
import Data from "../../../hooks/useArtistsSearch/artistsSearchData";
import LoadingSpinner from "../../../components/ui/loadingSpinner/loadingSpinner";

function ArtistInfor({ characterChange }) {
  const { data, loading, error } = useArtistSearch(characterChange);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  if (data) return <Data artistsInfor={data} />;
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
