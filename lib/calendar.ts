import * as dateUtils from "./date-utils";
import * as yearFactory from "./year-factory";
import { Holiday } from "./year-factory";
import type { Country } from "../index";

const MAX_HOLIDAYS = 100;

interface Context {
  year: number;
  month: number;
  day: number;
  country: Country;
  holidays: ReturnType<typeof yearFactory.get>;
}

interface ContextOptions {
  year?: number;
  month?: number;
  day?: number;
  country: Country;
}

function createContext({ year, month, day, country }: ContextOptions): Context {
  const today = dateUtils.today();
  const resolvedYear = year || dateUtils.getYear(today);
  const resolvedMonth = month || dateUtils.getMonth(today);
  const resolvedDay = day || dateUtils.getDay(today);
  return {
    year: resolvedYear,
    month: resolvedMonth,
    day: resolvedDay,
    country,
    holidays: yearFactory.get(resolvedYear, country),
  };
}

function advanceMonth(ctx: Context): Context {
  const year = ctx.month === 12 ? ctx.year + 1 : ctx.year;
  const month = ctx.month === 12 ? 1 : ctx.month + 1;
  return {
    ...ctx,
    year,
    month,
    day: 1,
    holidays: yearFactory.get(year, ctx.country),
  };
}

export function next(
  country: Country,
  count?: number,
  includeWeekends?: boolean,
): Holiday[] {
  let ctx = createContext({ country });
  const limit = count || 3;

  if (limit > MAX_HOLIDAYS) {
    throw Error(`Cannot request more than ${MAX_HOLIDAYS} holidays at once.`);
  }

  const holidays: Holiday[] = [];

  while (holidays.length < limit) {
    if (!includeWeekends) {
      ctx.holidays.discardWeekends();
    }

    if (ctx.holidays.holidays[ctx.month] !== undefined) {
      for (const holiday of ctx.holidays.holidays[ctx.month]) {
        if (holidays.length < limit && holiday.day >= ctx.day) {
          holidays.push(holiday);
        }
      }
    }

    if (holidays.length < limit) {
      ctx = advanceMonth(ctx);
    }
  }

  return holidays;
}

export function byYear(
  year: number,
  country: Country,
  includeWeekends?: boolean,
): Holiday[] {
  const ctx = createContext({ year, country });

  if (!includeWeekends) {
    ctx.holidays.discardWeekends();
  }

  const holidays: Holiday[] = [];
  Object.keys(ctx.holidays.holidays).forEach((month) => {
    ctx.holidays.holidays[Number(month)].forEach((holiday) =>
      holidays.push(holiday),
    );
  });
  return holidays;
}

export function byMonth(
  month: number,
  year: number,
  country: Country,
  includeWeekends?: boolean,
): Holiday[] {
  if (!month || !year) {
    throw Error("Month or year missing.");
  }

  const ctx = createContext({ year, month, country });

  if (!includeWeekends) {
    ctx.holidays.discardWeekends();
  }

  return ctx.holidays.holidays[month] ?? [];
}
