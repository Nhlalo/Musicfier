//Will cause the web page to scroll to the top of the page
export default function handleScrollToTop(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
