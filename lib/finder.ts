import * as calendar from "./calendar";
import { Holiday } from "./year-factory";
import type { Country } from "../index";

export function after(
  month: number,
  year: number,
  index: number,
  country: Country,
): Holiday {
  const currentHolidays = calendar.byMonth(month, year, country);
  const nextIndex = index + 1;

  if (currentHolidays[nextIndex]) {
    return currentHolidays[nextIndex];
  }

  let nextHoliday: Holiday | undefined;
  const nextDate = { month, year };

  while (!nextHoliday) {
    if (nextDate.month === 12) {
      nextDate.month = 1;
      nextDate.year += 1;
    } else {
      nextDate.month += 1;
    }

    const nextHolidays = calendar.byMonth(
      nextDate.month,
      nextDate.year,
      country,
    );

    if (nextHolidays[0]) {
      nextHoliday = nextHolidays[0];
    }
  }

  return nextHoliday;
}

export function before(
  month: number,
  year: number,
  index: number,
  country: Country,
): Holiday {
  const currentHolidays = calendar.byMonth(month, year, country);
  const previousIndex = index - 1;

  if (currentHolidays[previousIndex]) {
    return currentHolidays[previousIndex];
  }

  let previousHoliday: Holiday | undefined;
  const previousDate = { month, year };

  while (!previousHoliday) {
    if (previousDate.month === 1) {
      previousDate.month = 12;
      previousDate.year -= 1;
    } else {
      previousDate.month -= 1;
    }

    const previousHolidays = calendar.byMonth(
      previousDate.month,
      previousDate.year,
      country,
    );

    if (previousHolidays[0]) {
      previousHoliday = previousHolidays[0];
    }
  }

  return previousHoliday;
}
