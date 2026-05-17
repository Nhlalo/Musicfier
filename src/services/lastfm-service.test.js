import { describe, it, expect, vi, afterEach } from "vitest";
import { mockGlobalTopTracks } from "../data/__mocks__/lastfm.mock";
import { getGlobalTopTracks } from "./lastfm-service";
import { mockDrakeImages } from "../data/__mocks__/images.mock";

describe("getGlobalTopTracks", () => {
  afterEach(() => vi.restoreAllMocks());
  const mockSignal = { aborted: false };
  const mockApiKey = "test_api_key";

  it("returns mapped tracks matching mockGlobalTopTracks", async () => {
    const mockResponse = mockGlobalTopTracks();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getGlobalTopTracks(mockApiKey, 2, mockSignal);
    expect(result).toEqual([
      {
        position: 1,
        songName: "Blinding Lights",
        artistName: "The Weeknd",
        artistImage: mockDrakeImages,
        songCover: null,
        spotifyLink: null,
        previewUrl: null,
      },
      {
        position: 2,
        songName: "Save Your Tears",
        artistName: "The Weeknd",
        artistImage: mockDrakeImages,
        songCover: null,
        spotifyLink: null,
        previewUrl: null,
      },
    ]);
  });
});
