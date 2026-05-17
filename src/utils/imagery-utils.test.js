import { describe, it, expect } from "vitest";
import {
  generateFallBackImage,
  generateSrcset,
  generateSizes,
} from "./imagery-utils";
import { mockDrakeAlbumCover } from "../data/__mocks__/images.mock";

describe("generateFallBackImage", () => {
  it("returns the url of the largest image by width", () => {
    const result = generateFallBackImage(mockDrakeAlbumCover);
    expect(result).toBe(mockDrakeAlbumCover[0].url);
  });

  it("works with unsorted input", () => {
    const unsorted = [
      mockDrakeAlbumCover[1],
      mockDrakeAlbumCover[2],
      mockDrakeAlbumCover[0],
    ];
    const result = generateFallBackImage(unsorted);
    expect(result).toBe(mockDrakeAlbumCover[0].url);
  });

  it("works with only one image", () => {
    const single = [mockDrakeAlbumCover[2]];
    expect(generateFallBackImage(single)).toBe(mockDrakeAlbumCover[2].url);
  });
});

describe("generateSrcset", () => {
  it("returns correct srcset string", () => {
    const result = generateSrcset(mockDrakeAlbumCover);

    expect(result).toBe(
      `${mockDrakeAlbumCover[2].url} 64w, ${mockDrakeAlbumCover[1].url} 300w, ${mockDrakeAlbumCover[0].url} 640w`,
    );
  });

  it("sorts by width before generating", () => {
    const unsorted = [
      mockDrakeAlbumCover[0],
      mockDrakeAlbumCover[2],
      mockDrakeAlbumCover[1],
    ];
    const result = generateSrcset(unsorted);
    expect(result).toBe(
      `${mockDrakeAlbumCover[2].url} 64w, ${mockDrakeAlbumCover[1].url} 300w, ${mockDrakeAlbumCover[0].url} 640w`,
    );
  });

  it("does not mutate the original array", () => {
    const original = [...mockDrakeAlbumCover];
    generateSrcset(mockDrakeAlbumCover);
    expect(mockDrakeAlbumCover).toEqual(original);
  });
});

describe("generateSizes", () => {
  it("returns correct sizes string for three images", () => {
    const result = generateSizes(mockDrakeAlbumCover);

    expect(result).toBe(
      "(max-width: 128px) 64px, (max-width: 640px) 300px, 640px",
    );
  });

  it("works with two images (medium falls back to smallest)", () => {
    const twoImages = [mockDrakeAlbumCover[2], mockDrakeAlbumCover[0]]; // widths 64 and 640
    const result = generateSizes(twoImages);

    expect(result).toBe(
      "(max-width: 128px) 64px, (max-width: 640px) 64px, 640px",
    );
  });

  it("works with one image", () => {
    const oneImage = [mockDrakeAlbumCover[1]];
    const result = generateSizes(oneImage);

    expect(result).toBe(
      "(max-width: 600px) 300px, (max-width: 300px) 300px, 300px",
    );
  });

  it("does not mutate original array", () => {
    const original = [...mockDrakeAlbumCover];
    generateSizes(mockDrakeAlbumCover);
    expect(mockDrakeAlbumCover).toEqual(original);
  });
});
