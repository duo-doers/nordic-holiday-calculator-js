import * as calendar from "./lib/calendar";
import * as finder from "./lib/finder";

export type { Holiday } from "./lib/year-factory";

export type Country = "FI" | "SE" | "NO";

function assertSupported(country: Country): void {
  if (country !== "FI") {
    throw new Error(`Country ${country} is not yet implemented.`);
  }
}

export function next(
  count?: number,
  includeWeekends?: boolean,
  country: Country = "FI",
) {
  assertSupported(country);
  return calendar.next(count, includeWeekends);
}

export function year(
  year: number,
  includeWeekends?: boolean,
  country: Country = "FI",
) {
  assertSupported(country);
  return calendar.byYear(year, includeWeekends);
}

export function month(
  month: number,
  year: number,
  includeWeekends?: boolean,
  country: Country = "FI",
) {
  assertSupported(country);
  return calendar.byMonth(month, year, includeWeekends);
}

export function after(
  month: number,
  year: number,
  index: number,
  country: Country = "FI",
) {
  assertSupported(country);
  return finder.after(month, year, index);
}

export function before(
  month: number,
  year: number,
  index: number,
  country: Country = "FI",
) {
  assertSupported(country);
  return finder.before(month, year, index);
}
