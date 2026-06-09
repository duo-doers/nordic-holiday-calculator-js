import * as dateUtils from "./date-utils";

export interface Holiday {
  year: number;
  month: number;
  day: number;
  description: string;
}

class Year {
  year: number;
  holidays: Record<number, Holiday[]>;

  constructor(year: number) {
    if (year > 0) {
      this.year = year;
      this.holidays = {};
      this.loadHolidays();
    } else {
      throw Error("Invalid year: " + year);
    }
  }

  loadHolidays(): void {
    this.addHoliday(dateUtils.createDate(this.year, 1, 1), "New Year's Day");
    this.addHoliday(dateUtils.createDate(this.year, 1, 6), "Epiphany");
    this.addHoliday(dateUtils.goodFriday(this.year), "Good Friday");
    this.addHoliday(dateUtils.easterSunday(this.year), "Easter Sunday");
    this.addHoliday(dateUtils.easterMonday(this.year), "Easter Monday");
    this.addHoliday(dateUtils.createDate(this.year, 5, 1), "May Day");
    this.addHoliday(dateUtils.ascensionDay(this.year), "Ascension Day");
    this.addHoliday(dateUtils.pentecost(this.year), "Pentecost");
    this.addHoliday(dateUtils.midsummerEve(this.year), "Midsummer Eve");
    this.addHoliday(dateUtils.midsummerDay(this.year), "Midsummer Day");
    this.addHoliday(dateUtils.allSaintsDay(this.year), "All Saints' Day");
    this.addHoliday(dateUtils.createDate(this.year, 12, 6), "Independence Day");
    this.addHoliday(dateUtils.createDate(this.year, 12, 24), "Christmas Eve");
    this.addHoliday(dateUtils.createDate(this.year, 12, 25), "Christmas Day");
    this.addHoliday(
      dateUtils.createDate(this.year, 12, 26),
      "St. Stephen's Day",
    );
  }

  discardWeekends(): void {
    const filtered: Record<number, Holiday[]> = {};

    Object.keys(this.holidays).forEach((month) => {
      const m = Number(month);
      if (this.holidays[m].length > 0) {
        Object.keys(this.holidays[m]).forEach((i) => {
          const holiday = this.holidays[m][Number(i)];
          if (!dateUtils.isWeekend(holiday.year, holiday.month, holiday.day)) {
            if (typeof filtered[m] === "undefined") {
              filtered[m] = [];
            }
            filtered[m].push(holiday);
          }
        });
      }
    });

    this.holidays = filtered;
  }

  addHoliday(date: Date, description: string): void {
    const month = dateUtils.getMonth(date);
    const year = dateUtils.getYear(date);
    const day = dateUtils.getDay(date);
    const holiday: Holiday = { year, month, day, description };

    if (typeof this.holidays[month] === "undefined") {
      this.holidays[month] = [];
    }

    this.holidays[month].push(holiday);
  }
}

export function get(year: number): Year {
  return new Year(year);
}
