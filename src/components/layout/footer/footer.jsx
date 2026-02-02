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
            <a
              className={Styles.homeLink}
              href="google.com"
              aria-label="Return to the header"
            >
              <div className={Styles.logoWrapper} aria-hidden="true">
                <img src={logo} alt="Musicfier" className={Styles.logo} />
              </div>
              <span className={Styles.websiteName} aria-hidden="true">
                Musicfier
              </span>
            </a>
            <p className={Styles.motivation}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              dolorum facilis minima debitis ut veritatis quasi earum neque iste
              excepturi optio cupiditate, necessitatibus, tempora molestias
              consequatur nihil omnis in suscipit?
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
