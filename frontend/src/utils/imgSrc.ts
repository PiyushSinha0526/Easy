export default function getFirstImageSrc(content: string): string | null {
  if (!content) return null;
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  
  const firstImg = doc.querySelector("img");
  if (firstImg) {
    return firstImg.getAttribute("src");
  }
  return null;
}
