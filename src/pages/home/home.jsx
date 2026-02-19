import { useContext } from "react";
import About from "./about/about";
import GlobalCharts from "./charts/globalChart";
import LocalCharts from "./charts/localChart";
import MoreCharts from "./charts/moreCharts";
import { LocationContext } from "../../components/layout/rootLayout";
export default function Home() {
  const userLocation = useContext(LocationContext);
  return (
    <>
      <About />
      <GlobalCharts />
      <LocalCharts location={userLocation} />
      <MoreCharts location={userLocation} />
    </>
  );
}
