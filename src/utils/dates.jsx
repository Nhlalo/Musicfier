function getTodayDate() {
  // Get events happening today (any time) in "2024-01-15" format
  const today = new Date().toISOString().split("T")[0];

  return today;
}
