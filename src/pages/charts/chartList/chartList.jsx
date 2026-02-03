import { useContext } from "react";
import { Play } from "lucide-react";
import { chartContext } from "../../charts";
import mockYouTubeMusicLink from "../../../data/mock/youtube-mock";
import artistImg from "../../../assets/images/";
import spotifyLogo from "../../../assets/images/spotify.png";
import youtubeLogo from "../../../assets/images/youtube.png";
import Styles from "./chartList.module.css";

function Song({ songlink, chartNumber, songName, artist, songCover }) {
  return (
    <li className={Styles.chartSong}>
      <div className={Styles.overlay} aria-hidden="true">
        <img
          src={spotifyLogo}
          alt="Spotify Logo"
          className={Styles.spotifyLogo}
        />
      </div>
      <a
        href={songlink}
        aria-label={`play ${songName} by ${artist} on Spotify`}
        className={Styles.songlink}
      >
        <span aria-hidden="true" className={Styles.chartNumber}>
          {chartNumber}
        </span>
        <div aria-hidden="true" className={Styles.songContainer}>
          <div className={Styles.songCoverContainer}>
            <img
              src={songCover}
              alt=""
              className={Styles.songCover}
              loading="lazy"
            />
            <div className={Styles.playIconContainer}>
              <Play className={Styles.playIcon} />
            </div>
          </div>
          <div className={Styles.songInforContainer}>
            <span className={Styles.artistName}>{artist}</span>
            <span className={Styles.songName}>{songName}</span>
          </div>
        </div>
      </a>
      <hr aria-hidden="true" />
    </li>
  );
}

function ChartContainer() {
  const { chart } = useContext(chartContext);

  return (
    <ul className={Styles.chartSongContainer}>
      {chart.length &&
        chart.map((song) => {
          return (
            <Song
              chartNumber={song.position}
              songName={song.songName}
              artist={song.artistName}
              songlink={song.spotifyLink}
              key={song.key}
            />
          );
        })}
    </ul>
  );
}
