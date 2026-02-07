import { Search } from "lucide-react";
import Styles from "./artistsSearch.module.css";
export default function ErrorMessage() {
  return (
    <div className={Styles.errorContainer}>
      <div aria-hidden="true" className={Styles.searchIconContainer}>
        <Search className={Styles.searchIcon} />
      </div>
      <p className={Styles.noResults}>We couldn't find any results matching</p>
      <p className={Styles.suggestion}>
        Please make sure your words are spelled correctly, or try using
        different keywords
      </p>
    </div>
  );
}
