import { useState, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useScrollLogic from "../../../hooks/scrollLogic";
import { mockCharts } from "../../../data/mock/spotify-mock";
import Song from "./song";
import Styles from "./chartContainer.module.css";
export default function ChartContainer() {
  const [scrollStartStatus, setScrollStartStatus] = useState(true);
  const [scrollEndStatus, setScrollEndStatus] = useState(false);

  const chartContainerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const leftEdgeSongRef = useRef(0);
  const isResizingRef = useRef(false);
  const originalScrollBehaviorRef = useRef("smooth"); // Store original behavior

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
      <div className={Styles.chartContainer}>
        <div className={Styles.overlay}></div>
        <div className={Styles.chartWrapper} ref={chartContainerRef}>
          {mockCharts.map((songData, index) => {
            <Song
              songLink={songData.spotifyLink}
              songName={songData.songName}
              index={index}
              image={songData.songCover}
              actName={songData.artistName}
              artistID={songData.spotifyArtistId}
            />;
          })}
        </div>
      </div>
      <div className={Styles.chartNavigatorBTNContainer}>
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
