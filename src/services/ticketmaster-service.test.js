import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import { getArtistData, searchEvents } from "./ticketmaster-service";
import {
  getMockArtistData,
  searchMockEvents,
} from "../data/__mocks__/ticketmaster.mock";

describe("getArtistData (real API) using getMockArtistData as data source", () => {
  const mockToken = "fake-token";
  const mockSignal = { aborted: false };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const buildRawResponse = (mappedArtists) => {
    return {
      _embedded: {
        attractions: mappedArtists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          images: artist.image,
          classifications: artist.genre
            ? [{ genre: { name: artist.genre } }]
            : [],
          upcomingEvents: { _total: artist.upcomingEvents },
        })),
      },
    };
  };

  it('returns mapped artists matching getMockArtistData for keyword "Kendrick"', async () => {
    // Start the promise and advance timers
    const mockPromise = getMockArtistData("Kendrick");
    vi.advanceTimersByTime(5000);
    const expectedArtists = await mockPromise;

    const rawResponse = buildRawResponse(expectedArtists);
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getArtistData("Kendrick", mockToken, mockSignal);
    expect(result).toEqual(expectedArtists);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns empty array when getMockArtistData returns empty", async () => {
    const mockPromise = getMockArtistData("NonExistent");
    vi.advanceTimersByTime(5000);
    const expectedArtists = await mockPromise;

    const rawResponse = buildRawResponse(expectedArtists);
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });

    const result = await getArtistData("NonExistent", mockToken, mockSignal);
    expect(result).toEqual(null);
  });

  it("throws error on HTTP 401 (unauthorized)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: "Invalid token" } }),
    });
    await expect(
      getArtistData("Kendrick", mockToken, mockSignal),
    ).rejects.toThrow("Invalid token");
  });

  it("throws error on network failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError("Network down"));
    await expect(
      getArtistData("Kendrick", mockToken, mockSignal),
    ).rejects.toThrow("Network/parsing error: Network down");
  });
});

describe("searchEvents (real API) using searchMockEvents as data source", () => {
  const mockToken = "fake-token";
  const mockSignal = { aborted: false };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const buildRawEventsResponse = (filteredEvents) => {
    return {
      _embedded: {
        events: filteredEvents.map((event) => ({
          dates: { start: { localDate: event.eventDate } },
          _embedded: {
            attractions: [
              {
                id: event.artistId,
                name: event.artistName,
                images: event.artistImage,
                classifications: event.artistGenre
                  ? [{ genre: { name: event.artistGenre } }]
                  : [],
              },
            ],
            venues: [
              {
                name: event.venueName,
                city: { name: event.venueCity },
                state: { stateCode: event.venueState },
                country: {
                  countryCode: event.venueCountry,
                  longitude: event.venueLng,
                },
                location: { latitude: event.venueLat },
              },
            ],
          },
          url: event.ticketUrl,
        })),
      },
    };
  };

  it('returns events matching searchMockEvents with keyword "Kendrick"', async () => {
    const expectedEvents = searchMockEvents(
      null,
      "Kendrick",
      null,
      null,
      null,
      null,
    );
    const rawResponse = buildRawEventsResponse(expectedEvents);
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => rawResponse,
    });
    const result = await searchEvents(
      null,
      "Kendrick",
      null,
      null,
      null,
      null,
      mockSignal,
      mockToken,
    );
    expect(result).toEqual(expectedEvents);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
