import { createContext, useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useMatches, useLocation } from "react-router";
import { mockUserLocation } from "../../data/mock/user-location-mock";
import Header from "./header/header";
import Footer from "./footer/footer";

const LocationContext = createContext();

export default function RootLayout() {
  const { pathname } = useLocation();
  const [location, setLocation] = useState(null);

  const matches = useMatches();
  const routeHandles = matches.map((match) => match.handle).filter(Boolean);

  const mergedHandle = Object.assign({}, ...routeHandles);
  const shouldHideHeader = mergedHandle?.header === "hidden";
  const shouldHideFooter = mergedHandle?.footer === "hidden";

  //This is to overcome the react default of scroll position persistence when navigating to another page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    //Cache the user's location
    const currentTime = Date.now();
    const storedHourLater = localStorage.getItem("hourLater");
    const expiryTime = storedHourLater ? Number(storedHourLater) : 0;
    const storedUserLocation = localStorage.getItem("userLocation");

    //if there is no location stored within local storage with the key "userLocation", make an api call
    let userLocation = !storedUserLocation
      ? mockUserLocation
      : JSON.parse(storedUserLocation);

    if (!storedUserLocation || currentTime >= expiryTime) {
      userLocation = mockUserLocation;

      const hourLater = Date.now() + 3600000;
      localStorage.setItem("userLocation", JSON.stringify(userLocation));
      localStorage.setItem("hourLater", hourLater.toString());
    }

    localStorage.setItem("location", userLocation);
    setLocation(userLocation);
  }, []);
  return (
    <>
      <LocationContext.Provider value={location}>
        {!shouldHideHeader && <Header />}
        <main>
          <Outlet />
        </main>
        {!shouldHideFooter && <Footer />}
      </LocationContext.Provider>
    </>
  );
}
export { LocationContext };
