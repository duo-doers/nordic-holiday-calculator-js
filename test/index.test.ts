import * as NordicHolidays from "../index";

describe("index", function () {
  it("should return non-weekend holidays in 2015", function () {
    const holidays = NordicHolidays.year(2015);
    expect(holidays.length).toBe(9);
  });

  it("should return all holidays in 2015", function () {
    const holidays = NordicHolidays.year(2015, true);
    expect(holidays.length).toBe(15);
  });

  it("year should return valid holiday object", function () {
    const holidays = NordicHolidays.year(2016, true);
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
    const holidays = NordicHolidays.month(12, 2015, true);
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

  it("should accept explicit FI country", function () {
    const holidays = NordicHolidays.year(2015, false, "FI");
    expect(holidays.length).toBe(9);
  });

  it("should throw for SE (not yet implemented)", function () {
    expect(() => NordicHolidays.year(2025, false, "SE")).toThrow(
      "Country SE is not yet implemented.",
    );
  });

  it("should throw for NO (not yet implemented)", function () {
    expect(() => NordicHolidays.year(2025, false, "NO")).toThrow(
      "Country NO is not yet implemented.",
    );
  });
});
