import { useState } from "react";
import { AudioLines, X, Ellipsis } from "lucide-react";
import Styles from "./audioRecognition.module.css";
import searchImage from "../../../assets/logo.png";

export default function audioRecognition() {
  return (
    <>
      <main className={Styles.main}>
        <div className={Styles.cancelIconContainer}>
          <a
            href="google.com"
            data-testid="homepage-link"
            aria-label="Home page"
          >
            {" "}
            <X className={Styles.cancelIcon} aria-hidden="true" />
          </a>
        </div>
        <section className={Styles.searchSection}>
          <div className={Styles.outerCircle} aria-hidden="true">
            {" "}
          </div>
          <div className={Styles.middleCircle} aria-hidden="true">
            {" "}
          </div>
          <div className={Styles.innerCircle} aria-hidden="true">
            {" "}
          </div>

          <button
            className={Styles.searchBTN}
            aria-label="Searching for the song"
          >
            <img
              src={searchImage}
              alt="searching"
              className={Styles.searchImg}
              aria-hidden="true"
            />
          </button>

          <div className={`${Styles.loadingMessage} ${Styles.listening}`}>
            <AudioLines className={Styles.icon} aria-hidden="true" />
            <p className={Styles.loadingMessageHeader}>Listening for music</p>
            <p className={Styles.loadingMessageDescr}>
              Make sure your device can hear the song clearly
            </p>
          </div>
          <div className={`${Styles.loadingMessage} ${Styles.wait}`}>
            <Ellipsis className={Styles.icon} aria-hidden="true" />
            <p className={Styles.loadingMessageHeader}>Searching</p>
            <p className={Styles.loadingMessageDescr}>Please wait</p>
          </div>
          <div className={`${Styles.loadingMessage} ${Styles.lastTry}`}>
            <Ellipsis className={Styles.icon} aria-hidden="true" />
            <p className={Styles.loadingMessageHeader}>This is tough</p>
            <p className={Styles.loadingMessageDescr}>Last try</p>
          </div>
        </section>
      </main>
    </>
  );
}
