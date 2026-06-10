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
});
