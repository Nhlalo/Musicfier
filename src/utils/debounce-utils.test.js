import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import debounce from "./debounce-utils";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("calls the function after the wait time", () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("resets the timer if called again before wait time ends", () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced(); // call again
    vi.advanceTimersByTime(50);
    expect(func).not.toHaveBeenCalled(); // still not called

    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("passes the latest arguments to the function", () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced("hello");
    debounced("world");
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith("world");
  });
});
