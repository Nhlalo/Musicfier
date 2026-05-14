export default function determinePageNavigation(
  linkName,
  countryCode,
  startDate,
  endDate,
  userCity,
  userCountry,
) {
  const lowerCaseLinkName = linkName.toLowerCase();
  if (lowerCaseLinkName == "concerts") {
    return `/concerts/${countryCode}?sd=${startDate}&ed=${endDate}&c=${userCity}`;
  }
  if (lowerCaseLinkName == "charts") {
    return `/charts/top50/${userCountry}`;
  }
  if (lowerCaseLinkName == "my music") {
    return `/mymusic`;
  }
  return null;
}
