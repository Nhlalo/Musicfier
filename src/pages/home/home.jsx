import { useContext } from "react";
import About from "./about/About";
import GlobalCharts from "./charts/GlobalChart";
import LocalCharts from "./charts/LocalChart";
import MoreCharts from "./charts/MoreCharts";
import { LocationContext } from "../../components/layout/RootLayout";

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
