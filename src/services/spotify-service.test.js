import { getArtistWithSpotify, getSimilarArtists } from "./spotify-service";
import searchMockArtist from "../data/__mocks__/spotify/spotify-artist-mock";

import { describe, it, expect, vi, afterEach } from "vitest";
import searchMockSimilarArtists from "../data/__mocks__/spotify/spotify-similar-artists.mock";

describe("getArtistWithSpotify (real API) using searchMockArtist as data source", () => {
  const mockToken = "fake-spotify-token";

  const mockSignal = { aborted: false };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Helper: Convert the output of searchMockArtist (our mock object) back to raw Spotify API shape
  const buildRawSpotifyResponse = (mockArtist) => {
    if (!mockArtist) return null;
    return {
      genres: mockArtist.genre ? [mockArtist.genre] : [],
      href: mockArtist.spotifyLink,
      name: mockArtist.artistName,
      id: mockArtist.spotifyArtistId,
      images: { url: mockArtist.artistImage },
    };
  };

  it('returns artist matching searchMockArtist for id "3TVXtAsR1Inumwj472S9r4" (Drake)', async () => {
    const artistId = "3TVXtAsR1Inumwj472S9r4";
    // Get expected result from mock helper
    const expectedArtist = searchMockArtist(artistId);
    // Build raw API response that would produce that result
    const rawResponse = buildRawSpotifyResponse(expectedArtist);

    const mockFetchResponse = {
      ok: true,
      json: async () => rawResponse,
    };
    vi.spyOn(global, "fetch").mockResolvedValue(mockFetchResponse);

    const result = await getArtistWithSpotify(mockToken, artistId, mockSignal);

    expect(result).toEqual(expectedArtist);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/artists/${artistId}`,
      expect.objectContaining({
        headers: { Authorization: `Bearer ${mockToken}` },
        signal: mockSignal,
      }),
    );
  });

  it('returns artist matching searchMockArtist for id "1Xyo4u8uXC1ZmMpatF05PJ" (The Weeknd)', async () => {
    const artistId = "1Xyo4u8uXC1ZmMpatF05PJ";
    const expectedArtist = searchMockArtist(artistId);
    const rawResponse = buildRawSpotifyResponse(expectedArtist);

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getArtistWithSpotify(mockToken, artistId, mockSignal);
    expect(result).toEqual(expectedArtist);
  });

  it("returns null when token is missing", async () => {
    const result = await getArtistWithSpotify(null, "some-id", mockSignal);
    expect(result).toBeNull();
  });

  it("returns null when id is missing", async () => {
    const result = await getArtistWithSpotify(mockToken, null, mockSignal);
    expect(result).toBeNull();
  });

  it("throws error when HTTP response is not ok (401 Unauthorized)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: "Invalid token" } }),
    });

    await expect(
      getArtistWithSpotify(mockToken, "some-id", mockSignal),
    ).rejects.toThrow("Invalid token");
  });

  it("throws error when HTTP response is not ok (404 Not Found)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: { message: "Artist not found" } }),
    });

    await expect(
      getArtistWithSpotify(mockToken, "unknown-id", mockSignal),
    ).rejects.toThrow("Artist not found");
  });

  it("throws network error on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError("Network down"));

    await expect(
      getArtistWithSpotify(mockToken, "some-id", mockSignal),
    ).rejects.toThrow("Network/parsing error: Network down");
  });
});

describe("getSimilarArtists (real API) using searchMockSimilarArtists as data source", () => {
  const mockToken = "fake-spotify-token";
  const mockSignal = { aborted: false };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Helper: Convert the output of searchMockSimilarArtists back to raw Spotify API shape
  const buildRawSimilarResponse = (expectedSimilarArtists) => ({
    artists: expectedSimilarArtists.map((artist) => ({
      href: artist.spotifyLink,
      name: artist.artistName,
      id: artist.spotifyArtistId,
      images: artist.artistImage, // ✅ already an array of image objects
    })),
  });

  it('returns similar artists matching searchMockSimilarArtists for artist id "3TVXtAsR1Inumwj472S9r4" (Drake)', async () => {
    const artistId = "1Xyo4u8uXC1ZmMpatF05PJ";

    const expected = searchMockSimilarArtists(artistId);
    // Build raw API response that would produce that result
    const rawResponse = buildRawSimilarResponse(expected);

    const mockFetchResponse = {
      ok: true,
      json: async () => rawResponse,
    };
    vi.spyOn(global, "fetch").mockResolvedValue(mockFetchResponse);

    const result = await getSimilarArtists(artistId, mockToken, mockSignal);

    expect(result).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('returns similar artists matching searchMockSimilarArtists for "1Xyo4u8uXC1ZmMpatF05PJ" (The Weeknd)', async () => {
    const artistId = "1Xyo4u8uXC1ZmMpatF05PJ";
    const expected = searchMockSimilarArtists(artistId);
    const rawResponse = buildRawSimilarResponse(expected);

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getSimilarArtists(artistId, mockToken, mockSignal);
    expect(result).toEqual(expected);
  });

  it("returns empty array when searchMockSimilarArtists returns empty array", async () => {
    const artistId = "unknown-id";

    const expected = [];
    const rawResponse = { artists: [] };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getSimilarArtists(mockToken, artistId, mockSignal);
    expect(result).toEqual(expected);
  });

  it("returns null when token is missing", async () => {
    const result = await getSimilarArtists(null, "some-id", mockSignal);
    expect(result).toBeNull();
  });

  it("returns null when artistId is missing", async () => {
    const result = await getSimilarArtists(mockToken, null, mockSignal);
    expect(result).toBeNull();
  });

  it("throws error on HTTP 401 (unauthorized)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: "Invalid token" } }),
    });

    await expect(
      getSimilarArtists(mockToken, "some-id", mockSignal),
    ).rejects.toThrow("Invalid token");
  });

  it("throws error on HTTP 404 (not found)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: { message: "Artist not found" } }),
    });

    await expect(
      getSimilarArtists(mockToken, "unknown-id", mockSignal),
    ).rejects.toThrow("Artist not found");
  });

  it("throws network error on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError("Network down"));

    await expect(
      getSimilarArtists(mockToken, "some-id", mockSignal),
    ).rejects.toThrow("Network/parsing error: Network down");
  });
});
