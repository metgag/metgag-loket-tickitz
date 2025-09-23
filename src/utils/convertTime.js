import { format, parse } from "date-fns";

export function convertTime(timeStr) {
  const parsed = parse(timeStr, "HH:mm:ss.SSSSSS", new Date());
  return format(parsed, "hh:mm a");
}