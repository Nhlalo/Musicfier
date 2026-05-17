import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getTodayDate,
  getTomorrowDate,
  getDayAfterTomorrowDate,
  getThisWeekendDates,
  formatDate,
} from "./date-utils";

afterEach(() => {
  vi.useRealTimers();
});

describe("date utilities (with mocked system time)", () => {
  it("getTodayDate returns current date in YYYY-MM-DD", () => {
    const mockDate = new Date("2025-03-14T12:00:00Z");
    vi.setSystemTime(mockDate);
    expect(getTodayDate()).toBe("2025-03-14");
  });

  it("getTomorrowDate returns date of tomorrow", () => {
    vi.setSystemTime(new Date("2025-03-14T12:00:00Z"));
    expect(getTomorrowDate()).toBe("2025-03-15");
  });

  it("getDayAfterTomorrowDate returns date two days from now", () => {
    vi.setSystemTime(new Date("2025-03-14T12:00:00Z"));
    expect(getDayAfterTomorrowDate()).toBe("2025-03-16");
  });

  describe("getThisWeekendDates", () => {
    it("when today is Monday, weekend is Friday to Sunday of same week", () => {
      // Monday, March 10, 2025
      vi.setSystemTime(new Date("2025-03-10T12:00:00Z"));
      const weekend = getThisWeekendDates();
      expect(weekend).toEqual({
        start: "2025-03-14", // Friday
        end: "2025-03-16", // Sunday
      });
    });

    it("when today is Friday, weekend starts today (Friday) and ends Sunday", () => {
      vi.setSystemTime(new Date("2025-03-14T12:00:00Z")); // Friday
      const weekend = getThisWeekendDates();
      expect(weekend).toEqual({
        start: "2025-03-14",
        end: "2025-03-16",
      });
    });

    it("when today is Saturday, weekend is Friday of next week to Sunday after next", () => {
      vi.setSystemTime(new Date("2025-03-15T12:00:00Z")); // Saturday
      const weekend = getThisWeekendDates();

      expect(weekend.start).toBe("2025-03-21"); // next Friday
      expect(weekend.end).toBe("2025-03-23"); // next Sunday
    });

    it("when today is Sunday, weekend is Friday of same week? Let’s see: Sunday(0) <=5 => daysUntilFriday = 5-0=5 -> Friday is 5 days later (Friday). Sunday = Friday+2 = Sunday of same week? Actually same week Sunday? Wait, if today is Sunday, Friday is 5 days later (Friday). Then Sunday is 2 days after Friday (Sunday). That is the same week? Yes, Sunday is the weekend end. So start = Friday, end = Sunday of same week.", () => {
      vi.setSystemTime(new Date("2025-03-09T12:00:00Z")); // Sunday
      const weekend = getThisWeekendDates();
      expect(weekend).toEqual({
        start: "2025-03-14", // Friday of that week
        end: "2025-03-16", // Sunday of that week
      });
    });
  });
});

describe("formatDate (pure function)", () => {
  it("formats a valid date string into readable format", () => {
    expect(formatDate("2025-03-14")).toBe("Friday, March 14, 2025");
  });

  it("handles different date strings", () => {
    expect(formatDate("2024-12-25")).toBe("Wednesday, December 25, 2024");
  });
});
