import { useState } from "react";
import { Link } from "react-router";
import { Music2, Share, File } from "lucide-react";
import Logo from "../../assets/logo.png";
import SearchImage from "../../assets/searchimage.png";
import Styles from "./style.module.css";

const navIDS = { myMusic: crypto.randomUUID() };
const appInforIDS = {
  music: crypto.randomUUID(),
  songHistory: crypto.randomUUID(),
  share: crypto.randomUUID(),
};
const footerIDS = { terms: crypto.randomUUID(), contact: crypto.randomUUID() };

export default function Homepage() {
  return (
    <div className={Styles.homepageContainer}>
      <header className={Styles.header}>
        <div className={Styles.logoContainer}>
          <img src={Logo} alt="Musicfier" className={Styles.logo} />
          <h1 className={Styles.h1}>Musicfier</h1>
        </div>
        <nav>
          <ul>
            <li key={navIDS.myMusic}>
              <a>My Music</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={Styles.main}>
        <section className={Styles.searchContainer}>
          <h2 className={Styles.h2}>Tap To Musicfy</h2>
          <button type="button" className={Styles.searchBTN}>
            <img src={SearchImage} alt="search" className={Styles.searchImg} />
          </button>
        </section>
        <section>
          <ul className={Styles.appInforDescr}>
            <li key={appInforIDS.music}>
              <Music2 />
              <p>Real-time music recognition</p>
            </li>
            <li key={appInforIDS.songHistory}>
              <File />
              <p>Song history</p>
            </li>
            <li key={appInforIDS.share}>
              <Share />
              <p>Share across platforms</p>
            </li>
          </ul>
        </section>
      </main>
      <footer className={Styles.footer}>
        <ul className={Styles.footerList}>
          <li key={footerIDS.terms}>Terms</li>
          <li key={footerIDS.contact}>Contact</li>
        </ul>
      </footer>
    </div>
  );
}
