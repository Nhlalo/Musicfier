import { useRef, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { X } from "lucide-react";
import { LocationContext } from "../RootLayout.jsx";
import determinePageNavigation from "../../../utils/page-navigation-utils.js";
import { getTodayDate, getTomorrowDate } from "../../../utils/date-utils.js";
import useFocusTrap from "../../../hooks/useFocusTrap.jsx";
import NavLinksContentRef from "../../../utils/nav-utils.js";
import Container from "../../ui/container/Container.jsx";
import Logo from "../../../assets/images/logo.png";
import Styles from "./Sidebar.module.css";

export default function Sidebar({
  UpdateSidebarVisibility,
  sideBarStatus,
  lastFocusedElement,
}) {
  const navigate = useNavigate();

  const sidebarRef = useRef(null);
  const logoLinkRef = useRef(null);
  const closeSideBarBTNRef = useRef(null);
  const concertsLinkRef = useRef(null);
  const chartsLinkRef = useRef(null);
  const myMusicLinkRef = useRef(null);
  const contactsLinkRef = useRef(null);

  const url = useLocation();
  const location = useContext(LocationContext);

  const startDate = `${getTodayDate()}T00:00:00Z`;
  const endDate = `${getTomorrowDate()}T23:59:59Z`;

  const userCountry = location?.country;
  const countryCode = location?.country_code;
  const userCity = location?.city;

  const refs = [
    logoLinkRef,
    closeSideBarBTNRef,
    concertsLinkRef,
    chartsLinkRef,
    myMusicLinkRef,
    contactsLinkRef,
  ].map((ref) => ref?.current);

  const navLinksContent = NavLinksContentRef(
    concertsLinkRef,
    chartsLinkRef,
    myMusicLinkRef,
    contactsLinkRef,
  );

  //Close the sidebar when navigating to a new page
  useEffect(() => {
    if (sideBarStatus) {
      UpdateSidebarVisibility(false);
    }
  }, [url]);

  //Trap focus within the sidebar
  useFocusTrap(logoLinkRef.current, closeSideBar, refs, sideBarStatus);

  //Close the side bar
  function closeSideBar() {
    const elementToRestore = lastFocusedElement.current;
    UpdateSidebarVisibility(false);

    //Ensures that the element is refocused after the state update
    requestAnimationFrame(() => {
      elementToRestore.focus();
    });
  }
  function handleHomePage() {
    navigate("/");
  }
  return (
    <dialog
      className={
        sideBarStatus
          ? `${Styles.sideBar} ${Styles.openSidebar}`
          : Styles.sideBar
      }
      ref={sidebarRef}
    >
      <Container>
        <div className={Styles.contentWrapper}>
          <div className={Styles.headerContainer}>
            <button
              className={Styles.logoContainer}
              ref={logoLinkRef}
              aria-label="Home page"
              onClick={handleHomePage}
            >
              <div className={Styles.logoWrapper} aria-hidden="true">
                <img src={Logo} alt="Musicfier" className={Styles.logo} />
              </div>
              <figcaption className={Styles.websiteName} aria-hidden="true">
                MUSICFIER
              </figcaption>
            </button>
            <button
              aria-label="Close the side bar"
              onClick={closeSideBar}
              ref={closeSideBarBTNRef}
            >
              <X className={Styles.closeIcon} aria-hidden="true" />
            </button>
          </div>
          <nav className={Styles.navContainer}>
            <ul className={Styles.listContainer}>
              {navLinksContent.map((navLinkContent) => (
                <li className={Styles.navListItem} key={navLinkContent.key}>
                  <Link
                    to={determinePageNavigation(
                      navLinkContent.content,
                      countryCode,
                      startDate,
                      endDate,
                      userCity,
                      userCountry,
                    )}
                    className={Styles.navlink}
                    ref={navLinkContent.ref}
                  >
                    {navLinkContent.content}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </dialog>
  );
}
