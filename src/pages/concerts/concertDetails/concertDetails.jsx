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
