import { useState, useEffect, useRef } from "react";
import { useMatches } from "react-router";
import { Menu } from "lucide-react";
import { navLinksContent } from "../../../data/constants/navigation.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Styles from "./header.jsx";
import Logo from "../../../assets/images/logo.png";

export default function Header({}) {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <a className={Styles.logoContainer}>
            <div
              className={Styles.logoWrapper}
              style={{ backgroundColor: logoBG }}
              aria-hidden="true"
            >
              <img src={Logo} alt="Musicfier" className={Styles.logo} />
            </div>
            <figcaption className={Styles.websiteName} aria-hidden="true">
              MUSICFIER
            </figcaption>
          </a>
          <nav className={Styles.navContainer}>
            <ul className={Styles.listContainer}>
              {navLinksContent.map((element) => (
                <li className={Styles.navListItem} key={element.key}>
                  <a
                    href=""
                    className={Styles.navlink}
                    style={{ color: navLinkColor }}
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
              style={{ color: dropdownBTNColor }}
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
