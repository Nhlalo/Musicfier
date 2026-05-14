// Common selectors for focusable elements in a modal (including interactive and custom tabindex elements)
const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  "details", // container may be focusable in some browsers
  "details > summary:first-of-type", // summary acts as the toggle control
  "[contenteditable]",
].join(", ");

export default function getFocusableElements(modalRef) {
  return Array.from(modalRef.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    (el) =>
      !el.hasAttribute("disabled") && // double-check disabled attribute (though selectors already try)
      !el.getAttribute("aria-hidden"), // exclude elements hidden from screen readers
  );
}
