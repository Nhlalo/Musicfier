// Get dynamic scroll amount based on viewport
export function getScrollAmount() {
  const viewport = window.innerWidth;
  if (viewport <= 768) return viewport * 0.82;
  if (viewport >= 1024) return viewport * 0.77;
  return viewport * 0.84;
}

// Update button states
export function updateButtons(
  gridContainer,
  setScrollStartStatus,
  setScrollEndStatus,
) {
  if (!gridContainer) return;

  const currentScroll = gridContainer.scrollLeft;
  const maxScroll = Math.max(
    0,
    gridContainer.scrollWidth - gridContainer.clientWidth,
  );

  if (setScrollStartStatus) setScrollStartStatus(currentScroll <= 1);
  if (setScrollEndStatus) setScrollEndStatus(currentScroll >= maxScroll - 1);
}

// Find which song is at the left edge
export function updateLeftEdgeSong(gridContainer) {
  if (!gridContainer) return 0;

  const songs = gridContainer.querySelectorAll("[data-song-index]");
  if (songs.length === 0) return 0;

  const gridRect = gridContainer.getBoundingClientRect();
  let closestSong = 0;
  let smallestDistance = Infinity;

  songs.forEach((song) => {
    const songRect = song.getBoundingClientRect();
    const distance = Math.abs(songRect.left - gridRect.left);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestSong = parseInt(song.dataset.songIndex);
    }
  });

  return closestSong;
}

// Scroll to make a specific song visible at left edge
export function scrollToSongAtLeftEdge(gridContainer, songIndex) {
  if (!gridContainer) return;

  const songs = gridContainer.querySelectorAll("[data-song-index]");
  const targetSong = Array.from(songs).find(
    (song) => parseInt(song.dataset.songIndex) === songIndex,
  );

  if (!targetSong) return;

  const songRect = targetSong.getBoundingClientRect();
  const gridRect = gridContainer.getBoundingClientRect();

  const scrollAdjustment = songRect.left - gridRect.left;
  gridContainer.scrollLeft += scrollAdjustment;
}

// Main scroll function with smoothness fix
export function scrollGrid(
  gridContainer,
  direction,
  updateButtonsCallback,
  scrollAmount,
) {
  if (!gridContainer) return;

  // Ensure smooth scrolling is enabled
  if (gridContainer.style.scrollBehavior === "auto") {
    gridContainer.style.scrollBehavior = "smooth";
  }

  let targetScroll;
  if (direction === "right") {
    targetScroll = gridContainer.scrollLeft + scrollAmount;
  } else {
    targetScroll = gridContainer.scrollLeft - scrollAmount;
  }

  const maxScroll = Math.max(
    0,
    gridContainer.scrollWidth - gridContainer.clientWidth,
  );
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

  gridContainer.scrollLeft = targetScroll;

  if (updateButtonsCallback) updateButtonsCallback();
}

// Perfect resize handler with smoothness restoration
export function handleResize(
  gridContainer,
  songToKeepVisible,
  scrollToSongCallback,
  updateButtonsCallback,
  isResizingRef,
) {
  if (!gridContainer) return;

  // Scroll WITHOUT animation during resize
  const originalBehavior = gridContainer.style.scrollBehavior;
  gridContainer.style.scrollBehavior = "auto";

  if (scrollToSongCallback) {
    scrollToSongCallback(songToKeepVisible);
  }

  // IMPORTANT: Restore original behavior
  setTimeout(() => {
    gridContainer.style.scrollBehavior = originalBehavior || "smooth";
  }, 10);

  if (updateButtonsCallback) updateButtonsCallback();

  if (isResizingRef) {
    isResizingRef.current = false;
  }
}
