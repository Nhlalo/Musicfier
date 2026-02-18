import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//Use an icon when there is no image source for either the song cover or artist image.
export default function ImageReplacement({ iconClass }) {
  return (
    <FontAwesomeIcon
      icon={faUser}
      className={iconClass}
      style={{ color: "gray" }}
    />
  );
}
