const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  "details",
  "details > summary:first-of-type",
  "[contenteditable]",
].join(", ");

export default function getFocusableElements(modalRef) {
  return Array.from(modalRef.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
  );
}
