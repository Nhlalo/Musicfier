//for any other element besides dialog element
function displayModal(modal, focusableElements) {
  // Focus first element
  const firstFocusable = focusableElements[0];
  if (firstFocusable) firstFocusable.focus();
  const lastElement = focusableElements[focusableElements.length - 1];

  // Add focus trap
  modal.addEventListener("keydown", (e) => trapFocus(e, focusableElements));
}

//Make dialog element be visible
function openDialog(dialog) {
  dialog.show();
}

function closeDialog(dialog, focusableElements, previouslyFocusedElement) {
  dialog.close();
  dialog.removeEventListener("keydown", (e) => trapFocus(e, focusableElements));

  // Return focus
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
}

function trapFocus(e, focusableElements) {
  if (e.key !== "Tab") return;

  const focusable = focusableElements;
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    // Shift + Tab
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    // Tab
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
export { openDialog, closeDialog, displayModal };
