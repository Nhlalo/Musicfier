import { useState, useRef, useContext } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { concertsDurationContext } from "../../Concerts";
import Styles from "../Sidebar.module.css";

function DurationInput({
  duration,
  customRangeClassName,
  valueConcertDurationVisibility,
}) {
  const { dateDuration, setDateDuration } = useContext(concertsDurationContext);

  const [customDateDuration, setCustomDateDuration] = useState({
    ...dateDuration,
  });

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const navigate = useNavigate();

  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    const startDate = `${startDateInputRef.current.value}T00:00:00Z`;
    const endDate = `${endDateInputRef.current.value}T23:59:59Z`;
    const id = searchParams.get("id");

    const countryCode = params.countrycode;
    const city = searchParams.get("c");
    const cityParam = city ? `&c=${city}` : "";
    const idParam = id ? `&id=${id}` : "";
    setDateDuration({ ...customDateDuration });
    navigate(
      `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}${cityParam}${idParam}`,
    );
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
          value={customDateDuration.startDate}
          ref={startDateInputRef}
          disabled={(valueConcertDurationVisibility = "show" ? false : true)}
          onChange={(e) =>
            setCustomDateDuration((prev) => ({
              ...prev,
              startDate: e.target.value,
            }))
          }
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
          value={customDateDuration.endDate}
          ref={endDateInputRef}
          disabled={(valueConcertDurationVisibility = "show" ? false : true)}
          onChange={(e) =>
            setCustomDateDuration((prev) => ({
              ...prev,
              endDate: e.target.value,
            }))
          }
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

export default function ConcertCustomDuration({ duration }) {
  const [concertDurationVisibility, setConcertDurationVisibility] =
    useState("hide");

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
        duration={duration}
        customRangeClassName={
          concertDurationVisibility == "show"
            ? Styles.dateContainer
            : Styles.noVisibility
        }
        valueConcertDurationVisibility={concertDurationVisibility}
      />
    </>
  );
}
