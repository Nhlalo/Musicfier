import { Link } from "react-router";
import { Play } from "lucide-react";
import Styles from "./chartContainer.module.css";

//Generate keys for the list of links
let keys = [];
for (let i = 0; i < 20; i++) {
  keys.push(crypto.randomUUID());
}
export default function Song({
  songLink,
  songName,
  index,
  image,
  actName,
  artistID,
}) {
  return (
    <a
      href={songLink}
      aria-label={`View ${songName} song on spotify`}
      className={Styles.songProfileLink}
      data-song-index={index}
      key={keys[index]}
    >
      <div className={Styles.songProfileWrapper}>
        <div className={Styles.playSongWrapper}>
          <span aria-label="Chart Position: " className={Styles.chartPosition}>
            {index + 1}
          </span>
          <button
            type="button"
            aria-label="play song"
            className={Styles.playSongBTN}
          >
            <img
              src={image}
              alt={actName}
              aria-hidden="true"
              className={Styles.artistImg}
              loading="lazy"
            />
            <div className={Styles.playIconContainer}>
              <Play aria-hidden="true" className={Styles.songPlayIcon} />
            </div>
          </button>
        </div>
        <div className={Styles.songInforWrapper}>
          <span className={Styles.songName}>{songName}</span>
          <Link
            to={`artist/${artistID}`}
            aria-label={`View ${actName}'s profile`}
            className={Styles.artistName}
          >
            {actName}
          </Link>
        </div>
      </div>
      <hr aria-hidden="true" className={Styles.hr} />
    </a>
  );
}
