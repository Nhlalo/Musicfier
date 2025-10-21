import { CalendarDays } from "lucide-react";
import Styles from "./allConcerts.module.css";
import SpotifyLogo from "../topsongs/spotifylogo.png";

export default function Concert() {
  return (
    <a
      href=""
      aria-label="Buy ticket for PARTYNEXTDOOR event at First Horizon Colliseum"
    >
      <img src={SpotifyLogo} alt="Artist" />
      <div className={Styles.concertInfor}>
        <time datetime="2025-10-11" className={Styles.datetime}>
          <CalendarDays aria-hidden="true" className={Styles.calendarDays} />
          Sat, 11 Oct 2025
        </time>
        <h2 className={Styles.artistName}>PARTYNEXTDOOR</h2>
        <span
          aria-label="Venue: First Horizon Colliseum"
          className={Styles.venue}
        >
          First Horizon Colliseum
        </span>
        <span aria-label="City: Greensrg" className={Styles.city}>
          Greensburg
        </span>
      </div>
    </a>
  );
}
