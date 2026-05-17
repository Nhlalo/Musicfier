// Get Access Token
async function getAccessToken(consumerKey, consumerSecret, signal) {
  try {
    const response = await fetch("https://oauth.ticketmaster.com/oauth/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${consumerKey}:${consumerSecret}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      signal,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.access_token || null;
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

async function getArtistData(keyword, token, signal) {
  try {
    const url = new URL(
      "https://app.ticketmaster.com/discovery/v2/attractions.json",
    );
    url.searchParams.append("keyword", keyword);
    url.searchParams.append("size", "8");

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data._embedded?.attractions || !data._embedded?.attractions?.length)
      return null;

    const artists = data._embedded.attractions.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.images,
      genre: artist.classifications?.[0]?.genre?.name,
      upcomingEvents: artist.upcomingEvents?._total || 0,
    }));

    return artists || null;
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

/* This will filter event search by artist name, date range, country and or city */
async function searchEvents(
  attractionId,
  keyword,
  startDate,
  endDate,
  countryCode,
  city,
  signal,
  token,
) {
  try {
    const url = new URL(
      "https://app.ticketmaster.com/discovery/v2/events.json",
    );
    if (attractionId) url.searchParams.append("attractionId", attractionId);
    if (keyword) url.searchParams.append("keyword", keyword);
    url.searchParams.append("startDateTime", `${startDate}T00:00:00Z`);
    url.searchParams.append("endDateTime", `${endDate}T23:59:59Z`);
    url.searchParams.append("countryCode", countryCode);
    if (city) url.searchParams.append("city", city);
    url.searchParams.append("size", "20");

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    if (!data._embedded?.events || !data._embedded?.events?.length) return null;

    // Extract data based on the actual response structure
    return data._embedded.events.map((event) => {
      // Get the first attraction (artist) if available
      const attraction = event._embedded?.attractions?.[0];

      return {
        eventDate: event.dates?.start?.localDate,

        artistId: attraction?.id,
        artistName: attraction?.name,
        artistImage: attraction?.images,
        artistGenre: attraction?.classifications?.[0]?.genre?.name,

        venueName: event._embedded?.venues?.[0]?.name,
        venueCity: event._embedded?.venues?.[0]?.city?.name,
        venueState: event._embedded?.venues?.[0]?.state?.stateCode,
        venueCountry: event._embedded?.venues?.[0]?.country?.countryCode,
        venueLng: event._embedded?.venues?.[0]?.country?.longitude,
        venueLat: event._embedded?.venues?.[0]?.location?.latitude,

        ticketUrl: event.url,
      };
    });
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

export { getArtistData, searchEvents, getAccessToken };
