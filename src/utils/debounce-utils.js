//This is a debounce function to help optimization the tracking of the viewport width
export default function debounce(func, wait) {
  if (typeof wait != "number") return;
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}
