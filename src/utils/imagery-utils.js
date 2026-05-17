function generateFallBackImage(images) {
  if (!Array.isArray(images)) return;
  const imagery = images.sort((a, b) => a.width - b.width);
  return imagery[imagery.length - 1].url;
}

//This will generate value for the Srcset attribute for an image element
function generateSrcset(images) {
  if (!Array.isArray(images)) return;
  const sorted = [...images].sort((a, b) => a.width - b.width);

  return sorted.map((img) => `${img.url} ${img.width}w`).join(", ");
}

//This will generate value for the size attribute for an image element
function generateSizes(images) {
  if (!Array.isArray(images)) return;
  const sorted = [...images].sort((a, b) => a.width - b.width);
  const smallest = sorted[0].width;
  const largest = sorted[sorted.length - 1].width;

  // For exactly two images, use smallest as the "medium" fallback
  const medium = sorted.length === 2 ? smallest : sorted[1]?.width || smallest;

  return `(max-width: ${smallest * 2}px) ${smallest}px, (max-width: ${largest}px) ${medium}px, ${largest}px`;
}

export { generateFallBackImage, generateSizes, generateSrcset };
