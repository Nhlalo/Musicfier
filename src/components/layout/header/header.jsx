import { useState, useEffect, useRef, useContext } from "react";
import { useMatches, useLoaderData, Link } from "react-router";
import { Menu } from "lucide-react";
import { LocationContext } from "../rootLayout.jsx";
import { navLinksContent } from "../../../data/constants/navigation.jsx";
import handleScrollToTop from "../../../utils/scrollToTop.jsx";
import { getTodayDate, getTomorrowDate } from "../../../utils/dates.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Styles from "./header.module.css";
import Logo from "../../../assets/images/logo.png";

export default function Header({}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useContext(LocationContext);

  const lastFocusedElement = useRef(null);

  const matches = useMatches();

  const startDate = `${getTodayDate()}T00:00:00Z`;
  const endDate = `${getTomorrowDate()}T23:59:59Z`;

  const userCountry = location?.country;
  const countryCode = location?.country_code;
  const userCity = location?.city;
  // Find the current route that has loader data
  const currentMatch = matches.find((match) => match.loaderData);
  const chartColors = currentMatch?.loaderData?.colors;

  // Get current route's color scheme from handle
  const routeHandle = matches[matches.length - 1]?.handle;
  const colorScheme = routeHandle ? routeHandle.colors : chartColors;

  const currentColors = isScrolled
    ? colorScheme?.scrolled
    : colorScheme?.default;

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.pageYOffset > 0;
      setIsScrolled(hasScrolled);
    };

    // Use passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); //

  function determinePageNavigation(linkName) {
    if (linkName == "Concerts") {
      return `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}&c=${userCity}`;
    }
    if (linkName == "Charts") {
      return `/charts/top50/${userCountry}`;
    }
  }
  //This will display the side bar
  function handleOpeningSidebar() {
    //Store the last focused element before opening the sidebar
    lastFocusedElement.current = document.activeElement;
    setShowSidebar(true);
  }

  //This will be passed down to the sidebar(child component)
  function handleSidebarDisplay(value) {
    setShowSidebar(value);
  }

  return (
    <>
      <header
        className={Styles.header}
        style={{
          backgroundColor: currentColors.bg,
          color: currentColors.color,
        }}
      >
        <div className={Styles.navContentWrapper}>
          <button
            className={Styles.logoContainer}
            onClick={handleScrollToTop}
            aria-label="Scroll to the top"
          >
            <div
              className={Styles.logoWrapper}
              style={{ backgroundColor: currentColors.logoBG }}
              aria-hidden="true"
            >
              <img src={Logo} alt="Musicfier" className={Styles.logo} />
            </div>
            <figcaption
              className={Styles.websiteName}
              aria-hidden="true"
              style={{
                color: currentColors.color,
              }}
            >
              MUSICFIER
            </figcaption>
          </button>
          <nav className={Styles.navContainer}>
            <ul className={Styles.listContainer}>
              {navLinksContent.map((element) => (
                <li className={Styles.navListItem} key={element.key}>
                  <Link
                    to={determinePageNavigation(element.content)}
                    className={Styles.navlink}
                    style={{ color: currentColors.color }}
                  >
                    {element.content}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-label="Open drop down menu"
            className={Styles.dropdownBTN}
            onClick={handleOpeningSidebar}
          >
            <Menu
              className={Styles.dropdownMenu}
              aria-hidden="true"
              style={{ color: currentColors.btnBG }}
            />
          </button>
        </div>
      </header>
      <Sidebar
        UpdateSidebarVisibility={handleSidebarDisplay}
        sideBarStatus={showSidebar}
        lastFocusedElement={lastFocusedElement}
      />
    </>
  );
}
