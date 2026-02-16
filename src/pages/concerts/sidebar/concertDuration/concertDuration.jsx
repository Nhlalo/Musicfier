import { useState, useRef, useContext, useEffect } from "react";
import { searchMockEvents } from "../../../../data/mock/ticketmaster-mock";
import {
  concertsDurationContext,
  concertsLocationContext,
  concertsInformationContext,
} from "../../concerts";
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

  const [upcomingStatus, setUpcomingStatus] = useState(false);
  const [todayStatus, setTodayStatus] = useState(false);
  const [tomorrowStatus, setTomorrowStatus] = useState(false);
  const [weekendStatus, setWeekendStatus] = useState(false);
  const [startDate, setStartDate] = useState(todayDateRef.current);
  const [endDate, setEndDate] = useState(tomorrowDateRef.current);

  const { dateDuration, setDateDuration } = useContext(concertsDurationContext);
  const { concertsLocation } = useContext(concertsLocationContext);
  const { concertsDetails, setConcertsDetails } = useContext(
    concertsInformationContext,
  );

  //Changing the time period will cause another concerts search for that period
  useEffect(() => {
    const anyTimePeriodClicked =
      upcomingStatus || tomorrowStatus || todayStatus || weekendStatus;
    if (anyTimePeriodClicked) {
      const inforConcerts = searchMockEvents(
        concertsDetails.artistId,
        concertsDetails.artistName,
        dateDuration.startDate,
        dateDuration.endDate,
        concertsLocation.country_code,
        concertsLocation.city,
      );

      setConcertsDetails(inforConcerts);
    }
  }, [upcomingStatus, todayStatus, tomorrowStatus, weekendStatus]);

  //This will show which of the four buttons is clicked
  function updateConcertDurationBTNs(upcoming, today, tommorrow, weekend) {
    setUpcomingStatus(upcoming);
    setTodayStatus(today);
    setTomorrowStatus(tommorrow);
    setWeekendStatus(weekend);
  }
  function handleToday() {
    setStartDate(todayDateRef.current);
    setEndDate(tomorrowDateRef.current);
    updateConcertDurationBTNs(false, true, false, false);
    setDateDuration({
      startDate: todayDateRef.current,
      endDate: tomorrowDateRef.current,
    });
  }
  function handleTomorrow() {
    setStartDate(tomorrowDateRef.current);
    setEndDate(dayAfterTomorrowRef.current);
    updateConcertDurationBTNs(false, false, true, false);
    setDateDuration({
      startDate: tomorrowDateRef.current,
      endDate: dayAfterTomorrowRef.current,
    });
  }
  function handleWeekend() {
    setStartDate(fridayRef.current);
    setEndDate(sundayRef.current);

    updateConcertDurationBTNs(false, false, false, true);
    setDateDuration({
      startDate: fridayRef.current,
      endDate: sundayRef.current,
    });
  }
  function handleUpcoming() {
    setStartDate(todayDateRef.current);
    setEndDate(tomorrowDateRef.current);
    updateConcertDurationBTNs(true, false, false, false);
    setDateDuration({
      startDate: todayDateRef.current,
      endDate: tomorrowDateRef.current,
    });
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
              upcomingStatus
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
              todayStatus ? `${Styles.BTNs} ${Styles.blue} ` : `${Styles.BTNs}`
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
              tomorrowStatus
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
              weekendStatus ? `${Styles.BTNs} ${Styles.blue}` : `${Styles.BTNs}`
            }
            ref={weekendBTNRef}
            onClick={handleWeekend}
          >
            This Weekend
          </button>
        </div>
      </div>
      <ConcertCustomDuration startDate={startDate} endDate={endDate} />
    </div>
  );
}
