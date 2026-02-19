import { useEffect, useState } from "react";
import { mockCharts } from "../../../data/mock/spotify-mock";
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
};
export default function GlobalCharts() {
  const [globalChart, setGlobalChart] = useState([]);

  useEffect(() => {
    const mockGlobalChart = mockCharts;
    if (mockGlobalChart) {
      setGlobalChart(mockGlobalChart);
    }
  }, []);

  return (
    <ChartHeading
      mainBG={content.mainBG}
      displayFeaturedArtistsImg={content.displayFeaturedArtistsImg}
      heading={content.heading}
      headingDescr={content.headingDescr}
      miniHeading={content.miniHeading}
      displayChart={content.displayChart}
      subHeading={content.subHeading}
      chartContainer={<ChartContainer data={globalChart} />}
      featuredArtists={<FeaturedArtists data={globalChart} />}
      seeAllGlobal={true}
      data={[]}
    />
  );
}
