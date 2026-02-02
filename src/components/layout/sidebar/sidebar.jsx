import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import useFocusTrap from "../../../hooks/useFocusTrap";
import NavLinksContentRef from "../../../data/constants/navigation";
import Styles from "./sidebar.module.css";
import Container from "../../ui/container/container";
import Logo from "../../../assets/images/logo.png";

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
    closeSideBar();
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
                  <a
                    href="google.com"
                    className={Styles.navlink}
                    ref={navLinkContent.ref}
                  >
                    {navLinkContent.content}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </dialog>
  );
}
