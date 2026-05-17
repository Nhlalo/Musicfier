import { describe, it, expect, vi } from "vitest";
import setBTNStatus from "./button-status-utils";

describe("setBTNStatus", () => {
  it('calls changeBTNStatus with (true, false, false, false) for "Top 50"', () => {
    const mockCallback = vi.fn();
    setBTNStatus("Top 50", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(true, false, false, false);
  });

  it('calls changeBTNStatus with (true, false, false, false) for "top50"', () => {
    const mockCallback = vi.fn();
    setBTNStatus("top50", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(true, false, false, false);
  });

  it('calls changeBTNStatus with (false, true, false, false) for "Viral"', () => {
    const mockCallback = vi.fn();
    setBTNStatus("Viral", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(false, true, false, false);
  });

  it('calls changeBTNStatus with (false, true, false, false) for "viral"', () => {
    const mockCallback = vi.fn();
    setBTNStatus("viral", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(false, true, false, false);
  });

  it('calls changeBTNStatus with (false, false, true, false) for "Discovery"', () => {
    const mockCallback = vi.fn();
    setBTNStatus("Discovery", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(false, false, true, false);
  });

  it('calls changeBTNStatus with (false, false, true, false) for "discovery"', () => {
    const mockCallback = vi.fn();
    setBTNStatus("discovery", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(false, false, true, false);
  });

  it("calls changeBTNStatus with (false, false, false, true) for unknown item", () => {
    const mockCallback = vi.fn();
    setBTNStatus("anything else", mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(false, false, false, true);
  });
});
