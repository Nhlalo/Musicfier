import { Link } from "react-router";
import Styles from "./charts.module.css";
import { mockCharts } from "../../../data/mock/spotify-mock";

function MoreChart({ location = "South Africa" }) {
  return (
    <Link
      to={"/charts"}
      className={Styles.chartLink}
      aria-label={`View the Top 50 ${location} chart`}
    >
      <div className={Styles.featuredSongCoverContainer} aria-hidden="true">
        {mockCharts.slice(0, 3).map((songData) => (
          <div className={Styles.featuredSongCoverWrapper}>
            <img
              src={songData.artistImage}
              alt="featured song cover"
              className={Styles.featuredSongCover}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className={Styles.chartDescrContainer} aria-hidden="true">
        <div className={Styles.chartDescrWrapper}>
          <span className={Styles.chartDescrHeading}>Top 50</span>
          <br />
          <span className={Styles.chartDescrHeading}>{location}</span>
          <p className={Styles.featuredArtists}>
            {"Featuring songs from ".concat(
              mockCharts
                .slice(0, 8)
                .map((songData) => songData.artistName)
                .join(", "),
              " and more",
            )}
          </p>
        </div>
        <div className={Styles.viewMoreBTN}>VIEW</div>
      </div>
    </Link>
  );
}

export default function MoreCharts() {
  return (
    <section className={Styles.moreChartsContainer}>
      <div className={Styles.moreChartsWrapper}>
        <h2 className={Styles.moreChartsHeading}>More Charts</h2>
        <div className={Styles.miniChartsContainer}>
          <MoreChart />
          <MoreChart />
        </div>
      </div>
    </section>
  );
}
