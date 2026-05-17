import { mockDrakeImages } from "./images.mock";
export function mockGlobalTopTracks() {
  return {
    tracks: {
      track: [
        {
          name: "Blinding Lights",
          images: mockDrakeImages,
          artist: { name: "The Weeknd" },
        },
        {
          name: "Save Your Tears",
          images: mockDrakeImages,
          artist: { name: "The Weeknd" },
        },
      ],
    },
  };
}
