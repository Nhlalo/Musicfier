import { useEffect, useState, useMemo } from "react";
import getMockCountryCharts from "../../../data/mock/spotifyCountry-mock";
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
  };

  const [localChart, setLocalChart] = useState([]);

  useEffect(() => {
    if (userCountry) {
      const mockLocalChart = getMockCountryCharts(userCountry);
      if (mockLocalChart) {
        setLocalChart(mockLocalChart);
      }
    }
  }, [userCountry]);

  return (
    <ChartHeading
      mainBG={content.mainBG}
      displayFeaturedArtistsImg={content.displayFeaturedArtistsImg}
      heading={content.heading}
      headingDescr={content.headingDescr}
      miniHeading={content.miniHeading}
      displayChart={content.displayChart}
      subHeading={content.subHeading}
      chartContainer={<ChartContainer data={localChart} />}
      featuredArtists={<FeaturedArtists data={localChart} />}
      userCountry={userCountry}
      seeAllGlobal={false}
      data={localChart}
    />
  );
}
