import ChartContainer from "../../../components/shared/chartContainer/chartContainer";
import ChartHeading from "../../../components/shared/chartHeading/chartHeading";
import FeaturedArtists from "../../../components/shared/featuredArtists/featuredArtists";

const content = {
  mainBG: "#fff",
  displayFeaturedArtistsImg: false,
  heading: "GLOBAL TOP 200",
  headingDescr: "Top songs being discovered around the world right now",
  miniHeading:
    "See who made it on the list of the top songs worldwide on Shazam",
  displayChart: true,
  subHeading: "Global Top 200 Chart",
  chartContainer: <ChartContainer />,
  featuredArtists: <FeaturedArtists />,
};
export default function GlobalCharts() {
  return (
    <ChartHeading
      mainBG={content.mainBG}
      displayFeaturedArtistsImg={content.displayFeaturedArtistsImg}
      heading={content.heading}
      headingDescr={content.headingDescr}
      miniHeading={content.miniHeading}
      displayChart={content.displayChart}
      subHeading={content.subHeading}
      chartContainer={content.chartContainer}
      featuredArtists={content.featuredArtists}
    />
  );
}
