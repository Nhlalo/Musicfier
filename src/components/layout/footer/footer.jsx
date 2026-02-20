import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import handleScrollToTop from "../../../utils/scrollToTop";
import Styles from "./footer.module.css";
import logo from "../../../assets/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={Styles.footerContainer}>
      <div className={Styles.footerWrapper}>
        <div className={Styles.subContainer}>
          <div className={Styles.logoContainer}>
            <button
              className={Styles.homeLink}
              aria-label="Scroll to the top"
              onClick={handleScrollToTop}
            >
              <div className={Styles.logoWrapper} aria-hidden="true">
                <img src={logo} alt="Musicfier" className={Styles.logo} />
              </div>
              <span className={Styles.websiteName} aria-hidden="true">
                Musicfier
              </span>
            </button>
            <p className={Styles.motivation}>
              Musicfier is a powerful audio recognition platform that identifies
              any song playing around you in seconds. Using advanced acoustic
              technology, we help curious listeners discover new music, access
              artist details, and build a personal history of their finds.
              Whether you are in a crowd or relaxing at home, Musicfier ensures
              you never have to wonder, 'What song is this?' again.
            </p>
          </div>
          <div className={Styles.websiteInfor}>
            <div className={Styles.companyInfor}>
              <h3 className={Styles.company}>Company</h3>
              <ul className={Styles.ul}>
                <li className={Styles.li}>
                  <a href="#">About Us</a>
                </li>
                <li className={Styles.li}>
                  <a href="#">Apps</a>
                </li>
              </ul>
            </div>
            <div className={Styles.legalInfor}>
              <h3 className={Styles.legal}>Legal</h3>
              <ul className={Styles.ul}>
                <li className={Styles.li}>
                  <a href="#">Terms</a>
                </li>
                <li className={Styles.li}>
                  <a href="#">Privacy Policy</a>
                </li>
                <li className={Styles.li}>
                  <a href="#">Manage Your Data</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={Styles.socialMediaContainer}>
          <p className={Styles.followUs}>Follow Us</p>
          <ul className={Styles.socialMediaApps}>
            <li title="Facebook">
              <a href="">
                {" "}
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className={Styles.socialMediaIcon}
                />
              </a>
            </li>
            <li title="X">
              <a href="">
                {" "}
                <FontAwesomeIcon
                  icon={faTwitter}
                  className={Styles.socialMediaIcon}
                />
              </a>
            </li>
            <li title="Instagram">
              <a href="">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={Styles.socialMediaIcon}
                />
              </a>
            </li>
            <li title="SnapChat">
              <a href="">
                <FontAwesomeIcon
                  icon={faSnapchat}
                  className={Styles.socialMediaIcon}
                />
              </a>
            </li>
          </ul>
          <p className={Styles.copyRightsWarning}>
            {" "}
            &copy; {currentYear} Musicfier. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
