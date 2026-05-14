import { mockDrakeImages } from "./images.mock";

function getFormattedDate(daysOffset) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

const today = getFormattedDate(0);
const tomorrow = getFormattedDate(1); // After 1 day
const after3Days = getFormattedDate(3); // After 3 days
const after4Days = getFormattedDate(4); // After 4 days
const after7Days = getFormattedDate(7); // After 7 days
const after14Days = getFormattedDate(14); // After 14 days

const mockArtists = [
  {
    id: "12345",
    name: "Drake",
    image: mockDrakeImages,
    genre: "Hip-Hop/Rap",
    upcomingEvents: 27,
  },
  {
    id: "67890",
    name: "Drake",
    image: mockDrakeImages,
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
    image: mockDrakeImages,
    genre: null,
    upcomingEvents: 0,
  },
  {
    id: "24680",
    name: "Drake",
    image: mockDrakeImages,
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
    id: "13575",
    name: "Drake",
    image: null,
    genre: "R&B",
    upcomingEvents: 18,
  },
  {
    id: "13279",
    name: "Kendrick Lamar",
    image: null,
    genre: "R&B",
    upcomingEvents: 18,
  },
  {
    id: "13283",
    name: "Billie Eilish",
    image: null,
    genre: "R&B",
    upcomingEvents: 18,
  },
  {
    id: "86420",
    name: "Offset",
    image: mockDrakeImages,
    genre: "Alternative",
    upcomingEvents: 31,
  },
  {
    id: "11223",
    name: "Bad Bunny",
    image: mockDrakeImages,
    genre: "Hip-Hop/Rap",
    upcomingEvents: 12,
  },
];

const mockEvents = [
  {
    eventDate: today,
    artistId: "12345",
    artistName: "Drake",
    artistImage: mockDrakeImages,
    artistGenre: "Hip-Hop/Rap",
    venueName: "Madison Square Garden",
    venueCity: "New York",
    venueState: "NY",
    venueCountry: "US",
    venueLat: 40.7505,
    venueLng: -73.9934,
    ticketUrl: "https://ticketmaster.com/drake-nyc",
  },
  {
    eventDate: today,
    artistId: "67890",
    artistName: "Taylor Swift",
    artistImage: mockDrakeImages,
    artistGenre: "Pop",
    venueName: "SoFi Stadium",
    venueCity: "Los Angeles",
    venueState: "CA",
    venueCountry: "US",
    venueLat: 33.9535,
    venueLng: -118.3395,
    ticketUrl: "https://ticketmaster.com/taylor-la",
  },
  {
    eventDate: after3Days,
    artistId: "54321",
    artistName: "Coldplay",
    artistImage: null,
    artistGenre: "Rock",
    venueName: "Wembley Stadium",
    venueCity: "London",
    venueState: null,
    venueCountry: "GB",
    venueLat: 51.556,
    venueLng: -0.2795,
    ticketUrl: "https://ticketmaster.com/coldplay-london",
  },
  {
    eventDate: tomorrow,
    artistId: "98765",
    artistName: "Beyoncé",
    artistImage: mockDrakeImages,
    artistGenre: null,
    venueName: "Accor Arena",
    venueCity: "Paris",
    venueState: null,
    venueCountry: "FR",
    venueLat: 48.8386,
    venueLng: 2.3782,
    ticketUrl: "https://ticketmaster.com/beyonce-paris",
  },
  {
    eventDate: after3Days,
    artistId: "24680",
    artistName: "Ed Sheeran",
    artistImage: mockDrakeImages,
    artistGenre: "Pop",
    venueName: "Rod Laver Arena",
    venueCity: "Melbourne",
    venueState: "VIC",
    venueCountry: "AU",
    venueLat: -37.8228,
    venueLng: 144.9785,
    ticketUrl: "https://ticketmaster.com/ed-melbourne",
  },
  {
    eventDate: after14Days,
    artistId: "13579",
    artistName: "Bad Bunny",
    artistImage: mockDrakeImages,
    artistGenre: "Reggaeton",
    venueName: "FNB Stadium",
    venueCity: "Johannesburg",
    venueState: "Gauteng",
    venueCountry: "ZA",
    venueLat: -26.2348,
    venueLng: 27.9823,
    ticketUrl: "https://ticketmaster.com/badbunny-johannesburg",
  },
  {
    eventDate: after4Days,
    artistId: "11223",
    artistName: "The Weeknd",
    artistImage: null,
    artistGenre: "R&B",
    venueName: "Rogers Centre",
    venueCity: "Toronto",
    venueState: "ON",
    venueCountry: "CA",
    venueLat: 43.6414,
    venueLng: -79.3893,
    ticketUrl: "https://ticketmaster.com/weeknd-toronto",
  },
  {
    eventDate: tomorrow,
    artistId: "33445",
    artistName: "Black Coffee",
    artistImage: mockDrakeImages,
    artistGenre: "House",
    venueName: "Cape Town Stadium",
    venueCity: "Cape Town",
    venueState: "Western Cape",
    venueCountry: "ZA",
    venueLat: -33.9035,
    venueLng: 18.4113,
    ticketUrl: "https://ticketmaster.com/blackcoffee-cape-town",
  },
  {
    eventDate: today,
    artistId: "12345",
    artistName: "Drake",
    artistImage: mockDrakeImages,
    artistGenre: "Hip-Hop/Rap",
    venueName: "Durban International Convention Centre",
    venueCity: "Durban",
    venueState: "KwaZulu-Natal",
    venueCountry: "ZA",
    venueLat: -29.8587,
    venueLng: 31.0218,
    ticketUrl: "https://ticketmaster.com/drake-durban",
  },
  {
    eventDate: after7Days,
    artistId: "12345",
    artistName: "Drake",
    artistImage: mockDrakeImages,
    artistGenre: "Hip-Hop/Rap",
    venueName: "Montecasino Outdoor Events Arena",
    venueCity: "Johannesburg",
    venueState: "Gauteng",
    venueCountry: "ZA",
    venueLat: -26.024,
    venueLng: 28.0095,
    ticketUrl: "https://ticketmaster.com/drake-johannesburg",
  },
  {
    eventDate: tomorrow,
    artistId: "13279",
    artistName: "Kendrick Lamar",
    artistImage: null,
    artistGenre: "Hip-Hop",
    venueName: "GrandWest Arena",
    venueCity: "Cape Town",
    venueState: "Western Cape",
    venueCountry: "ZA",
    venueLat: -33.8702,
    venueLng: 18.5228,
    ticketUrl: "https://ticketmaster.com/kendrick-cape-town",
  },
  {
    eventDate: today,
    artistId: "13283",
    artistName: "Billie Eilish",
    artistImage: mockDrakeImages,
    artistGenre: "Alternative Pop",
    venueName: "Ticketpro Dome",
    venueCity: "Johannesburg",
    venueState: "Gauteng",
    venueCountry: "ZA",
    venueLat: -26.1058,
    venueLng: 27.9831,
    ticketUrl: "https://ticketmaster.com/billie-johannesburg",
  },
];

function getMockArtistData(keyword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredArtists = mockArtists.filter((artistData) =>
        artistData.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      resolve(filteredArtists);
    }, 5000);
  });
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
    ? mockEvents.filter(
        (concertEvent) => concertEvent.artistId === attractionId,
      )
    : mockEvents;

  // Filter by keyword if provided (case-insensitive)
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filteredEvents = filteredEvents.filter((concertEvent) =>
      concertEvent.artistName.toLowerCase().includes(lowerKeyword),
    );
  }

  // Filter by countryCode if provided
  if (countryCode) {
    filteredEvents = filteredEvents.filter(
      (concertEvent) => concertEvent.venueCountry === countryCode,
    );
  }

  // Filter by city if provided (case-insensitive)
  if (city) {
    const lowerCity = city.toLowerCase();
    filteredEvents = filteredEvents.filter((concertEvent) =>
      concertEvent.venueCity.toLowerCase().includes(lowerCity),
    );
  }

  // Filter by date range (simple string comparison for demo)
  if (startDate && endDate) {
    filteredEvents = filteredEvents.filter((concertEvent) => {
      const startDuration = startDate.slice(0, 10);
      const endDuration = endDate.slice(0, 10);
      return (
        concertEvent.eventDate >= startDuration &&
        concertEvent.eventDate <= endDuration
      );
    });
  }

  return filteredEvents;
}

export { getMockArtistData, searchMockEvents };
