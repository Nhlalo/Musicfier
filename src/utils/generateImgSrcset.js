//This will generate value for the Srcset attribute for an image element

export default function generateSrcset(images) {
  const sorted = [...images].sort((a, b) => a.width - b.width);

  return sorted.map((img) => `${img.url} ${img.width}w`).join(", ");
}
