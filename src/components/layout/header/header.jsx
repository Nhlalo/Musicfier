import { useState, useEffect, useRef } from "react";
import { useMatches } from "react-router";
import { Menu } from "lucide-react";
import { navLinksContent } from "../../../data/constants/navigation.jsx";
import handleScrollToTop from "../../../utils/scrollToTop.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Styles from "./header.module.css";
import Logo from "../../../assets/images/logo.png";

export default function Header({}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const lastFocusedElement = useRef(null);

  const matches = useMatches();

  // Get current route's color scheme from handle
  const routeHandle = matches[matches.length - 1]?.handle || {};
  const colorScheme = routeHandle.colors;

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
                  <a
                    href=""
                    className={Styles.navlink}
                    style={{ color: currentColors.color }}
                  >
                    {element.content}
                  </a>
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
