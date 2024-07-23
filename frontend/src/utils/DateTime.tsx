import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function formatDateTime(timestamp: string): {
  date: string;
  time: string;
} {
  const date = dayjs(timestamp).format("MMMM D, YYYY");
  const time = dayjs(timestamp).format("hh:mm A");
  return { date, time };
}
