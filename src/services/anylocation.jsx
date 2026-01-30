//This aids in searching for the user's desired location by using the geonames api
export default async function getLocation(location, signal) {
  if (!location || location.trim() === "") {
    return;
  }

  try {
    const query = encodeURIComponent(location.trim());

    //This will return a maximum of 6 results with minimalistic data because style="short" is used
    const url = `http://api.geonames.org/searchJSON?q=${query}&maxRows=6&username=${GEONAMES_USERNAME}&style=MEDIUM`;

    const response = await fetch(url, { signal });

    const data = await response.json();
    //Throw an error if the place does not exist within the Geonames database
    if (!data.geonames || data.geonames.length === 0) {
      throw new Error("No place found");
    }

    const locationResult = data.geonames.map((place) => ({
      city: place.name,
      country: place.countryName,
      countryCode: place.countryCode,
      key: crypto.randomUUID(), // Keys are needed for any list creation
    }));

    return locationResult;
  } catch (error) {
    return;
  }
}
