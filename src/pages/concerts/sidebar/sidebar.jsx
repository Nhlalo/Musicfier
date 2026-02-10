import { forwardRef, useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import useTrackWindow from "../../../hooks/useTrackWindow";
import { openDialog, closeDialog, displayModal } from "../../../utils/modal";
import getFocusableElements from "../../../utils/focusableElements";
import ConcertDuration from "./concertDuration/concertDuration";
import ConcertLocations from "./concertLocation/concertLocation";
import Styles from "./sidebar.module.css";

const Sidebar = forwardRef(function (props, ref) {
  // Destructure from props
  const { sideBarClassName } = props;

  const windowSize = useTrackWindow();

  const greaterthan1024 = windowSize.width >= 1024; //Equal or greater than 768px viewport width return true

  return (
    <>
      <div className={Styles.backdrop}> </div>
      <dialog
        className={
          greaterthan1024
            ? `${Styles.filterConcerts} ${Styles.sidebarContainer}`
            : `${Styles.filterConcerts} ${Styles.sidebarContainer} `
        }
        ref={ref}
      >
        <ConcertDuration />
        <ConcertLocations />
      </dialog>
    </>
  );
});

export default function SidebarVisibility() {
  const [visibleButton, setVisibleButton] = useState("show");
  const sidebarContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const showBTNRef = useRef(null);
  const previousFocusedElement = useRef(null);

  const windowSize = useTrackWindow();

  const lessthan768 = windowSize?.width <= 768; //Equal or less than 768px viewport width return true

  //This will ensure that the focusable elements are collected after the show button is disabled and the hide button is visible
  useEffect(() => {
    const sideBarContainerValue = sidebarContainerRef.current;
    if (visibleButton == "hide") {
      displayModal(
        sideBarContainerValue,
        getFocusableElements(sideBarContainerValue),
      );
    }
  }, [visibleButton]);

  const handleCloseModal = function () {
    const sideBarContainerValue = sidebarContainerRef.current;
    const sideBarvalue = sidebarRef.current;
    closeDialog(
      sideBarvalue,
      getFocusableElements(sideBarContainerValue),
      previousFocusedElement.current,
    );
    setVisibleButton("show");
  };

  const handleOpenModal = function () {
    previousFocusedElement.current = document.activeElement;
    const sideBarvalue = sidebarRef.current;

    openDialog(sideBarvalue);
    setVisibleButton("hide");
  };

  return (
    <div ref={sidebarContainerRef}>
      <div
        className={lessthan768 ? Styles.noVisibility : Styles.filterConcerts}
      >
        <div className={Styles.headingContainer}>
          <h2 className={Styles.heading}>Filter Concerts</h2>
          <button
            type="button"
            className={
              visibleButton == "show" ? Styles.showBTN : Styles.noVisibility
            }
            aria-label="Open the side bar"
            onClick={handleOpenModal}
            disabled={visibleButton == "hide" ? true : false}
          >
            show
          </button>
          <button
            type="button"
            className={
              visibleButton == "hide" ? Styles.hideBTN : Styles.noVisibility
            }
            aria-label="Close the side bar"
            onClick={handleCloseModal}
            ref={showBTNRef}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sidebar ref={sidebarRef} />
    </div>
  );
}

export { Sidebar };
