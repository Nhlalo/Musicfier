import { X } from "lucide-react";
import Styles from "./audioRecognition";
export default function Error({ error }) {
  //This make the error message disappear by turning the error state in the About component to false
  function handleClose() {
    error(false);
  }
  return (
    <div className={Styles.errorfeedback} role="status" aria-live="polite">
      <div className={Styles.errorfeedbackWrapper}>
        <button type="button" className={Styles.closeBTN} onClick={handleClose}>
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
