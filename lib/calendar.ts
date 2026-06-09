import * as dateUtils from "./date-utils";
import * as yearFactory from "./year-factory";
import { Holiday } from "./year-factory";
import type { Country } from "../index";

const MAX_HOLIDAYS = 100;

interface Context {
  y: number;
  m: number;
  d: number;
  country: Country;
  year: ReturnType<typeof yearFactory.get>;
}

function createContext(
  y: number | undefined,
  m: number | undefined,
  d: number | undefined,
  country: Country,
): Context {
  const today = dateUtils.today();
  const resolvedY = y || dateUtils.getYear(today);
  const resolvedM = m || dateUtils.getMonth(today);
  const resolvedD = d || dateUtils.getDay(today);
  return {
    y: resolvedY,
    m: resolvedM,
    d: resolvedD,
    country,
    year: yearFactory.get(resolvedY, country),
  };
}

function advanceMonth(ctx: Context): Context {
  const y = ctx.m === 12 ? ctx.y + 1 : ctx.y;
  const m = ctx.m === 12 ? 1 : ctx.m + 1;
  return { ...ctx, y, m, d: 1, year: yearFactory.get(y, ctx.country) };
}

export function next(
  country: Country,
  count?: number,
  includeWeekends?: boolean,
): Holiday[] {
  let ctx = createContext(undefined, undefined, undefined, country);
  const limit = count || 3;

  if (limit > MAX_HOLIDAYS) {
    throw Error(`Cannot request more than ${MAX_HOLIDAYS} holidays at once.`);
  }

  const holidays: Holiday[] = [];

  while (holidays.length < limit) {
    if (!includeWeekends) {
      ctx.year.discardWeekends();
    }

    if (ctx.year.holidays[ctx.m] !== undefined) {
      for (const holiday of ctx.year.holidays[ctx.m]) {
        if (holidays.length < limit && holiday.day >= ctx.d) {
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
  const ctx = createContext(year, undefined, undefined, country);

  if (!includeWeekends) {
    ctx.year.discardWeekends();
  }

  const holidays: Holiday[] = [];
  Object.keys(ctx.year.holidays).forEach((month) => {
    ctx.year.holidays[Number(month)].forEach((holiday) =>
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

  const ctx = createContext(year, month, undefined, country);

  if (!includeWeekends) {
    ctx.year.discardWeekends();
  }

  return ctx.year.holidays[month] ?? [];
}
