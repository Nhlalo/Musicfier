import Styles from "./sidebar.module.css";
import { Music, Share, CalendarDays, UserRound, Trash2 } from "lucide-react";
import SpotifyLogo from "./logoSpotify.png";

export default function Sidebar() {
  return (
    <aside>
      <ul>
        <li>
          <a href="">
            <span>Listen in Spotify</span>{" "}
            <img
              src={SpotifyLogo}
              alt="Spotify logo"
              className={Styles.spotifyLogo}
              aria-hidden="true"
            />
          </a>
        </li>
        <hr aria-hidden="true" />
        <li>
          <a href="">
            <span>Listen in Music</span> <Music aria-hidden="true" />
          </a>
        </li>
        <hr aria-hidden="true" />
        <li>
          <a href="">
            <span>Buy on iTunes</span> <Music aria-hidden="true" />{" "}
          </a>
        </li>
        <hr aria-hidden="true" />
      </ul>
      <div className={Styles.actionGroup}>
        <button type="button" className={Styles.removeBTN}>
          <span>Remove from My Music</span> <Trash2 aria-hidden="true" />
        </button>
        <hr aria-hidden="true" />
        <button type="button">
          <span>Go to Artist</span> <UserRound aria-hidden="true" />
        </button>
        <hr aria-hidden="true" />
        <button type="button">
          <span>Find Concerts</span> <CalendarDays aria-hidden="true" />
        </button>
        <hr aria-hidden="true" />
        <button type="button">
          <span>Share</span> <Share aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
