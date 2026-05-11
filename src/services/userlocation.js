export default async function getLocation(signal) {
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
