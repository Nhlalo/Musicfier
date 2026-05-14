import { useContext, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { concertsInformationContext } from "../Concerts";
import ImageReplacement from "../../../components/ui/ImageReplacement";
import Styles from "./ConcertDetails.module.css";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function customImageIcon(artistImg) {
  // Only create custom icon if artist image exists
  if (!artistImg) {
    return new L.Icon.Default(); // Use default marker
  }

  return new L.Icon({
    iconUrl: artistImg,
    iconSize: [34, 34],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: Styles.mapIcon,
  });
}

// Component to handle auto-fitting bounds. This allows the map to display markers within the whole country rather than one specific city.
function FitToEvents({ events }) {
  const map = useMap();

  useEffect(() => {
    if (events && events.length > 0 && map) {
      const validEvents = events.filter(
        (event) => event.venueLat && event.venueLng,
      );

      if (validEvents.length > 0) {
        const bounds = L.latLngBounds(
          validEvents.map((event) => [event.venueLat, event.venueLng]),
        );
        setTimeout(() => {
          map.fitBounds(bounds, { padding: [50, 50] });
        }, 100); // Small delay to ensure map is ready
      }
    }
  }, [events, map]);

  return null;
}

export default function ConcertMap() {
  const { concertsDetails } = useContext(concertsInformationContext);

  const defaultCenter = [39.8283, -98.5795];
  const defaultZoom = 4;

  if (!concertsDetails || concertsDetails.length === 0) {
    return (
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className={Styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    );
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className={Styles.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitToEvents events={concertsDetails} />

      {concertsDetails.map((loc) => (
        <Marker
          key={`${loc.artistId}-${loc.venueLat}-${loc.venueLng}`}
          position={[loc.venueLat, loc.venueLng]}
          icon={customImageIcon(loc.artistImage)}
        >
          <Popup>
            <a
              href={loc.ticketUrl}
              aria-label={`Purchase ticket for ${loc.artistName}'s concert on ${loc.eventDate} in ${loc?.venueCity || loc.venueCountry}`}
              className={Styles.concertLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {loc?.artistImage && (
                <img
                  src={loc.artistImage}
                  alt={`${loc.artistName}`}
                  loading="lazy"
                  aria-hidden="true"
                  className={Styles.artistImage}
                />
              )}
              {!loc?.artistImage && (
                <ImageReplacement iconClass={Styles.artistImage} />
              )}
              <div aria-hidden="true" className={Styles.concertInfor}>
                <span className={Styles.date}>
                  <Calendar className={Styles.calendarIcon} />
                  {loc.eventDate}
                </span>
                <span className={Styles.artistName}>{loc.artistName}</span>
                <span className={Styles.location}>{loc.venueName}</span>
                <span className={Styles.genre}>{loc.artistGenre}</span>
              </div>
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
