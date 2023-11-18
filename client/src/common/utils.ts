import { parse as parseDate } from "date-fns";

export function convertToDateObj(dateStr: string) {
  return parseDate(dateStr, "MM/dd/yyyy HH:mm", new Date());
}
