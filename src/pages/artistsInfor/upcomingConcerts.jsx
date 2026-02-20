import { ChevronRight } from "lucide-react";
import Container from "../../components/ui/container/container";
import Styles from "./artistInfor.module.css";

export default function UpcomingConcerts({ artistName, concerts }) {
  //Upcoming concert data
  const upcomingConcert = concerts[0];
  const upcomingDate = upcomingConcert?.eventDate;
  const date = new Date(upcomingDate);
  const day = date.getDate();
  const weekday = date.toLocaleString("default", { weekday: "long" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const country = upcomingConcert?.venueCountry;
  const city = upcomingConcert?.venueCity || upcomingConcert?.venueState;
  const venue = upcomingConcert?.venueName;

  //Upcoming concerts data
  const totalConcerts = concerts.length;

  function goToArtistPage(artistName) {
    // Format the artist name for URL (lowercase, replace spaces with hyphens)
    const formattedName = artistName?.toLowerCase().replace(/\s+/g, "-");
    const url = `https://www.ticketmaster.com/${formattedName}-tickets`;

    return url;
  }
  return (
    <Container>
      {concerts.length > 0 && (
        <>
          <div className={Styles.upcomingConcertsHeader}>
            <h2 className={Styles.upcomingConcertsHeader}>
              Upcoming Concerts for {artistName}
            </h2>
            <a
              href={goToArtistPage(artistName)}
              className={Styles.artistPageLink}
            >
              See All Concerts{" "}
              <ChevronRight
                aria-hidden="true"
                className={Styles.chevronRightIcon}
              />
            </a>
          </div>
          <div className={Styles.upcomingConcertsInfor}>
            <p className={Styles.upcomingConcertsDescr}>
              {artistName} currently has {totalConcerts} upcoming concerts; the
              next one is scheduled for {weekday}, {month} {day}, {year} at{" "}
              {venue} in {city}, {country}.
            </p>
          </div>
          <div className={Styles.concertsInforContainer}>
            {concerts.slice(0, 5).map((concert, index) => {
              const concertDate = concert?.eventDate;
              const date = new Date(concertDate);
              const day = date.getDate();
              const weekday = date.toLocaleString("default", {
                weekday: "short",
              });
              const month = date.toLocaleString("default", { month: "short" });
              const year = date.getFullYear();
              return (
                <UpcomingConcert
                  year={year}
                  month={month}
                  day={day}
                  weekday={weekday}
                  country={concert?.venueCountry}
                  city={concert?.venueCity}
                  venue={concert?.venueName}
                  url={concert?.ticketUrl}
                  key={index}
                />
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
}

function UpcomingConcert({
  year,
  month,
  day,
  weekday,
  venue,
  city,
  country,
  url,
}) {
  return (
    <a
      href={url}
      aria-label={`More information about the concert on ${day}, ${month} ${year} in ${venue}, ${city}, ${country}`}
      className={Styles.concertLink}
    >
      <div aria-hidden="true" className={Styles.calendarIcon}>
        <span className={Styles.iconMonth}>{month}</span>
        <span className={Styles.iconDay}>{day}</span>
      </div>
      <div aria-hidden="true" className={Styles.concertInfor}>
        <span className={Styles.day}>
          {weekday}, {month} {day}, {year}
        </span>
        <span className={Styles.venue}>{venue}</span>
        <span className={Styles.city}>{city}</span>
      </div>
    </a>
  );
}
