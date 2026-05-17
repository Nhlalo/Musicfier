import { createContext, useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useMatches, useLocation } from "react-router";
import { getUserLocation } from "../../services/location-service";
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
    const abortController = new AbortController();
    const { signal } = abortController;

    const acquireUserLocation = async () => {
      try {
        // Check cache first
        const storedUserLocation = localStorage.getItem("userLocation");
        const storedExpiry = localStorage.getItem("hourLater");
        const now = Date.now();
        const isExpired = storedExpiry ? Number(storedExpiry) <= now : true;

        let userLocation = null;

        if (storedUserLocation && !isExpired) {
          userLocation = JSON.parse(storedUserLocation);
        } else {
          userLocation = await getUserLocation(signal);
          if (signal.aborted) return;

          if (!userLocation) {
            throw new Error("No location available");
          }

          const hourLater = Date.now() + 3600000;
          localStorage.setItem("userLocation", JSON.stringify(userLocation));
          localStorage.setItem("hourLater", hourLater.toString());
        }

        if (signal.aborted) return;

        setLocation(userLocation);
      } catch (err) {
        if (signal.aborted) return;
        console.error("Failed to acquire location", err);
        setLocation(null);
      }
    };

    acquireUserLocation(); // <-- actually call the function

    return () => {
      abortController.abort();
    };
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
