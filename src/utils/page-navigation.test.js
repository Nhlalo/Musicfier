import { describe, it, expect } from "vitest";
import determinePageNavigation from "./page-navigation-utils";

describe("determinePageNavigation", () => {
  const defaultParams = {
    countryCode: "US",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    userCity: "New York",
    userCountry: "USA",
  };

  it('returns concerts URL for "concerts" (any case)', () => {
    const result = determinePageNavigation(
      "Concerts",
      defaultParams.countryCode,
      defaultParams.startDate,
      defaultParams.endDate,
      defaultParams.userCity,
      defaultParams.userCountry,
    );
    expect(result).toBe("/concerts/US?sd=2025-03-01&ed=2025-03-31&c=New York");
  });

  it('returns charts URL for "charts" (any case)', () => {
    const result = determinePageNavigation(
      "CHARTS",
      defaultParams.countryCode,
      defaultParams.startDate,
      defaultParams.endDate,
      defaultParams.userCity,
      defaultParams.userCountry,
    );
    expect(result).toBe("/charts/top50/USA");
  });

  it('returns my music URL for "my music" (any case)', () => {
    const result = determinePageNavigation(
      "My Music",
      defaultParams.countryCode,
      defaultParams.startDate,
      defaultParams.endDate,
      defaultParams.userCity,
      defaultParams.userCountry,
    );
    expect(result).toBe("/mymusic");
  });

  it("returns null for unknown link name", () => {
    const result = determinePageNavigation(
      "unknown",
      defaultParams.countryCode,
      defaultParams.startDate,
      defaultParams.endDate,
      defaultParams.userCity,
      defaultParams.userCountry,
    );
    expect(result).toBeNull();
  });

  it("uses countryCode in concerts URL", () => {
    const result = determinePageNavigation(
      "concerts",
      "CA",
      "2025-04-01",
      "2025-04-30",
      "Toronto",
      "Canada",
    );
    expect(result).toContain("/concerts/CA?");
    expect(result).toContain("c=Toronto");
  });

  it("uses userCountry in charts URL", () => {
    const result = determinePageNavigation(
      "charts",
      "FR",
      "2025-05-01",
      "2025-05-31",
      "Paris",
      "France",
    );
    expect(result).toBe("/charts/top50/France");
  });
});
