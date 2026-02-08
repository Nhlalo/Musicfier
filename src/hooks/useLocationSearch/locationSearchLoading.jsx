import Styles from "./locationSearch.module.css";
import { LoaderCircle } from "lucide-react";
export default function Loading() {
  return (
    <div className={Styles.loadingContainer}>
      <span className={Styles.visuallyHidden}>Still searching</span>
      <span aria-hidden="true" className={Styles.suggestion}>
        SUGGESTION
      </span>
      <LoaderCircle aria-hidden="true" className={Styles.loaderCircleIcon} />
    </div>
  );
}
