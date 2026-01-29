export default async function getLocation(signal) {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal });
    const data = await res.json();
    return {
      city: data.city,
      country: data.country_name,
      country_code: data.country,
      lat: data.latitude,
      lon: data.longitude,
    };
  } catch (error) {
    return null;
  }
}
