import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { mockCharts } from "../../../data/mock/spotify-mock";
import Styles from "./chartHeading.module.css";

const keys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

export default function ChartHeading({
  mainBG = "#fff",
  displayFeaturedArtistsImg,
  heading,
  headingDescr,
  miniHeading,
  displayChart,
  subHeading,
  chartContainer,
  featuredArtists,
  seeAllGlobal,
  userCountry,
}) {
  const imgClasses = [
    Styles.supportingImg,
    Styles.mainImg,
    Styles.supportingImg2,
  ];
  const navigate = useNavigate();

  const [hoverStatus, setHoverStatus] = useState(false);

  const displayChartBTN = useRef(null);

  function handleViewGlobalCharts() {
    navigate(`/charts/top50/Global`, { state: { from: "home" } });
  }
  function handleViewLocalCharts() {
    navigate(`/charts/top50/${userCountry}`, { state: { from: "home" } });
  }

  return (
    <section
      className={Styles.globalChart}
      style={{ backgroundColor: `${mainBG}` }}
    >
      <div className={Styles.globalChartWrapper}>
        {/* This will display on the local charts */}
        <div
          className={Styles.featuredArtistsImgContainer}
          style={{ display: displayFeaturedArtistsImg ? "flex" : "none" }}
        >
          {mockCharts.slice(0, 3).map((songData, index) => (
            <img
              src={songData.artistImage}
              alt="Featured artists on this chart"
              className={imgClasses[index]}
              key={keys[index]}
            />
          ))}
        </div>
        <div className={Styles.chartDesriptionContainer}>
          <div className={Styles.chartDescriptionWrapper}>
            <span className={Styles.chartHeading}>{heading}</span>
            <h2 className={Styles.chartDescription}>{headingDescr}</h2>
            <p className={Styles.artistChartDescr}>{miniHeading}</p>
          </div>
          {/* This will be displayed on the global charts */}
          <button
            aria-label="View the chart"
            type="button"
            className={Styles.viewChartBTN}
            ref={displayChartBTN}
            onMouseEnter={() => setHoverStatus(true)}
            onMouseLeave={() => setHoverStatus(false)}
            onClick={handleViewGlobalCharts}
            style={{ display: displayChart ? "block" : "none" }}
          >
            <img
              src={mockCharts[0].artistImage}
              alt=""
              aria-hidden="true"
              className={Styles.artistImg}
            />
            <p
              className={Styles.top50}
              aria-hidden="true"
              style={{ display: hoverStatus ? "none" : "block" }}
            >
              GLOBAL TOP 50 CHART
            </p>
            <p
              className={Styles.featuredArtists}
              aria-hidden="true"
              style={{ display: hoverStatus ? "none" : "block" }}
            >
              {"Featuring songs from ".concat(
                ...mockCharts
                  .slice(0, 3)
                  .map((songData) => songData.artistName),
                " and more",
              )}
            </p>
            <div
              className={Styles.viewChart}
              aria-hidden="true"
              style={{ display: hoverStatus ? "flex" : "none" }}
            >
              View Chart
            </div>
          </button>
        </div>
        <div className={Styles.top50SongsContainer}>
          <div className={Styles.top50SongsWrapper}>
            <h2 className={Styles.heading}>{subHeading}</h2>
            <button
              type="button"
              aria-label="View the whole global top 50 chart"
              className={Styles.viewTop50BTN}
              onClick={
                seeAllGlobal ? handleViewGlobalCharts : handleViewLocalCharts
              }
            >
              SEE ALL <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <hr className={Styles.mainHr} aria-hidden="true" />
          {chartContainer}
        </div>
        <div className={Styles.featuredArtistsContainer}>
          <div className={Styles.featuredArtistsWrapper}>
            <h2 className={Styles.heading}>Featured Artists</h2>
          </div>
          <hr className={Styles.mainHr} aria-hidden="true" />
          {featuredArtists}
        </div>
      </div>
    </section>
  );
}
