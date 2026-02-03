import About from "./about/about";
import GlobalCharts from "./charts/globalChart";
import LocalCharts from "./charts/localChart";
import MoreCharts from "./charts/moreCharts";
import {
  mockUserLocation,
  mockUserLocation,
} from "../../data/mock/user-location-mock";

export default function Home() {
  const userLocation = mockUserLocation.country;
  return (
    <>
      <About />
      <GlobalCharts location={userLocation} />
      <LocalCharts location={userLocation} />
      <MoreCharts location={userLocation} />
    </>
  );
}
