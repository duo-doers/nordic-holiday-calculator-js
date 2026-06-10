import * as dateUtils from "./date-utils";
import type { Country } from "../index";

export interface Holiday {
  year: number;
  month: number;
  day: number;
  description: string;
}

class Year {
  year: number;
  country: Country;
  holidays: Record<number, Holiday[]>;

  constructor(year: number, country: Country) {
    if (year > 0) {
      this.year = year;
      this.country = country;
      this.holidays = {};
      this.loadHolidays();
    } else {
      throw Error("Invalid year: " + year);
    }
  }

  loadHolidays(): void {
    this.addHolidays(getConfig(this.year, this.country));
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

  addHolidays(entries: [Date, string][]): void {
    entries.forEach(([date, description]) =>
      this.addHoliday(date, description),
    );
    Object.keys(this.holidays).forEach((month) => {
      this.holidays[Number(month)].sort((a, b) => a.day - b.day);
    });
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

// @source https://en.wikipedia.org/wiki/Public_holidays_in_Finland
function getFIConfig(year: number): [Date, string][] {
  return [
    [dateUtils.createDate(year, 1, 1), "New Year's Day"],
    [dateUtils.createDate(year, 1, 6), "Epiphany"],
    [dateUtils.goodFriday(year), "Good Friday"],
    [dateUtils.easterSunday(year), "Easter Sunday"],
    [dateUtils.easterMonday(year), "Easter Monday"],
    [dateUtils.createDate(year, 5, 1), "May Day"],
    [dateUtils.ascensionDay(year), "Ascension Day"],
    [dateUtils.pentecost(year), "Pentecost"],
    [dateUtils.midsummerEve(year), "Midsummer Eve"],
    [dateUtils.midsummerDay(year), "Midsummer Day"],
    [dateUtils.allSaintsDay(year), "All Saints' Day"],
    [dateUtils.createDate(year, 12, 6), "Independence Day"],
    [dateUtils.createDate(year, 12, 24), "Christmas Eve"],
    [dateUtils.createDate(year, 12, 25), "Christmas Day"],
    [dateUtils.createDate(year, 12, 26), "St. Stephen's Day"],
  ];
}

// @source https://en.wikipedia.org/wiki/Public_holidays_in_Sweden
function getSEConfig(year: number): [Date, string][] {
  return [
    [dateUtils.createDate(year, 1, 1), "New Year's Day"],
    [dateUtils.createDate(year, 1, 6), "Epiphany"],
    [dateUtils.goodFriday(year), "Good Friday"],
    [dateUtils.easterSunday(year), "Easter Sunday"],
    [dateUtils.easterMonday(year), "Easter Monday"],
    [dateUtils.createDate(year, 5, 1), "May Day"],
    [dateUtils.ascensionDay(year), "Ascension Day"],
    [dateUtils.pentecost(year), "Whit Sunday"],
    [dateUtils.createDate(year, 6, 6), "National Day"],
    [dateUtils.midsummerEve(year), "Midsummer Eve"],
    [dateUtils.midsummerDay(year), "Midsummer Day"],
    [dateUtils.allSaintsDay(year), "All Saints' Day"],
    [dateUtils.createDate(year, 12, 24), "Christmas Eve"],
    [dateUtils.createDate(year, 12, 25), "Christmas Day"],
    [dateUtils.createDate(year, 12, 26), "Second Day of Christmas"],
    [dateUtils.createDate(year, 12, 31), "New Year's Eve"],
  ];
}

// @source https://en.wikipedia.org/wiki/Public_holidays_in_Norway
function getNOConfig(year: number): [Date, string][] {
  return [
    [dateUtils.createDate(year, 1, 1), "New Year's Day"],
    [dateUtils.maundyThursday(year), "Maundy Thursday"],
    [dateUtils.goodFriday(year), "Good Friday"],
    [dateUtils.easterSunday(year), "Easter Sunday"],
    [dateUtils.easterMonday(year), "Easter Monday"],
    [dateUtils.createDate(year, 5, 1), "Labour Day"],
    [dateUtils.createDate(year, 5, 17), "Constitution Day"],
    [dateUtils.ascensionDay(year), "Ascension Day"],
    [dateUtils.pentecost(year), "Whit Sunday"],
    [dateUtils.whitMonday(year), "Whit Monday"],
    [dateUtils.createDate(year, 12, 24), "Christmas Eve"],
    [dateUtils.createDate(year, 12, 25), "Christmas Day"],
    [dateUtils.createDate(year, 12, 26), "Second Day of Christmas"],
  ];
}

function getConfig(year: number, country: Country): [Date, string][] {
  switch (country) {
    case "FI":
      return getFIConfig(year);
    case "SE":
      return getSEConfig(year);
    case "NO":
      return getNOConfig(year);
    default:
      throw new Error(`Unsupported country: ${country}`);
  }
}

export function get(year: number, country: Country): Year {
  return new Year(year, country);
}
