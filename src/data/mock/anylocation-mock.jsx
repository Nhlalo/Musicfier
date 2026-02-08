const mockLocation = [
  {
    city: "Johannesburg",
    country: "South Africa",
    countryCode: "ZA",
    key: crypto.randomUUID(), // Keys are needed for any list creation
  },
  {
    city: "Spain",
    country: "Barcelona",
    countryCode: "ES",
    key: crypto.randomUUID(), // Keys are needed for any list creation
  },
  {
    city: "Egypt",
    country: "Cairo",
    countryCode: "EG",
    key: crypto.randomUUID(), // Keys are needed for any list creation
  },
  {
    city: "Lisbon",
    country: "Portugal",
    countryCode: "PT",
    key: crypto.randomUUID(), // Keys are needed for any list creation
  },
  {
    city: "Rosario",
    country: "Argentina",
    countryCode: "AR",
    key: crypto.randomUUID(), // Keys are needed for any list creation
  },
  {
    city: "London",
    country: "England",
    countryCode: "GB",
    key: crypto.randomUUID(), // Keys are needed for any list creation
  },
];

export default function getLocation(locationInput) {
  if (!location || location.trim() === "") {
    return;
  }
  const lowerCaseInput = locationInput.toLowerCase();
  return mockLocation.filter(
    (location) =>
      location.country.toLowerCase().includes(lowerCaseInput) ||
      location.city.toLowerCase().includes(lowerCaseInput),
  );
}
export { mockLocation };
