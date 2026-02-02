import { useCallback, useEffect } from "react";
import {
  getScrollAmount,
  scrollGrid,
  handleResize,
  updateLeftEdgeSong,
  scrollToSongAtLeftEdge,
} from "../utils/scrollGrid";

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
  const updateButtonsCallback = useCallback(() => {
    if (!chartContainerRef.current) return;

    const maxScroll = Math.max(
      0,
      chartContainerRef.current.scrollWidth -
        chartContainerRef.current.clientWidth,
    );
    const currentScroll = chartContainerRef.current.scrollLeft;

    setScrollStartStatus(currentScroll <= 1);
    setScrollEndStatus(currentScroll >= maxScroll - 1);
  }, []);

  const updateLeftEdgeSongCallback = useCallback(() => {
    if (!chartContainerRef.current) return;
    leftEdgeSongRef.current = updateLeftEdgeSong(chartContainerRef.current);
  }, []);

  const scrollToSongCallback = useCallback((songIndex) => {
    if (!chartContainerRef.current) return;
    scrollToSongAtLeftEdge(chartContainerRef.current, songIndex);
    leftEdgeSongRef.current = songIndex;
  }, []);

  scrollGridCallbackRef.current = useCallback(
    (direction) => {
      if (!chartContainerRef.current || isResizingRef.current) return;

      // Restore smooth scrolling if it was disabled
      const grid = chartContainerRef.current;
      if (grid.style.scrollBehavior === "auto") {
        grid.style.scrollBehavior =
          originalScrollBehaviorRef.current || "smooth";
      }

      updateLeftEdgeSongCallback();

      scrollGrid(
        chartContainerRef.current,
        direction,
        updateButtonsCallback,
        getScrollAmount(),
      );

      updateLeftEdgeSongCallback();
    },
    [updateButtonsCallback, updateLeftEdgeSongCallback],
  );

  const handleResizeCallback = useCallback(() => {
    if (!chartContainerRef.current || isResizingRef.current) return;

    isResizingRef.current = true;
    const grid = chartContainerRef.current;

    // Store original scroll behavior BEFORE changing it
    originalScrollBehaviorRef.current = grid.style.scrollBehavior || "smooth";

    updateLeftEdgeSongCallback();
    const songToKeepVisible = leftEdgeSongRef.current;

    // Disable smooth scroll temporarily
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

      // RESTORE smooth scrolling after resize is complete
      setTimeout(() => {
        grid.style.scrollBehavior = originalScrollBehaviorRef.current;
        document.body.classList.remove("no-transitions");
      }, 100); // Slightly longer delay to ensure restore
    }, 200);
  }, [updateLeftEdgeSongCallback, scrollToSongCallback, updateButtonsCallback]);

  useEffect(() => {
    // Initialize with smooth scrolling
    const grid = chartContainerRef.current;
    if (grid) {
      originalScrollBehaviorRef.current = grid.style.scrollBehavior || "smooth";
      grid.style.scrollBehavior = "smooth";
    }

    updateLeftEdgeSongCallback();
    updateButtonsCallback();

    window.addEventListener("resize", handleResizeCallback);

    const handleScroll = () => {
      if (!isResizingRef.current) {
        updateLeftEdgeSongCallback();
        updateButtonsCallback();
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
