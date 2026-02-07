function getTodayDate() {
  // Get events happening today (any time) in "2024-01-15" format
  const today = new Date().toISOString().split("T")[0];

  return today;
}
function getTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today); // Create a copy of today
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0]; // "2024-01-16"
}
