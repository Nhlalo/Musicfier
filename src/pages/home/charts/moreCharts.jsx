import { Link } from "react-router";
import { mockCharts } from "../../../data/__mocks__/spotify/spotify.mock";
import {
  generateFallBackImage,
  generateSizes,
  generateSrcset,
} from "../../../utils/imagery-utils";
import Styles from "./Charts.module.css";

const imgKeys = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

function MoreChart({ location, localChart }) {
  const userCountry = async () => await location?.country;

  return (
    <Link
      to={`/charts/top50/${userCountry}`}
      className={Styles.chartLink}
      aria-label={`View the Top 50 ${userCountry} chart`}
    >
      <div className={Styles.featuredSongCoverContainer} aria-hidden="true">
        {localChart?.slice(0, 3).map((songData, index) => {
          const artistImage = songData.artistImage;
          return (
            <div
              className={Styles.featuredSongCoverWrapper}
              key={imgKeys[index]}
            >
              <img
                src={generateFallBackImage(artistImage)}
                srcSet={generateSrcset(artistImage)}
                sizes={generateSizes(artistImage)}
                alt="featured song cover"
                className={Styles.featuredSongCover}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <div className={Styles.chartDescrContainer} aria-hidden="true">
        <div className={Styles.chartDescrWrapper}>
          <span className={Styles.chartDescrHeading}>Top 50</span>
          <br />
          <span className={Styles.chartDescrHeading}>{userCountry}</span>
          <p className={Styles.featuredArtists}>
            {"Featuring songs from ".concat(
              localChart
                ?.slice(0, 8)
                .map((songData) => songData.artistName)
                .join(", "),
              " and more",
            )}
          </p>
        </div>
        <div type="button" className={Styles.viewMoreBTN}>
          VIEW
        </div>
      </div>
    </Link>
  );
}

export default function MoreCharts({ location }) {
  const US = { country: "United States", country_code: "US" };
  return (
    <section className={Styles.moreChartsContainer}>
      <div className={Styles.moreChartsWrapper}>
        <h2 className={Styles.moreChartsHeading}>More Charts</h2>
        <div className={Styles.miniChartsContainer}>
          <MoreChart location={location} />
          <MoreChart location={US} />
        </div>
      </div>
    </section>
  );
}
