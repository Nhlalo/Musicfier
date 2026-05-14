//This will acquire the location of the user without any permission granted as it is crucial in displaying the charts within the user's location

async function getUserLocation(signal) {
  try {
    const response = await fetch("https://ipapi.co/json/", { signal });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return (
      {
        city: data.city,
        country: data.country_name,
        country_code: data.country,
        lat: data.latitude,
        lon: data.longitude,
      } || null
    );
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

//This aids in searching for the user's desired location by using the geonames api
async function getAnyLocation(location, signal) {
  if (!location || location.trim() === "") {
    return;
  }

  try {
    const query = encodeURIComponent(location.trim());

    //This will return a maximum of 6 results with minimalistic data because style="short" is used
    const url = `http://api.geonames.org/searchJSON?q=${query}&maxRows=6&username=${GEONAMES_USERNAME}&style=MEDIUM`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

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

    return locationResult || null;
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

export { getUserLocation, getAnyLocation };
