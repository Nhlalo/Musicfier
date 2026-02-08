import { Search } from "lucide-react";
import Styles from "./locationSearch.module.css";
export default function ErrorMessage() {
  return (
    <div className={Styles.container}>
      <Search className={Styles.searchIcon} aria-hidden="true" />
      <p className={Styles.noResults}>
        We couldn't find any results matching to!
      </p>
      <p className={Styles.correction}>
        Please make sure your words are spelled correctly, or try using
        different key words
      </p>
    </div>
  );
}
