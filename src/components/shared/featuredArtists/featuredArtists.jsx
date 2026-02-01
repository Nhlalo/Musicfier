import useScrollLogic from "../../../hooks/scrollLogic";
import { mockCharts } from "../../../data/mock/spotify-mock";
import { useState, useRef } from "react";
import Styles from "./featuredArtists.module.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

function FeaturedArtist({ artistSpotifyID, artistName }) {
  return (
    <Link
      to={`artist/${artistSpotifyID}`}
      aria-label={`View ${artistName} profile`}
    >
      <figure className={Styles.artistWrapper} aria-hidden="true">
        <img src={artistImg} alt={artistName} className={Styles.artistImg} />
        <figcaption className={Styles.artistName}>{artistName}</figcaption>
      </figure>
    </Link>
  );
}
export default function FeaturedArtists() {
  const chartContainerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const leftEdgeSongRef = useRef(0);
  const isResizingRef = useRef(false);
  const originalScrollBehaviorRef = useRef("smooth"); // Store original behavior

  const [scrollStartStatus, setScrollStartStatus] = useState(true);
  const [scrollEndStatus, setScrollEndStatus] = useState(false);

  useScrollLogic(
    chartContainerRef,
    resizeTimeoutRef,
    leftEdgeSongRef,
    isResizingRef,
    originalScrollBehaviorRef,
    setScrollStartStatus,
    setScrollEndStatus,
  );

  const handleLeftScroll = () => scrollGridCallback("left");
  const handleRightScroll = () => scrollGridCallback("right");

  return (
    <>
      <div className={Styles.featuredArtistsContainer}>
        <div className={Styles.overlay}></div>
        <div className={Styles.featuredArtistsWrapper} ref={chartContainerRef}>
          {mockCharts.map((songData) => (
            <FeaturedArtist
              artistSpotifyID={songData.spotifyArtistId}
              artistName={artistName}
            />
          ))}
        </div>
      </div>
      <div className={Styles.artistNavigatorBTNContainer}>
        <button
          type="button"
          aria-label="Shift to the left to view the previous part of the chart"
          onClick={handleLeftScroll}
          disabled={scrollStartStatus}
          className={
            scrollStartStatus
              ? `${Styles.toLeftBTN} ${Styles.btnDisable}`
              : `${Styles.toLeftBTN}`
          }
        >
          <ChevronLeft aria-hidden="true" className={Styles.toLeftIcon} />
        </button>
        <button
          type="button"
          aria-label="Shift to the right to view the rest of the chart"
          onClick={handleRightScroll}
          disabled={scrollEndStatus}
          className={
            scrollEndStatus
              ? `${Styles.toRightBTN} ${Styles.btnDisable}`
              : `${Styles.toRightBTN}`
          }
        >
          <ChevronRight aria-hidden="true" className={Styles.toRightIcon} />
        </button>
      </div>
    </>
  );
}
