export default function setBTNStatus(item, changeBTNStatus) {
  if (item === "Top 50" || item === "top50") {
    changeBTNStatus(true, false, false, false);
  } else if (item === "Viral" || item === "viral") {
    changeBTNStatus(false, true, false, false);
  } else if (item === "Discovery" || item === "discovery") {
    changeBTNStatus(false, false, true, false);
  } else {
    changeBTNStatus(false, false, false, true);
  }
}
