import { describe, it, expect, vi, afterEach } from "vitest";
import recognizeWithAudD from "./audio-recognition-service";
import findSong from "../data/__mocks__/audio-recogntion.mock";
import { mockDrakeAlbumCover } from "../data/__mocks__/images.mock";

describe("recognizeWithAudD", () => {
  const mockAudioBlob = new Blob(["fake audio"], { type: "audio/webm" });
  const mockApiToken = "test-token";
  const mockSignal = { aborted: false };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns song data when API call succeeds for "Blinding Lights"', async () => {
    const songData = findSong("Blinding Lights");

    const mockResponse = {
      ok: true,
      json: async () => ({
        status: "success",
        result: {
          artist: songData.artist,
          title: songData.title,
          spotify: {
            album: {
              images: songData.coverUrl,
            },
            id: songData.id,
          },
        },
      }),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const result = await recognizeWithAudD(
      mockAudioBlob,
      mockApiToken,
      mockSignal,
    );

    expect(result).toEqual({
      artist: "The Weeknd",
      title: "Blinding Lights",
      coverUrl: mockDrakeAlbumCover,
      id: "1Xyo4u8uXC1ZmMpatF05PJ",
    });
  });

  it('returns song data for "Shape of You"', async () => {
    const songData = await findSong("Shape of You");

    const mockResponse = {
      ok: true,
      json: async () => ({
        status: "success",
        result: {
          artist: songData.artist,
          title: songData.title,
          spotify: {
            album: {
              images: songData.coverUrl,
            },
            id: songData.id,
          },
        },
      }),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const result = await recognizeWithAudD(
      mockAudioBlob,
      mockApiToken,
      mockSignal,
    );

    expect(result).toEqual({
      artist: "Ed Sheeran",
      title: "Shape of You",
      coverUrl: mockDrakeAlbumCover,
      id: "6eUKZXaKkcviH0Ku9w2n3V",
    });
  });

  it("returns null when song not found", async () => {
    const songData = await findSong("Nonexistent Song");

    const mockResponse = {
      ok: true,
      json: async () => ({
        status: "success",
        result: songData, // will be null
      }),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const result = await recognizeWithAudD(
      mockAudioBlob,
      mockApiToken,
      mockSignal,
    );
    expect(result).toBeNull();
  });

  it("throws error when HTTP response is not ok (401 Unauthorized)", async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: async () => ({ error: { message: "Invalid API token" } }),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    await expect(
      recognizeWithAudD(mockAudioBlob, mockApiToken, mockSignal),
    ).rejects.toThrow("Invalid API token");
  });

  it("throws error when HTTP response is not ok (500 Server Error)", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: async () => ({}),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    await expect(
      recognizeWithAudD(mockAudioBlob, mockApiToken, mockSignal),
    ).rejects.toThrow("HTTP 500");
  });

  it('throws error when API returns status "error"', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        status: "error",
        error: { message: "Audio quality too low" },
      }),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    await expect(
      recognizeWithAudD(mockAudioBlob, mockApiToken, mockSignal),
    ).rejects.toThrow("Audio quality too low");
  });

  it("throws error when fetch fails (network error)", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    await expect(
      recognizeWithAudD(mockAudioBlob, mockApiToken, mockSignal),
    ).rejects.toThrow("Network/parsing error: Failed to fetch");
  });

  it("throws error when audioBlob is missing", async () => {
    await expect(
      recognizeWithAudD(null, mockApiToken, mockSignal),
    ).rejects.toThrow("Missing required parameters: audioBlob and apiToken");
  });

  it("throws error when apiToken is missing", async () => {
    await expect(
      recognizeWithAudD(mockAudioBlob, null, mockSignal),
    ).rejects.toThrow("Missing required parameters: audioBlob and apiToken");
  });

  it("handles case-insensitive song matching via findSong", async () => {
    const songData = await findSong("blinding lights"); // lowercase

    const mockResponse = {
      ok: true,
      json: async () => ({
        status: "success",
        result: {
          artist: songData.artist,
          title: songData.title,
          spotify: {
            album: {
              images: songData.coverUrl,
            },
            id: songData.id,
          },
        },
      }),
    };

    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const result = await recognizeWithAudD(
      mockAudioBlob,
      mockApiToken,
      mockSignal,
    );

    expect(result.title).toBe("Blinding Lights");
  });
});
