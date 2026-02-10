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
    city: "New York",
    country: "United States",
    countryCode: "US",
    key: crypto.randomUUID(),
  },
  {
    city: "Melbourne",
    country: "Australia",
    countryCode: "AU",
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
  if (!locationInput || locationInput.trim() === "") {
    return;
  }
  const lowerCaseInput = locationInput.toLowerCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredLocation = mockLocation.filter(
        (location) =>
          location.country.toLowerCase().includes(lowerCaseInput) ||
          location.city.toLowerCase().includes(lowerCaseInput),
      );
      resolve(filteredLocation);
    }, 5000);
  });
}
export { mockLocation };
