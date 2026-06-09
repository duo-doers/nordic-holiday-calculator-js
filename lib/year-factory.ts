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
    switch (this.country) {
      case "FI":
        this.loadFIHolidays();
        break;
      case "SE":
        this.loadSEHolidays();
        break;
      case "NO":
        this.loadNOHolidays();
        break;
      default:
        throw new Error(`Unsupported country: ${this.country}`);
    }
  }

  loadFIHolidays(): void {
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
      "Second Day of Christmas",
    );
  }

  loadSEHolidays(): void {
    this.addHoliday(dateUtils.createDate(this.year, 1, 1), "New Year's Day");
    this.addHoliday(dateUtils.createDate(this.year, 1, 6), "Epiphany");
    this.addHoliday(dateUtils.goodFriday(this.year), "Good Friday");
    this.addHoliday(dateUtils.easterSunday(this.year), "Easter Sunday");
    this.addHoliday(dateUtils.easterMonday(this.year), "Easter Monday");
    this.addHoliday(dateUtils.createDate(this.year, 5, 1), "May Day");
    this.addHoliday(dateUtils.ascensionDay(this.year), "Ascension Day");
    this.addHoliday(dateUtils.pentecost(this.year), "Whit Sunday");
    this.addHoliday(dateUtils.createDate(this.year, 6, 6), "National Day");
    this.addHoliday(dateUtils.midsummerEve(this.year), "Midsummer Eve");
    this.addHoliday(dateUtils.midsummerDay(this.year), "Midsummer Day");
    this.addHoliday(dateUtils.allSaintsDay(this.year), "All Saints' Day");
    this.addHoliday(dateUtils.createDate(this.year, 12, 24), "Christmas Eve");
    this.addHoliday(dateUtils.createDate(this.year, 12, 25), "Christmas Day");
    this.addHoliday(
      dateUtils.createDate(this.year, 12, 26),
      "Second Day of Christmas",
    );
    this.addHoliday(dateUtils.createDate(this.year, 12, 31), "New Year's Eve");
  }

  loadNOHolidays(): void {
    this.addHoliday(dateUtils.createDate(this.year, 1, 1), "New Year's Day");
    this.addHoliday(dateUtils.maundyThursday(this.year), "Maundy Thursday");
    this.addHoliday(dateUtils.goodFriday(this.year), "Good Friday");
    this.addHoliday(dateUtils.easterSunday(this.year), "Easter Sunday");
    this.addHoliday(dateUtils.easterMonday(this.year), "Easter Monday");
    this.addHoliday(dateUtils.createDate(this.year, 5, 1), "Labour Day");
    this.addHoliday(dateUtils.createDate(this.year, 5, 17), "Constitution Day");
    this.addHoliday(dateUtils.ascensionDay(this.year), "Ascension Day");
    this.addHoliday(dateUtils.pentecost(this.year), "Whit Sunday");
    this.addHoliday(dateUtils.whitMonday(this.year), "Whit Monday");
    this.addHoliday(dateUtils.createDate(this.year, 12, 24), "Christmas Eve");
    this.addHoliday(dateUtils.createDate(this.year, 12, 25), "Christmas Day");
    this.addHoliday(
      dateUtils.createDate(this.year, 12, 26),
      "Second Day of Christmas",
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

export function get(year: number, country: Country): Year {
  return new Year(year, country);
}
