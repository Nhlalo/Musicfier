import { X } from "lucide-react";
import Styles from "./error.module.css";
export default function Error() {
  return (
    <div className={Styles.errorfeedback} role="status" aria-live="polite">
      <div className={Styles.errorfeedbackWrapper}>
        <button type="button" className={Styles.closeBTN}>
          {" "}
          <X className={Styles.xIcon} aria-hidden="true" />
        </button>
        <p className={Styles.errorHeader}>Couldn't quite catch that</p>
        <p className={Styles.errorDescr}>
          Increase the volume of the song or reduce background noise and try
          again.
        </p>
      </div>
    </div>
  );
}
