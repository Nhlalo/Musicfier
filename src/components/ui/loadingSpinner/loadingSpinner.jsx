import { LoaderCircle } from "lucide-react";
import Styles from "./loadingSpinner.module.css";
export default function LoadingSpinner() {
  return (
    <div className={Styles.loadingContainer}>
      <div className={Styles.visuallyHidden}>waiting for the data to load</div>
      <LoaderCircle aria-hidden="true" className={Styles.loaderCircleIcon} />
    </div>
  );
}
