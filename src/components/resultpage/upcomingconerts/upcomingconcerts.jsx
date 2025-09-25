import { Calendar, ChevronRight } from "lucide-react";
import Styles from "./styles.module.css";

export default function UpcomingConcerts() {
  return (
    <section>
      <h2>Upcoming Concerts</h2>

      <a href="" aria-label="Link to purchase the ticket">
        <span class={Styles.date} aria-hidden="true">
          <Calendar className={Styles.calendar} /> 1 October 2020
        </span>
        <span class={Styles.location} aria-hidden="true">
          MGM Music Hall at Fenway
        </span>
        <span class={Styles.city} aria-hidden="true">
          Boston
        </span>
      </a>
      <button type="button" aria-label="Show all the concerts of this artist">
        <div className={Styles.monthContainer} aria-hidden="true">
          <div className={Styles.month}>OCT</div>
        </div>
        <div className={Styles.moreConcertsContainer} aria-hidden="true">
          <p>More upcomming concerts by Kevin Gates</p>
          <span className={Styles.seeAll}>
            See All <ChevronRight className={Styles.chevronRight} />
          </span>
        </div>
      </button>
    </section>
  );
}
