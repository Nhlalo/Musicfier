// Get Access Token
async function getAccessToken(signal) {
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

// Search for artists
async function getArtistData(keyword, signal) {
  try {
    const token = await getAccessToken();

    // Create URL object and append params
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

    if (!data._embedded?.attractions) return [];

    const artists = data._embedded.attractions.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image:
        artist.images?.find((img) => img.ratio === "16_9")?.url ||
        artist.images?.[0]?.url,
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
) {
  try {
    const token = await getAccessToken(signal);

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

    if (!data._embedded?.events) return [];

    // Extract data based on the actual response structure
    return (
      data._embedded.events.map((event) => {
        // Get the first attraction (artist) if available
        const attraction = event._embedded?.attractions?.[0];

        return {
          // Event info
          eventDate: event.dates?.start?.localDate,

          // Artist info (from attractions)
          artistId: attraction?.id,
          artistName: attraction?.name,
          artistImage:
            attraction?.images?.find((img) => img.ratio === "16_9")?.url ||
            attraction?.images?.[0]?.url,
          artistGenre: attraction?.classifications?.[0]?.genre?.name,

          // Venue info
          venueName: event._embedded?.venues?.[0]?.name,
          venueCity: event._embedded?.venues?.[0]?.city?.name,
          venueState: event._embedded?.venues?.[0]?.state?.stateCode,
          venueCountry: event._embedded?.venues?.[0]?.country?.countryCode,
          venueLng: event._embedded?.venues?.[0]?.country?.longitude,
          venueLat: event._embedded?.venues?.[0]?.locatiion?.latitude,

          // Ticket info
          ticketUrl: event.url,
        };
      }) || null
    );
  } catch (error) {
    if (error.name === "TypeError" || error.name === "SyntaxError") {
      throw new Error(`Network/parsing error: ${error.message}`);
    }
    throw error;
  }
}

export { getArtistData, searchEvents };
