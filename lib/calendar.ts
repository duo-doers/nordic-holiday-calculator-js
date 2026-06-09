import * as dateUtils from "./date-utils";
import * as yearFactory from "./year-factory";
import { Holiday } from "./year-factory";

interface CalendarState {
  MAX_HOLIDAYS: number;
  y: number;
  m: number;
  d: number;
  year: ReturnType<typeof yearFactory.get>;
  next(count?: number, includeWeekends?: boolean): Holiday[];
  byYear(year: number, includeWeekends?: boolean): Holiday[];
  byMonth(month: number, year: number, includeWeekends?: boolean): Holiday[];
}

const calendar: CalendarState = {
  MAX_HOLIDAYS: 100,
  y: 0,
  m: 0,
  d: 0,
  year: null as any,

  next(count?: number, includeWeekends?: boolean): Holiday[] {
    initialize();

    count = count || 3;
    includeWeekends = includeWeekends || false;

    const holidays: Holiday[] = [];

    if (count > this.MAX_HOLIDAYS) {
      throw Error(
        "Cannot request more than {MAX_HOLIDAYS} holidays at once.".replace(
          "{MAX HOLIDAYS}",
          String(this.MAX_HOLIDAYS),
        ),
      );
    }

    function collectHolidays() {
      if (typeof calendar.year.holidays[calendar.m] !== "undefined") {
        calendar.year.holidays[calendar.m].forEach(function (holiday) {
          if (holidays.length < count! && holiday.day >= calendar.d) {
            holidays.push(holiday);
          }
        });
      }
    }

    while (holidays.length < count) {
      if (!includeWeekends) {
        this.year.discardWeekends();
      }

      collectHolidays();

      if (holidays.length < count) {
        nextMonth();
      }
    }

    return holidays;
  },

  byYear(year: number, includeWeekends?: boolean): Holiday[] {
    initialize(year);

    includeWeekends = includeWeekends || false;

    const holidays: Holiday[] = [];

    if (!includeWeekends) {
      this.year.discardWeekends();
    }

    Object.keys(this.year.holidays).forEach(function (month) {
      calendar.year.holidays[Number(month)].forEach(function (holiday) {
        holidays.push(holiday);
      });
    });

    return holidays;
  },

  byMonth(month: number, year: number, includeWeekends?: boolean): Holiday[] {
    initialize(year, month);

    includeWeekends = includeWeekends || false;

    if (!month || !year) {
      throw Error("Month or year missing.");
    }

    const holidays: Holiday[] = [];

    if (!includeWeekends) {
      this.year.discardWeekends();
    }

    if (typeof this.year.holidays[month] !== "undefined") {
      this.year.holidays[month].forEach(function (holiday) {
        holidays.push(holiday);
      });
    }

    return holidays;
  },
};

function initialize(y?: number, m?: number, d?: number): void {
  const today = dateUtils.today();
  const thisDay = dateUtils.getDay(today);
  const thisMonth = dateUtils.getMonth(today);
  const thisYear = dateUtils.getYear(today);

  calendar.y = y || thisYear;
  calendar.m = m || thisMonth;
  calendar.d = d || thisDay;

  calendar.year = yearFactory.get(calendar.y);
}

function nextMonth(): void {
  if (calendar.m === 12) {
    calendar.m = 1;
    calendar.y += 1;
    calendar.d = 1;
  } else {
    calendar.m += 1;
    calendar.d = 1;
  }

  calendar.year = yearFactory.get(calendar.y);
}

export const next = (count?: number, includeWeekends?: boolean) =>
  calendar.next(count, includeWeekends);
export const byYear = (year: number, includeWeekends?: boolean) =>
  calendar.byYear(year, includeWeekends);
export const byMonth = (
  month: number,
  year: number,
  includeWeekends?: boolean,
) => calendar.byMonth(month, year, includeWeekends);
