//This will generate value for the size attribute for an image element
export default function generateSizes(images) {
  const sorted = [...images].sort((a, b) => a.width - b.width);
  const smallest = sorted[0].width;
  const medium = sorted[1]?.width || smallest;
  const largest = sorted[sorted.length - 1].width;

  return `(max-width: ${smallest * 2}px) ${smallest}px, (max-width: ${largest}px) ${medium}px, ${largest}px`;
}
