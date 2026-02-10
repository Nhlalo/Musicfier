import { useState, useEffect, useRef, forwardRef } from "react";
import { Map, ListCollapse } from "lucide-react";
import debounce from "../../../utils/debounce";
import getFocusableElements from "../../../utils/focusableElements";
import { displayModal } from "../../../utils/modal";
import ConcertsInformation from "./findConcerts";
import SidebarVisibility, { Sidebar } from "../sidebar/sidebar";
import ArtistImg from "../../../assets/images/artistImg.jpg";
import Styles from "./concertDetails.module.css";

//Custom hook that will make the body not be scrollable if the side bar is open
function useBodyScrollLock(isButtonPressed) {
  useEffect(() => {
    if (isButtonPressed) {
      document.body.classList.add("sidebarOpen");
    } else {
      document.body.classList.remove("sidebarOpen");
    }

    return () => {
      document.body.classList.remove("sidebarOpen");
    };
  }, [isButtonPressed]);
}

const FilterSidebarHeader = forwardRef(function (props, ref) {
  const { showSidebar, sideBarVisible } = props;

  function handleCloseModal() {
    showSidebar(false);
  }
  return (
    <div ref={ref}>
      <div className={sideBarVisible ? Styles.filterConcerts : Styles.hidden}>
        <div className={Styles.headingContainer}>
          <h2 className={Styles.heading}>Filter Concerts</h2>
          <button
            type="button"
            className={Styles.hideBTN}
            aria-label="Close the side bar"
            onClick={handleCloseModal}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* This will make the side bar be visible when the filter button is pressed */}
      <Sidebar sideBarClassName="show" ref={ref} />
    </div>
  );
});

export default function Concerts() {
  //This will aid in the tracking of the visibility of the concert filter side bar
  const [filterVisibility, setFilterVisibility] = useState(false);
  /*const [switchContainerVisibility, setSwitchContainerVisibility] =
    useState(false); */
  const [visibility, setVisibility] = useState({
    mapVisibility: false,
    concertVisibility: true,
  });
  const [viewportWidthStatus, setViewportWidthStatus] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const sidebarRef = useRef(null);
  const previousFocusedElement = useRef(null);

  useBodyScrollLock(filterVisibility);

  useEffect(() => {
    if (filterVisibility) {
      const sideBarvalue = sidebarRef.current;
      displayModal(sideBarvalue, getFocusableElements(sideBarvalue));
    }
  }, [filterVisibility]);

  useEffect(() => {
    // Debounced resize handler
    const widthSize = windowSize.width;
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      /* display the filter at a viewport less than 1024px(laptop) and expands the view port than decreases the viewport the viewport should be clear & clean thus making the filter disappear */
    }, 250);
    if (widthSize >= 1024) {
      setFilterVisibility(false);
      // setSwitchContainerVisibility(false);
      setViewportWidthStatus(true);
    }
    if (widthSize < 1024) {
      setViewportWidthStatus(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width]);

  //Change concert layout based on viewport width, if it is greater than 1024 then button viewing is activated
  useEffect(() => {
    if (viewportWidthStatus) {
      setVisibility({
        mapVisibility: true,
        concertVisibility: true,
      });
    } else {
      setVisibility({
        mapVisibility: false,
        concertVisibility: true,
      });
    }
  }, [viewportWidthStatus]);

  // This will pass the setFilterVisibility function to the sideBarFilter, so that it can be able to close the sidebar
  function passDataToChild(showSidebar) {
    setFilterVisibility(showSidebar);
  }

  //Will display the concert filter side bar when the filter button is pressed
  function handleShowFilter(value) {
    setFilterVisibility(value);

    //Trap Focus
    previousFocusedElement.current = document.activeElement;
  }

  function handleToggle() {
    setVisibility({
      mapVisibility: false,
      concertVisibility: true,
    });
  }
  function handleMap() {
    setVisibility({
      mapVisibility: true,
      concertVisibility: false,
    });
  }

  return (
    <>
      <section className={Styles.allConcertsContainer}>
        <ConcertsInformation
          visibilityConcert={visibility.concertVisibility}
          showFilter={handleShowFilter}
        />

        {/* This will make the side bar be visible when the filter button is pressed */}
        {filterVisibility && (
          <FilterSidebarHeader
            ref={sidebarRef}
            showSidebar={passDataToChild}
            sideBarVisible={filterVisibility}
          />
        )}

        {visibility.mapVisibility && (
          <div className={Styles.mapContainer}>
            {/* This will automatically display the concert filter side bar when the viewport width is greater or equal to 1024px */}
            {windowSize.width >= 1024 && <SidebarVisibility />}
            <img src={ArtistImg} alt="Musicfier" className={Styles.logoImg} />
          </div>
        )}
        {windowSize.width < 1024 && (
          <div className={Styles.switchBTNsContainer}>
            <button
              type="button"
              aria-label="View the list of concerts"
              className={
                visibility.concertVisibility
                  ? `${Styles.switchBTN} ${Styles.blueBG}`
                  : `${Styles.switchBTN}`
              }
              onClick={handleToggle}
            >
              <ListCollapse
                aria-hidden="true"
                className={
                  visibility.concertVisibility
                    ? `${Styles.toggleIcon} ${Styles.colorWhite}`
                    : `${Styles.toggleIcon}`
                }
              />
            </button>
            <button
              type="button"
              aria-label="View the map for the concerts location"
              className={
                visibility.mapVisibility
                  ? `${Styles.switchBTN} ${Styles.blueBG}`
                  : `${Styles.switchBTN}`
              }
              onClick={handleMap}
            >
              <Map
                aria-hidden="true"
                className={
                  visibility.mapVisibility
                    ? `${Styles.mapIcon} ${Styles.colorWhite}`
                    : `${Styles.mapIcon}`
                }
              />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
