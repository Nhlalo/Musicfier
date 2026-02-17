import ChartContainer from "../../../components/shared/chartContainer/chartContainer";
import ChartHeading from "../../../components/shared/chartHeading/chartHeading";
import FeaturedArtists from "../../../components/shared/featuredArtists/featuredArtists";

export default function LocalCharts({ location }) {
  const userCountry = location?.country;
  const content = {
    mainBG: "#f2f2f7",
    displayFeaturedArtistsImg: true,
    heading: `DISCOVERY ${userCountry?.toUpperCase()}`,
    headingDescr: "Rising tracks from new and upcoming artists",
    miniHeading: "Be the first to listen to these future hit songs",
    displayChart: false,
    subHeading: `Discovery ${userCountry} Tracks`,
    chartContainer: <ChartContainer />,
    featuredArtists: <FeaturedArtists />,
  };

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
      userCountry={userCountry}
      seeAllGlobal={false}
    />
  );
}
