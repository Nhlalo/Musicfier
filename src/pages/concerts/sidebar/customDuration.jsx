import { useState, useRef, useContext } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { concertsDurationContext } from "../concerts";

function DurationInput({
  firstDate,
  lastDate,
  customRangeClassName,
  valueConcertDurationVisibility,
  startDateRef,
  endDateRef,
}) {
  const { setDateDuration } = useContext(concertsDurationContext);

  //Clicking this button will adjust the time period to display the concerts available
  function handleClick() {
    setDateDuration({
      startDate: startDateRef.current,
      endDate: endDateRef.current,
    });
  }
  return (
    <div className={customRangeClassName}>
      <div className={Styles.startDateContainer}>
        <label htmlFor="startDate" className={Styles.start}>
          Starts
        </label>
        <input
          type="date"
          id="startDate"
          name="start_date"
          className={Styles.startDate}
          value={firstDate}
          ref={startDateRef}
          disabled={(valueConcertDurationVisibility = "show" ? false : true)}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className={Styles.endDateContainer}>
        <label htmlFor="endDate" className={Styles.end}>
          Ends
        </label>
        <input
          type="date"
          id="endDate"
          name="end_date"
          className={Styles.endDate}
          value={lastDate}
          ref={endDateRef}
          disabled={valueConcertDurationVisibility == "show" ? false : true}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        type="button"
        className={Styles.setCustomRangeBTN}
        onClick={handleClick}
      >
        Set Custom Range
      </button>
    </div>
  );
}

export default function ConcertCustomDuration({ startDate, endDate }) {
  const [concertDurationVisibility, setConcertDurationVisibility] =
    useState("hide");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  //Display the concert duration
  function handleShowCustomDurationVisibility() {
    setConcertDurationVisibility("show");
  }

  //Hide the concert duration
  function handleHideCustomDurationVisibility() {
    setConcertDurationVisibility("hide");
  }

  return (
    <>
      <button
        type="button"
        className={Styles.customRangeBTN}
        onClick={
          concertDurationVisibility == "hide"
            ? handleShowCustomDurationVisibility
            : handleHideCustomDurationVisibility
        }
      >
        <Calendar aria-hidden="true" />{" "}
        <span className={Styles.customRange}>Custom Range</span>{" "}
        {concertDurationVisibility == "hide" ? (
          <ChevronDown aria-hidden="true" />
        ) : (
          <ChevronUp aria-hidden="true" />
        )}
      </button>
      <DurationInput
        firstDate={startDate}
        lastDate={endDate}
        customRangeClassName={
          concertDurationVisibility == "show"
            ? Styles.dateContainer
            : Styles.noVisibility
        }
        valueConcertDurationVisibility={concertDurationVisibility}
        startDateRef={startDateInputRef}
        endDateRef={endDateInputRef}
      />
    </>
  );
}
