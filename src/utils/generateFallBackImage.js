export default function generateFallBackImage(images) {
  const imagery = images.sort((a, b) => a.width - b.width);
  return imagery[imagery.length - 1].url;
}
