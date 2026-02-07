import { useEffect, useContext } from "react";
import { useNavigationType, useNavigate, useLocation } from "react-router";
import useRoutingHistory from "./useRoutingHistory";
import { countryContext } from "../pages/charts/charts";
import setBTNStatus from "../utils/updateBTNStatus";

//This is the logic for pressing the browser's back button within the charts page
export default function usePressBack(changeBTNStatus) {
  const {
    routeHistory,
    setRouteHistory,
    routeCountryHistory,
    setRouteCountryHistory,
  } = useRoutingHistory();

  const { setCountry } = useContext(countryContext);
  //This is needed to track the back button
  const navigationType = useNavigationType();

  const navigate = useNavigate();
  //This tracks the current page /url we are in
  const location = useLocation();

  useEffect(() => {
    const isReload = sessionStorage.getItem("reload");
    //if the back button is pressed and it is not a page refreshal, as refreshal counts as POP, then  remove current url from the route history
    if (navigationType === "POP" && isReload !== "true") {
      const routeHistoryLength = routeHistory.length;
      const routeCountryHistoryLength = routeCountryHistory.length;
      const lastIndex = routeHistoryLength - 1;
      const lastIndexCountry = routeCountryHistoryLength - 1;
      //The last option of the route history is removed
      const newRouteHistory = routeHistory.slice(0, lastIndex);
      //The last option of the route country history is removed
      const newRouteCountryHistory = routeCountryHistory.slice(
        0,
        lastIndexCountry,
      );
      const newRouteCountryHistorylength = newRouteCountryHistory.length;
      const previousCountry =
        newRouteCountryHistory[newRouteCountryHistorylength - 1];

      sessionStorage.setItem(
        "appRouteHistory",
        JSON.stringify(newRouteHistory),
      );
      sessionStorage.setItem(
        "routeCountryHistory",
        JSON.stringify(newRouteCountryHistory),
      );
      setRouteHistory(newRouteHistory);
      setRouteCountryHistory(newRouteCountryHistory);

      if (routeHistoryLength <= 1) {
        navigate(-1);
      } else {
        const newRouteHistorylength = newRouteHistory.length;
        const previousChartType = newRouteHistory[newRouteHistorylength - 1];
        setBTNStatus(previousChartType, changeBTNStatus);
      }
      //Change the country & country url param and collect chart data about that country if the current country url param and previous country url param are not the same
      if (
        routeHistoryLength > 1 &&
        previousCountry != routeCountryHistory[lastIndexCountry]
      ) {
        setCountry(previousCountry);
      }
    }
  }, [location]);
}
