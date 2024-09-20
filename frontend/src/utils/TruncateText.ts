export default function TruncateText({
  text,
  breakAt,
}: {
  text: string;
  breakAt: number;
}) {
  return text.length > breakAt ? text.slice(0, breakAt) + "..." : text;
}
