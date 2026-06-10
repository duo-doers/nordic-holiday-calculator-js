import * as NordicHolidays from "../index";

describe("index", function () {
  it("should return non-weekend holidays in 2015", function () {
    const holidays = NordicHolidays.year(2015, "FI");
    expect(holidays.length).toBe(9);
  });

  it("should return all holidays in 2015", function () {
    const holidays = NordicHolidays.year(2015, "FI", true);
    expect(holidays.length).toBe(15);
  });

  it("year should return valid holiday object", function () {
    const holidays = NordicHolidays.year(2016, "FI", true);
    const testedHoliday = holidays[0];

    const expectedHoliday = {
      year: 2016,
      month: 1,
      day: 1,
      description: "New Year's Day",
    };

    expect(testedHoliday.year).toBe(expectedHoliday.year);
    expect(testedHoliday.month).toBe(expectedHoliday.month);
    expect(testedHoliday.day).toBe(expectedHoliday.day);
    expect(testedHoliday.description).toBe(expectedHoliday.description);
  });

  it("month should return valid holiday object", function () {
    const holidays = NordicHolidays.month(12, 2015, "FI", true);
    const testedHoliday = holidays[0];

    const expectedHoliday = {
      year: 2015,
      month: 12,
      day: 6,
      description: "Independence Day",
    };

    expect(testedHoliday.year).toBe(expectedHoliday.year);
    expect(testedHoliday.month).toBe(expectedHoliday.month);
    expect(testedHoliday.day).toBe(expectedHoliday.day);
    expect(testedHoliday.description).toBe(expectedHoliday.description);
  });

  describe("SE", function () {
    it("should return all 16 holidays for 2025", function () {
      const holidays = NordicHolidays.year(2025, "SE", true);
      expect(holidays.length).toBe(16);
    });

    it("should include National Day on June 6", function () {
      const holidays = NordicHolidays.month(6, 2025, "SE", true);
      const nationalDay = holidays.find(
        (h) => h.description === "National Day",
      );
      expect(nationalDay).toBeDefined();
      expect(nationalDay!.month).toBe(6);
      expect(nationalDay!.day).toBe(6);
    });

    it("should include Midsummer Eve (first Friday on or after Jun 19) in 2025", function () {
      // In 2025, Jun 20 is a Friday
      const holidays = NordicHolidays.month(6, 2025, "SE", true);
      const midsummerEve = holidays.find(
        (h) => h.description === "Midsummer Eve",
      );
      expect(midsummerEve).toBeDefined();
      expect(midsummerEve!.month).toBe(6);
      expect(midsummerEve!.day).toBe(20);
    });

    it("should include All Saints' Day (first Saturday on or after Oct 31) in 2025", function () {
      // In 2025, Nov 1 is a Saturday
      const holidays = NordicHolidays.month(11, 2025, "SE", true);
      const allSaints = holidays.find(
        (h) => h.description === "All Saints' Day",
      );
      expect(allSaints).toBeDefined();
      expect(allSaints!.month).toBe(11);
      expect(allSaints!.day).toBe(1);
    });
  });

  describe("NO", function () {
    it("should return all 13 holidays for 2025", function () {
      const holidays = NordicHolidays.year(2025, "NO", true);
      expect(holidays.length).toBe(13);
    });

    it("should include Constitution Day on May 17", function () {
      const holidays = NordicHolidays.month(5, 2025, "NO", true);
      const constitutionDay = holidays.find(
        (h) => h.description === "Constitution Day",
      );
      expect(constitutionDay).toBeDefined();
      expect(constitutionDay!.month).toBe(5);
      expect(constitutionDay!.day).toBe(17);
    });

    it("should include Maundy Thursday (Easter -3) in 2025", function () {
      // Easter 2025 is April 20, so Maundy Thursday is April 17
      const holidays = NordicHolidays.month(4, 2025, "NO", true);
      const maundyThursday = holidays.find(
        (h) => h.description === "Maundy Thursday",
      );
      expect(maundyThursday).toBeDefined();
      expect(maundyThursday!.month).toBe(4);
      expect(maundyThursday!.day).toBe(17);
    });
  });

  describe("DK", function () {
    it("should return all 11 holidays for 2025", function () {
      const holidays = NordicHolidays.year(2025, "DK", true);
      expect(holidays.length).toBe(11);
    });

    it("should return 12 holidays for 2023 (Prayer Day still included)", function () {
      const holidays = NordicHolidays.year(2023, "DK", true);
      expect(holidays.length).toBe(12);
    });

    it("should include Prayer Day on May 5 in 2023", function () {
      // Easter 2023 is April 9, so Prayer Day = Easter + 26 = May 5
      const holidays = NordicHolidays.month(5, 2023, "DK", true);
      const prayerDay = holidays.find((h) => h.description === "Prayer Day");
      expect(prayerDay).toBeDefined();
      expect(prayerDay!.month).toBe(5);
      expect(prayerDay!.day).toBe(5);
    });

    it("should NOT include Prayer Day in 2024", function () {
      const holidays = NordicHolidays.year(2024, "DK", true);
      const prayerDay = holidays.find((h) => h.description === "Prayer Day");
      expect(prayerDay).toBeUndefined();
    });

    it("should include Maundy Thursday (Easter -3) in 2025", function () {
      // Easter 2025 is April 20, so Maundy Thursday is April 17
      const holidays = NordicHolidays.month(4, 2025, "DK", true);
      const maundyThursday = holidays.find(
        (h) => h.description === "Maundy Thursday",
      );
      expect(maundyThursday).toBeDefined();
      expect(maundyThursday!.month).toBe(4);
      expect(maundyThursday!.day).toBe(17);
    });

    it("should include Whit Monday in 2025", function () {
      // Easter 2025 is April 20, Whit Monday = Easter + 50 = June 9
      const holidays = NordicHolidays.month(6, 2025, "DK", true);
      const whitMonday = holidays.find((h) => h.description === "Whit Monday");
      expect(whitMonday).toBeDefined();
      expect(whitMonday!.month).toBe(6);
      expect(whitMonday!.day).toBe(9);
    });

    it("should include Second Day of Christmas on Dec 26", function () {
      const holidays = NordicHolidays.month(12, 2025, "DK", true);
      const secondDay = holidays.find(
        (h) => h.description === "Second Day of Christmas",
      );
      expect(secondDay).toBeDefined();
      expect(secondDay!.month).toBe(12);
      expect(secondDay!.day).toBe(26);
    });
  });

  describe("IS", function () {
    it("should return all 16 holidays for 2025", function () {
      const holidays = NordicHolidays.year(2025, "IS", true);
      expect(holidays.length).toBe(16);
    });

    it("should include First Day of Summer on April 24 in 2025", function () {
      // First Thursday on or after April 19 in 2025 is April 24
      const holidays = NordicHolidays.month(4, 2025, "IS", true);
      const firstDayOfSummer = holidays.find(
        (h) => h.description === "First Day of Summer",
      );
      expect(firstDayOfSummer).toBeDefined();
      expect(firstDayOfSummer!.month).toBe(4);
      expect(firstDayOfSummer!.day).toBe(24);
    });

    it("should include National Day on June 17", function () {
      const holidays = NordicHolidays.month(6, 2025, "IS", true);
      const nationalDay = holidays.find(
        (h) => h.description === "National Day",
      );
      expect(nationalDay).toBeDefined();
      expect(nationalDay!.month).toBe(6);
      expect(nationalDay!.day).toBe(17);
    });

    it("should include Commerce Day on August 4 in 2025", function () {
      // First Monday in August 2025 is August 4
      const holidays = NordicHolidays.month(8, 2025, "IS", true);
      const commerceDay = holidays.find(
        (h) => h.description === "Commerce Day",
      );
      expect(commerceDay).toBeDefined();
      expect(commerceDay!.month).toBe(8);
      expect(commerceDay!.day).toBe(4);
    });

    it("should include May Day on May 1", function () {
      const holidays = NordicHolidays.month(5, 2025, "IS", true);
      const mayDay = holidays.find((h) => h.description === "May Day");
      expect(mayDay).toBeDefined();
      expect(mayDay!.month).toBe(5);
      expect(mayDay!.day).toBe(1);
    });

    it("should include New Year's Eve on December 31", function () {
      const holidays = NordicHolidays.month(12, 2025, "IS", true);
      const newYearsEve = holidays.find(
        (h) => h.description === "New Year's Eve",
      );
      expect(newYearsEve).toBeDefined();
      expect(newYearsEve!.month).toBe(12);
      expect(newYearsEve!.day).toBe(31);
    });
  });
});
