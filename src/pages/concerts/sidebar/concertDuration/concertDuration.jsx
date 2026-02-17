import { useState, useRef, useMemo } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router";

import {
  getTodayDate,
  getTomorrowDate,
  getDayAfterTomorrowDate,
  getThisWeekendDates,
} from "../../../../utils/dates";
import ConcertCustomDuration from "./customDuration";
import Styles from "../sidebar.module.css";

export default function ConcertDuration() {
  const todayDateRef = useRef(getTodayDate());
  const tomorrowDateRef = useRef(getTomorrowDate());
  const dayAfterTomorrowRef = useRef(getDayAfterTomorrowDate());
  const fridayRef = useRef(getThisWeekendDates().start);
  const sundayRef = useRef(getThisWeekendDates().end);
  const todayBTNRef = useRef(null);
  const tomorrowBTNRef = useRef(null);
  const weekendBTNRef = useRef(null);
  const upcomingInputRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const startDate = searchParams.get("sd").slice(0, 10);
  const endDate = searchParams.get("ed").slice(0, 10);

  const [buttonStatus, setButtonStatus] = useState({
    upcomingStatus: false,
    todayStatus: false,
    tomorrowStatus: false,
    weekendStatus: false,
  });
  const [dateDuration, setDateDuration] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const adjustDateDuration = useMemo(() => {
    return { dateDuration, setDateDuration };
  }, [dateDuration]);

  const navigate = useNavigate();

  const params = useParams();

  function changeURL(startDuration, endDuration) {
    const startDate = `${startDuration}T00:00:00Z`;
    const endDate = `${endDuration}T23:59:59Z`;
    const id = searchParams.get("id");

    const countryCode = params.countrycode;
    const city = searchParams.get("c");
    const cityParam = city ? `&c=${city}` : "";
    const idParam = id ? `&id=${id}` : "";

    navigate(
      `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}${cityParam}${idParam}`,
    );
  }
  //This will show which of the four buttons is clicked
  function updateConcertDurationBTNs(upcoming, today, tommorrow, weekend) {
    setButtonStatus({
      upcomingStatus: upcoming,
      todayStatus: today,
      tomorrowStatus: tommorrow,
      weekendStatus: weekend,
    });
  }
  function handleToday() {
    const startDate = todayDateRef.current;
    const endDate = tomorrowDateRef.current;
    updateConcertDurationBTNs(false, true, false, false);
    setDateDuration({ startDate: startDate, endDate: endDate });
    changeURL(startDate, endDate);
  }
  function handleTomorrow() {
    const startDate = tomorrowDateRef.current;
    const endDate = dayAfterTomorrowRef.current;
    updateConcertDurationBTNs(false, false, true, false);
    setDateDuration({ startDate: startDate, endDate: endDate });
    changeURL(startDate, endDate);
  }
  function handleWeekend() {
    const startDate = fridayRef.current;
    const endDate = sundayRef.current;
    updateConcertDurationBTNs(false, false, false, true);
    setDateDuration({ startDate: startDate, endDate: endDate });
    changeURL(startDate, endDate);
  }
  function handleUpcoming() {
    const startDate = todayDateRef.current;
    const endDate = tomorrowDateRef.current;
    updateConcertDurationBTNs(true, false, false, false);
    setDateDuration({ startDate: startDate, endDate: endDate });
    changeURL(startDate, endDate);
  }
  return (
    <div className={Styles.whenContainer}>
      <span className={Styles.visuallyHidden}>
        Select the date of the concerts
      </span>
      <h3 className={Styles.when} aria-hidden="true">
        When?
      </h3>
      <div className={Styles.concertDate}>
        <div className={Styles.todayContainer}>
          <button
            type="button"
            className={
              buttonStatus.upcomingStatus
                ? ` ${Styles.BTNs} ${Styles.blue}`
                : ` ${Styles.BTNs}`
            }
            ref={upcomingInputRef}
            onClick={handleUpcoming}
          >
            All Upcoming
          </button>
          <button
            type="button"
            className={
              buttonStatus.todayStatus
                ? `${Styles.BTNs} ${Styles.blue} `
                : `${Styles.BTNs}`
            }
            ref={todayBTNRef}
            onClick={handleToday}
          >
            Today
          </button>
        </div>
        <div className={Styles.tomorrowContainer}>
          <button
            type="button"
            className={
              buttonStatus.tomorrowStatus
                ? ` ${Styles.BTNs} ${Styles.blue}`
                : ` ${Styles.BTNs}`
            }
            ref={tomorrowBTNRef}
            onClick={handleTomorrow}
          >
            Tomorrow
          </button>
          <button
            type="button"
            className={
              buttonStatus.weekendStatus
                ? `${Styles.BTNs} ${Styles.blue}`
                : `${Styles.BTNs}`
            }
            ref={weekendBTNRef}
            onClick={handleWeekend}
          >
            This Weekend
          </button>
        </div>
      </div>
      <ConcertCustomDuration duration={adjustDateDuration} />
    </div>
  );
}
