import ArtistImg from "../../assets/images/artistImg.jpg";

// Unique position variables for each country
let positionUS = 0;
let positionUK = 0;
let positionCanada = 0;
let positionAustralia = 0;
let positionGermany = 0;
let positionFrance = 0;
let positionJapan = 0;
let positionIndia = 0;
let positionBrazil = 0;
let positionSouthAfrica = 0;

function createMockSong(
  position,
  songName,
  artistName,
  artistImage,
  songCover,
  spotifyLink,
  songPreviewUrl,
  spotifyArtistId,
) {
  return {
    key: crypto.randomUUID(),
    position,
    songName,
    artistName,
    artistImage,
    songCover,
    spotifyLink,
    songPreviewUrl,
    spotifyArtistId,
  };
}

// Create individual country chart objects
const usChart = {
  country: "United States",
  songs: [
    createMockSong(
      ++positionUS,
      "Cruel Summer",
      "Taylor Swift",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr",
      "preview_url_1",
      "06HL4z0CvFAxyc27GXpf02",
    ),
    createMockSong(
      ++positionUS,
      "Last Night",
      "Morgan Wallen",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/7K3BhSpAxZBznislvUMVtn",
      "preview_url_2",
      "4QTxD5qJ3K5C5Q5d5y0q5J",
    ),
    createMockSong(
      ++positionUS,
      "Fast Car",
      "Luke Combs",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1Lo0QY9cvc8sUB2vnIOxDT",
      "preview_url_3",
      "4L2sR2j6dJg5hT6f8kOO6t",
    ),
  ],
};

const ukChart = {
  country: "United Kingdom",
  songs: [
    createMockSong(
      ++positionUK,
      "Sprinter",
      "Dave, Central Cee",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2FDTHlrBguDzQkp7PVj16Q",
      "preview_url_4",
      "2Soa9m89lmlYq4cCi9p6Z5",
    ),
    createMockSong(
      ++positionUK,
      "Dance The Night",
      "Dua Lipa",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/11C4y2Yz1XbHmaQkgO7FAC",
      "preview_url_5",
      "6M2xZuxGJ5nZBHTp3Qk5cN",
    ),
    createMockSong(
      ++positionUK,
      "Miracle",
      "Calvin Harris, Ellie Goulding",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/5B6V4ZxU6Y3Rhw6qRg6pCh",
      "preview_url_6",
      "7CajNmpbOovFoOoasH2HaY",
    ),
  ],
};

const canadaChart = {
  country: "Canada",
  songs: [
    createMockSong(
      ++positionCanada,
      "Paint The Town Red",
      "Doja Cat",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2IGMVunIBsBLtEQyoI1Mu7",
      "preview_url_7",
      "5cj0lLjcoR7YOSnhnX0Po5",
    ),
    createMockSong(
      ++positionCanada,
      "What Was I Made For?",
      "Billie Eilish",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1A6j5k3ZfTz8j7d4PJc5P5",
      "preview_url_8",
      "6qqNVTkY8uBg9cP3Jd7DAH",
    ),
    createMockSong(
      ++positionCanada,
      "Seven",
      "Jung Kook, Latto",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2B5uhL8e3iJj6o8t5Q6h5T",
      "preview_url_9",
      "6eV8O8De1mibErM1XM1tEc",
    ),
  ],
};

const australiaChart = {
  country: "Australia",
  songs: [
    createMockSong(
      ++positionAustralia,
      "Rush",
      "Troye Sivan",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1xs8bOvm3IzEYmcLJVOc34",
      "preview_url_10",
      "3CpXBs6qI0WkYpJTkX3Z2S",
    ),
    createMockSong(
      ++positionAustralia,
      "People",
      "Libianca",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/26b3oVLrRUaaybJulow9kz",
      "preview_url_11",
      "4iH5B7Q1w3jG7J8Z5J2y4d",
    ),
    createMockSong(
      ++positionAustralia,
      "Made You Look",
      "Meghan Trainor",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/0Qzzd5f0tQ8p5x5z5J5J5J",
      "preview_url_12",
      "6K4p31p6K8r0F4YdFcQ4fG",
    ),
  ],
};

const germanyChart = {
  country: "Germany",
  songs: [
    createMockSong(
      ++positionGermany,
      "Layla",
      "DJ Robin, Schürze",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/3Qh7L5Wp1Z7B7k7J5J5J5J",
      "preview_url_13",
      "3Qh7L5Wp1Z7B7k7J5J5J5J",
    ),
    createMockSong(
      ++positionGermany,
      "Sie weiß",
      "AYLIVA",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/5K4p31p6K8r0F4YdFcQ4fG",
      "preview_url_14",
      "5K4p31p6K8r0F4YdFcQ4fG",
    ),
    createMockSong(
      ++positionGermany,
      "Komet",
      "Udo Lindenberg, Apache 207",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/7K3BhSpAxZBznislvUMVtn",
      "preview_url_15",
      "7K3BhSpAxZBznislvUMVtn",
    ),
  ],
};

const franceChart = {
  country: "France",
  songs: [
    createMockSong(
      ++positionFrance,
      "Mélodie",
      "Timal",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1Lo0QY9cvc8sUB2vnIOxDT",
      "preview_url_16",
      "1Lo0QY9cvc8sUB2vnIOxDT",
    ),
    createMockSong(
      ++positionFrance,
      "Daytona",
      "Gazo",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2FDTHlrBguDzQkp7PVj16Q",
      "preview_url_17",
      "2FDTHlrBguDzQkp7PVj16Q",
    ),
    createMockSong(
      ++positionFrance,
      "Flowers",
      "Miley Cyrus",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2IGMVunIBsBLtEQyoI1Mu7",
      "preview_url_18",
      "2IGMVunIBsBLtEQyoI1Mu7",
    ),
  ],
};

const japanChart = {
  country: "Japan",
  songs: [
    createMockSong(
      ++positionJapan,
      "Idol",
      "YOASOBI",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1A6j5k3ZfTz8j7d4PJc5P5",
      "preview_url_19",
      "1A6j5k3ZfTz8j7d4PJc5P5",
    ),
    createMockSong(
      ++positionJapan,
      "KICK BACK",
      "Kenshi Yonezu",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/3khEEPRyBeOUabbmOPJzAG",
      "preview_url_20",
      "1ie6m8u6J1k6g2g3G3G3G3",
    ),
    createMockSong(
      ++positionJapan,
      "Subtitle",
      "Official HIGE DANdism",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/11C4y2Yz1XbHmaQkgO7FAC",
      "preview_url_21",
      "11C4y2Yz1XbHmaQkgO7FAC",
    ),
  ],
};

const indiaChart = {
  country: "India",
  songs: [
    createMockSong(
      ++positionIndia,
      "Maan Meri Jaan",
      "King",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2B5uhL8e3iJj6o8t5Q6h5T",
      "preview_url_22",
      "2B5uhL8e3iJj6o8t5Q6h5T",
    ),
    createMockSong(
      ++positionIndia,
      "Apna Bana Le",
      "Arijit Singh",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1xs8bOvm3IzEYmcLJVOc34",
      "preview_url_23",
      "1xs8bOvm3IzEYmcLJVOc34",
    ),
    createMockSong(
      ++positionIndia,
      "Kesariya",
      "Pritam, Arijit Singh",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/26b3oVLrRUaaybJulow9kz",
      "preview_url_24",
      "26b3oVLrRUaaybJulow9kz",
    ),
  ],
};

const brazilChart = {
  country: "Brazil",
  songs: [
    createMockSong(
      ++positionBrazil,
      "Novidade na Área",
      "MC Livinho",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/0Qzzd5f0tQ8p5x5z5J5J5J",
      "preview_url_25",
      "0Qzzd5f0tQ8p5x5z5J5J5J",
    ),
    createMockSong(
      ++positionBrazil,
      "Nosso Quadro",
      "Ana Castela",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/3Qh7L5Wp1Z7B7k7J5J5J5J",
      "preview_url_26",
      "3Qh7L5Wp1Z7B7k7J5J5J5J",
    ),
    createMockSong(
      ++positionBrazil,
      "Dengo",
      "João Gomes",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/5K4p31p6K8r0F4YdFcQ4fG",
      "preview_url_27",
      "5K4p31p6K8r0F4YdFcQ4fG",
    ),
  ],
};

const southAfricaChart = {
  country: "South Africa",
  songs: [
    createMockSong(
      ++positionSouthAfrica,
      "Mama",
      "K.O, Nandi Madida",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/7K3BhSpAxZBznislvUMVtn",
      "preview_url_28",
      "7K3BhSpAxZBznislvUMVtn",
    ),
    createMockSong(
      ++positionSouthAfrica,
      "Sukakude",
      "Kelvin Momo, Babalwa M, Sjava",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/1Lo0QY9cvc8sUB2vnIOxDT",
      "preview_url_29",
      "1Lo0QY9cvc8sUB2vnIOxDT",
    ),
    createMockSong(
      ++positionSouthAfrica,
      "Mnike",
      "Tyler ICU, Tumelo.za, DJ Maphorisa",
      ArtistImg,
      ArtistImg,
      "https://open.spotify.com/track/2FDTHlrBguDzQkp7PVj16Q",
      "preview_url_30",
      "2FDTHlrBguDzQkp7PVj16Q",
    ),
  ],
};

// Large array to store all country chart objects
const mockChartsArray = [
  usChart,
  ukChart,
  canadaChart,
  australiaChart,
  germanyChart,
  franceChart,
  japanChart,
  indiaChart,
  brazilChart,
  southAfricaChart,
];

// Function to get charts by country name
export default function getMockCountryCharts(country) {
  let foundChart;
  if (country) {
    foundChart = mockChartsArray.find((chart) => chart.country === country);
  }
  const chartSongs = foundChart ? foundChart.songs : [];

  return chartSongs;
}
