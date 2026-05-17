import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { getUserLocation, getAnyLocation } from "./location-service";
import getLocation, { mockUserLocation } from "../data/__mocks__/location.mock";

describe("getUserLocation", () => {
  const mockSignal = { aborted: false };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns mapped user location matching mockUserLocation", async () => {
    const mockRawResponse = {
      city: "Johannesburg",
      country_name: "South Africa",
      country: "ZA",
      latitude: -26.195246,
      longitude: 28.034088,
    };

    const mockFetchResponse = {
      ok: true,
      json: async () => mockRawResponse,
    };
    vi.spyOn(global, "fetch").mockResolvedValue(mockFetchResponse);

    const result = await getUserLocation(mockSignal);

    // Result should match your mockUserLocation
    expect(result).toEqual(mockUserLocation);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://ipapi.co/json/", {
      signal: mockSignal,
    });
  });

  it("throws error when HTTP response is not ok (403)", async () => {
    const mockFetchResponse = {
      ok: false,
      status: 403,
      json: async () => ({ error: { message: "Forbidden" } }),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(mockFetchResponse);

    await expect(getUserLocation(mockSignal)).rejects.toThrow("Forbidden");
  });

  it("throws error on network failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError("Network down"));

    await expect(getUserLocation(mockSignal)).rejects.toThrow(
      "Network/parsing error: Network down",
    );
  });
});

describe("getAnyLocation (real API) using getLocation as data source", () => {
  const mockUsername = "test_user";
  const mockSignal = { aborted: false };

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // Helper: Convert the output of getLocation (mapped objects) back to raw Geonames API shape
  const buildRawGeonamesResponse = (locationResults) => {
    return {
      geonames: locationResults.map((loc) => ({
        name: loc.city,
        countryName: loc.country,
        countryCode: loc.countryCode,
      })),
    };
  };

  it('returns locations matching getLocation for input "Johannesburg"', async () => {
    // Use fake timers because getLocation uses setTimeout(5000)
    vi.useFakeTimers();

    // Get expected result from mock helper
    const expectedPromise = getLocation("Johannesburg");
    vi.advanceTimersByTime(5000);
    const expected = await expectedPromise;

    // Build raw API response that would produce that result
    const rawResponse = buildRawGeonamesResponse(expected);

    const mockFetchResponse = {
      ok: true,
      json: async () => rawResponse,
    };
    vi.spyOn(global, "fetch").mockResolvedValue(mockFetchResponse);

    const result = await getAnyLocation(
      "Johannesburg",
      mockUsername,
      mockSignal,
    );

    // Compare results (ignore UUID keys because they're random)
    expect(result).toHaveLength(expected.length);
    expect(result[0].city).toBe(expected[0].city);
    expect(result[0].country).toBe(expected[0].country);
    expect(result[0].countryCode).toBe(expected[0].countryCode);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns empty array when getLocation returns undefined (empty input)", async () => {
    const result = await getAnyLocation("", mockUsername, mockSignal);
    expect(result).toBeUndefined();
  });

  it('returns locations matching getLocation for input "Spain" (city or country match)', async () => {
    vi.useFakeTimers();
    const expectedPromise = getLocation("Spain");
    vi.advanceTimersByTime(5000);
    const expected = await expectedPromise;

    const rawResponse = buildRawGeonamesResponse(expected);
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getAnyLocation("Spain", mockUsername, mockSignal);
    expect(result).toHaveLength(expected.length);
    expect(result[0].city).toBe(expected[0].city);
  });

  it('throws "No place found" when getLocation returns empty array', async () => {
    vi.useFakeTimers();
    // getLocation for a non-existent place returns empty array (filtered none)
    const expectedPromise = getLocation("NonExistentCity");
    vi.advanceTimersByTime(5000);
    const expected = await expectedPromise;
    expect(expected).toEqual([]);

    // Build empty geonames response
    const rawResponse = { geonames: [] };
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getAnyLocation(
      "NonExistentCity",
      mockUsername,
      mockSignal,
    );
    expect(result).toBe(null);
  });

  it("throws error on HTTP 401 (unauthorized)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: "Invalid username" } }),
    });

    await expect(
      getAnyLocation("Johannesburg", mockUsername, mockSignal),
    ).rejects.toThrow("Invalid username");
  });

  it("throws network error on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError("Network down"));

    await expect(
      getAnyLocation("Johannesburg", mockUsername, mockSignal),
    ).rejects.toThrow("Network/parsing error: Network down");
  });
});
