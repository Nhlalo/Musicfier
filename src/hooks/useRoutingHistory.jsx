import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigationType } from "react-router";

//This is the track the routing history within the charts page
export default function useRoutingHistory() {
  //This is needed to track the which one of the browsers button is pressed, back or forward.
  const navigationType = useNavigationType();
  //This tracks the current page /url we are in
  const location = useLocation();
  const { chartType, countryname } = useParams();
  const [routeHistory, setRouteHistory] = useState(() => {
    // Load existing route history, specifically the chart type url param from localStorage on initial render
    try {
      const saved = sessionStorage.getItem("appRouteHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [routeCountryHistory, setRouteCountryHistory] = useState(() => {
    // Load existing route history, specifically the country name url param from localStorage on initial render
    try {
      const saved = sessionStorage.getItem("routeCountryHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // if the browser's forward button is pressed or any click, button click etc., that counts as 'PUSH' then the routing history must be updated. The new url is added to the routing history.
    if (navigationType === "PUSH") {
      //Only add to the routing history if the is no routing history, the previous chart type url param is different from the current one or the previous country name url param is different form the current one.
      if (
        routeHistory.length === 0 ||
        routeHistory[routeHistory.length - 1] !== chartType ||
        routeCountryHistory[routeCountryHistory.length - 1] != countryname
      ) {
        const newEntry = chartType;
        const newCountryEntry = countryname;

        const updatedHistory = [...routeHistory, newEntry].slice(-20); // Keep last 20
        const updatedRouteCountryHistory = [
          ...routeCountryHistory,
          newCountryEntry.slice(-20),
        ];

        setRouteHistory(updatedHistory);
        setRouteCountryHistory(updatedRouteCountryHistory);

        sessionStorage.setItem(
          "appRouteHistory",
          JSON.stringify(updatedHistory),
        );
        sessionStorage.setItem(
          "routeCountryHistory",
          JSON.stringify(updatedRouteCountryHistory),
        );
      }
    }
  }, [location]);

  return {
    routeHistory,
    setRouteHistory,
    routeCountryHistory,
    setRouteCountryHistory,
  };
}
