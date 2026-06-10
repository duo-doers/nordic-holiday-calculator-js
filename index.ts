import * as calendar from "./lib/calendar";
import * as finder from "./lib/finder";

export type { Holiday } from "./lib/year-factory";

export type Country = "FI" | "SE" | "NO" | "DK" | "IS";

export function next(
  country: Country,
  count?: number,
  includeWeekends?: boolean,
) {
  return calendar.next(country, count, includeWeekends);
}

export function year(
  year: number,
  country: Country,
  includeWeekends?: boolean,
) {
  return calendar.byYear(year, country, includeWeekends);
}

export function month(
  month: number,
  year: number,
  country: Country,
  includeWeekends?: boolean,
) {
  return calendar.byMonth(month, year, country, includeWeekends);
}

export function after(
  month: number,
  year: number,
  index: number,
  country: Country,
) {
  return finder.after(month, year, index, country);
}

export function before(
  month: number,
  year: number,
  index: number,
  country: Country,
) {
  return finder.before(month, year, index, country);
}
