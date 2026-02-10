import { useState, useEffect } from "react";
import debounce from "../utils/debounce";

export default function useTrackWindow() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    //  250ms after resizing the window, then you update the window width and size. This prevents constants rerendering due to every resizing.
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 250);

    window.addEventListener("resize", handleResize);

    // Initial size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
