import { Link, useLocation } from "react-router";
import { Play } from "lucide-react";
import ImageReplacement from "../../ui/imageReplacement";
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
  const location = useLocation();

  const hasArtistInUrl = location.pathname.includes("artist");
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
          {!hasArtistInUrl && (
            <span
              aria-label="Chart Position: "
              className={Styles.chartPosition}
            >
              {index + 1}
            </span>
          )}
          <button
            type="button"
            aria-label="play song"
            className={Styles.playSongBTN}
          >
            {/* When there is no image use just display an icon */}
            {image && (
              <img
                src={image}
                alt={actName}
                aria-hidden="true"
                className={Styles.artistImg}
                loading="lazy"
              />
            )}
            {!image && <ImageReplacement iconClass={Styles.artistImg} />}
            <div className={Styles.playIconContainer}>
              <Play aria-hidden="true" className={Styles.songPlayIcon} />
            </div>
          </button>
        </div>
        <div className={Styles.songInforWrapper}>
          <span className={Styles.songName}>{songName}</span>
          {!hasArtistInUrl && (
            <Link
              to={`/artist/${actName}/${artistID}`}
              aria-label={`View ${actName}'s profile`}
              className={Styles.artistNameLink}
            >
              {actName}
            </Link>
          )}
          {hasArtistInUrl && (
            <span
              to={`/artist/${actName}/${artistID}`}
              aria-label={`View ${actName}'s profile`}
              className={Styles.artistName}
            >
              {actName}
            </span>
          )}
        </div>
      </div>
      <hr aria-hidden="true" className={Styles.hr} />
    </a>
  );
}
