import artistImg from "../../assets/images/artistImg.jpg";
const mockArtists = [
  {
    id: "12345",
    name: "Drake",
    image: artistImg,
    genre: "Hip-Hop/Rap",
    upcomingEvents: 27,
  },
  {
    id: "67890",
    name: "Drake",
    image: artistImg,
    genre: "Pop",
    upcomingEvents: 42,
  },
  {
    id: "54321",
    name: "Drake",
    image: null,
    genre: "Rock",
    upcomingEvents: 15,
  },
  {
    id: "98765",
    name: "Drake",
    image: artistImg,
    genre: null,
    upcomingEvents: 0,
  },
  {
    id: "24680",
    name: "Drake",
    image: artistImg,
    genre: "Pop",
    upcomingEvents: 0,
  },
  {
    id: "13579",
    name: "Drake",
    image: null,
    genre: "R&B",
    upcomingEvents: 18,
  },
  {
    id: "86420",
    name: "Drake",
    image: artistImg,
    genre: "Alternative",
    upcomingEvents: 31,
  },
  {
    id: "11223",
    name: "Drake",
    image: artistImg,
    genre: "Hip-Hop/Rap",
    upcomingEvents: 12,
  },
];
const mockEvents = [
  {
    eventDate: "2024-08-15",
    artistId: "12345",
    artistName: "Drake",
    artistImage: artistImg,
    artistGenre: "Hip-Hop/Rap",
    venueName: "Madison Square Garden",
    venueCity: "New York",
    venueState: "NY",
    venueCountry: "US",
    ticketUrl: "https://ticketmaster.com/drake-nyc",
  },
  {
    eventDate: "2024-09-20",
    artistId: "67890",
    artistName: "Taylor Swift",
    artistImage: artistImg,
    artistGenre: "Pop",
    venueName: "SoFi Stadium",
    venueCity: "Los Angeles",
    venueState: "CA",
    venueCountry: "US",
    ticketUrl: "https://ticketmaster.com/taylor-la",
  },
  {
    eventDate: "2024-10-05",
    artistId: "54321",
    artistName: "Coldplay",
    artistImage: null,
    artistGenre: "Rock",
    venueName: "Wembley Stadium",
    venueCity: "London",
    venueState: null,
    venueCountry: "GB",
    ticketUrl: "https://ticketmaster.com/coldplay-london",
  },
  {
    eventDate: "2024-07-30",
    artistId: "98765",
    artistName: "Beyoncé",
    artistImage: artistImg,
    artistGenre: null,
    venueName: "Accor Arena",
    venueCity: "Paris",
    venueState: null,
    venueCountry: "FR",
    ticketUrl: "https://ticketmaster.com/beyonce-paris",
  },
  {
    eventDate: "2024-11-12",
    artistId: "24680",
    artistName: "Ed Sheeran",
    artistImage: artistImg,
    artistGenre: "Pop",
    venueName: "Rod Laver Arena",
    venueCity: "Melbourne",
    venueState: "VIC",
    venueCountry: "AU",
    ticketUrl: "https://ticketmaster.com/ed-melbourne",
  },
  {
    eventDate: "2024-08-22",
    artistId: "13579",
    artistName: "Bad Bunny",
    artistImage: artistImg,
    artistGenre: "Reggaeton",
    venueName: "Estadio Azteca",
    venueCity: "Mexico City",
    venueState: null,
    venueCountry: "MX",
    ticketUrl: "https://ticketmaster.com/badbunny-mexico",
  },
  {
    eventDate: "2024-09-05",
    artistId: "11223",
    artistName: "The Weeknd",
    artistImage: null,
    artistGenre: "R&B",
    venueName: "Rogers Centre",
    venueCity: "Toronto",
    venueState: "ON",
    venueCountry: "CA",
    ticketUrl: "https://ticketmaster.com/weeknd-toronto",
  },
];

function getMockArtistData(keyword) {
  return mockArtists.filter(
    (artistData) => artistData.name.toLowerCase() === keyword.toLowerCase(),
  );
}

function searchMockEvents(
  attractionId,
  keyword,
  startDate,
  endDate,
  countryCode,
  city,
) {
  // Filter by attractionId if provided
  let filteredEvents = attractionId
    ? mockEvents.filter((event) => event.artistId === attractionId)
    : mockEvents;

  // Filter by keyword if provided (case-insensitive)
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.artistName.toLowerCase().includes(lowerKeyword) ||
        event.venueName.toLowerCase().includes(lowerKeyword) ||
        event.artistGenre.toLowerCase().includes(lowerKeyword),
    );
  }

  // Filter by countryCode if provided
  if (countryCode) {
    filteredEvents = filteredEvents.filter(
      (event) => event.venueCountry === countryCode,
    );
  }

  // Filter by city if provided (case-insensitive)
  if (city) {
    const lowerCity = city.toLowerCase();
    filteredEvents = filteredEvents.filter((event) =>
      event.venueCity.toLowerCase().includes(lowerCity),
    );
  }

  // Filter by date range (simple string comparison for demo)
  if (startDate && endDate) {
    filteredEvents = filteredEvents.filter(
      (event) => event.eventDate >= startDate && event.eventDate <= endDate,
    );
  }

  return filteredEvents;
}

export { getMockArtistData, searchMockEvents };
