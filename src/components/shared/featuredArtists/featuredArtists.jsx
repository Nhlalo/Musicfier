import { useState, useRef } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useScrollLogic from "../../../hooks/scrollLogic";
import { mockCharts } from "../../../data/mock/spotify-mock";
import ImageReplacement from "../../ui/imageReplacement";
import Styles from "./featuredArtists.module.css";

function FeaturedArtist({ artistSpotifyID, artistName, artistImg }) {
  return (
    <Link
      to={`artist/${artistSpotifyID}`}
      aria-label={`View ${artistName} profile`}
    >
      <figure className={Styles.artistWrapper} aria-hidden="true">
        {/* Use an icon when there is no artist image source */}
        {artistImg && (
          <img src={artistImg} alt={artistName} className={Styles.artistImg} />
        )}
        {!artistImg && <ImageReplacement iconClass={Styles.artistImg} />}
        <figcaption className={Styles.artistName}>{artistName}</figcaption>
      </figure>
    </Link>
  );
}
export default function FeaturedArtists() {
  const [scrollStartStatus, setScrollStartStatus] = useState(true);
  const [scrollEndStatus, setScrollEndStatus] = useState(false);

  const chartContainerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const leftEdgeSongRef = useRef(0);
  const isResizingRef = useRef(false);
  const originalScrollBehaviorRef = useRef("smooth"); // Store original behavior
  const scrollGridCallbackRef = useRef(null);

  useScrollLogic(
    chartContainerRef,
    resizeTimeoutRef,
    leftEdgeSongRef,
    isResizingRef,
    originalScrollBehaviorRef,
    scrollGridCallbackRef,
    setScrollStartStatus,
    setScrollEndStatus,
  );

  const handleLeftScroll = () => scrollGridCallbackRef.current("left");
  const handleRightScroll = () => scrollGridCallbackRef.current("right");

  return (
    <>
      <div className={Styles.featuredArtistsContainer}>
        <div className={Styles.overlay}></div>
        <div className={Styles.featuredArtistsWrapper} ref={chartContainerRef}>
          {mockCharts.map((songData) => (
            <FeaturedArtist
              artistSpotifyID={songData.spotifyArtistId}
              artistName={songData.artistName}
              artistImg={songData.artistImage}
              key={songData.key}
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
