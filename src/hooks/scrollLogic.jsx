import { useCallback, useEffect, useRef } from "react";
import {
  getScrollAmount,
  scrollGrid,
  handleResize,
  updateLeftEdgeSong,
  scrollToSongAtLeftEdge,
} from "../utils/scrollGrid";
import debounce from "../utils/debounce";

export default function useScrollLogic(
  chartContainerRef,
  resizeTimeoutRef,
  leftEdgeSongRef,
  isResizingRef,
  originalScrollBehaviorRef,
  scrollGridCallbackRef,
  setScrollStartStatus,
  setScrollEndStatus,
) {
  // Debounced button state updater – prevents race conditions during layout thrashing
  // (e.g., images loading, fonts rendering, scrollbar appearance)
  const updateButtonsCallback = useCallback(
    debounce(() => {
      if (!chartContainerRef.current) return;

      const maxScroll = Math.max(
        0,
        chartContainerRef.current.scrollWidth -
          chartContainerRef.current.clientWidth,
      );
      const currentScroll = chartContainerRef.current.scrollLeft;

      setScrollStartStatus(currentScroll <= 1);
      setScrollEndStatus(currentScroll >= maxScroll - 1);
    }, 100), // Waits 100ms of no calls before executing
    [chartContainerRef, setScrollStartStatus, setScrollEndStatus],
  );

  // Reads which song (index) is currently at the left edge of the visible area
  const updateLeftEdgeSongCallback = useCallback(() => {
    if (!chartContainerRef.current) return;
    leftEdgeSongRef.current = updateLeftEdgeSong(chartContainerRef.current);
  }, [chartContainerRef, leftEdgeSongRef]);

  // Programmatically scrolls so that a given song becomes the leftmost visible item
  const scrollToSongCallback = useCallback(
    (songIndex) => {
      if (!chartContainerRef.current) return;
      scrollToSongAtLeftEdge(chartContainerRef.current, songIndex);
      leftEdgeSongRef.current = songIndex; // keep ref in sync
    },
    [chartContainerRef, leftEdgeSongRef],
  );

  // Expose scroll method to the consuming component via a mutable ref
  scrollGridCallbackRef.current = useCallback(
    (direction) => {
      if (!chartContainerRef.current || isResizingRef.current) return;

      const grid = chartContainerRef.current;
      // Re-enable smooth scrolling if it was disabled during a resize
      if (grid.style.scrollBehavior === "auto") {
        grid.style.scrollBehavior =
          originalScrollBehaviorRef.current || "smooth";
      }

      updateLeftEdgeSongCallback(); // capture starting left edge
      scrollGrid(
        chartContainerRef.current,
        direction,
        updateButtonsCallback, // called after scroll finishes
        getScrollAmount(),
      );
      updateLeftEdgeSongCallback(); // capture new left edge after scroll
    },
    [updateButtonsCallback, updateLeftEdgeSongCallback],
  );

  // Handle window resize: temporarily disable smooth scroll, preserve visible song,
  // then re-enable after layout stabilises.
  const handleResizeCallback = useCallback(() => {
    if (!chartContainerRef.current || isResizingRef.current) return;

    isResizingRef.current = true;
    const grid = chartContainerRef.current;

    // Remember original scroll behaviour (e.g., "smooth", "auto") before we override it
    originalScrollBehaviorRef.current = grid.style.scrollBehavior || "smooth";

    updateLeftEdgeSongCallback();
    const songToKeepVisible = leftEdgeSongRef.current;

    // Disable smooth scrolling and CSS transitions during resize to avoid glitches
    grid.style.scrollBehavior = "auto";
    document.body.classList.add("no-transitions");

    clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      handleResize(
        chartContainerRef.current,
        songToKeepVisible,
        scrollToSongCallback,
        updateButtonsCallback,
        isResizingRef,
      );

      // Restore original smooth scrolling after a short delay, ensuring any
      // final layout adjustments have finished.
      setTimeout(() => {
        grid.style.scrollBehavior = originalScrollBehaviorRef.current;
        document.body.classList.remove("no-transitions");
      }, 100);
    }, 200);
  }, [updateLeftEdgeSongCallback, scrollToSongCallback, updateButtonsCallback]);

  // Set up initial scroll behaviour, event listeners, and clean up on unmount
  useEffect(() => {
    const grid = chartContainerRef.current;
    if (grid) {
      originalScrollBehaviorRef.current = grid.style.scrollBehavior || "smooth";
      grid.style.scrollBehavior = "smooth";
    }

    updateLeftEdgeSongCallback();
    updateButtonsCallback(); // initial button state

    window.addEventListener("resize", handleResizeCallback);

    const handleScroll = () => {
      if (!isResizingRef.current) {
        updateLeftEdgeSongCallback(); // track left edge as user scrolls
        updateButtonsCallback(); // update button enable/disable state
      }
    };

    if (grid) {
      grid.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleResizeCallback);
      clearTimeout(resizeTimeoutRef.current);
      if (grid) {
        grid.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleResizeCallback, updateLeftEdgeSongCallback, updateButtonsCallback]);
}
