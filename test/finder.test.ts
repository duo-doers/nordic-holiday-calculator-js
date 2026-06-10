import * as finder from "../lib/finder";

describe("finder", function () {
  it("should find next holiday", function () {
    const nextHoliday = finder.after(6, 2016, 0, "FI");

    expect(nextHoliday).toEqual({
      description: "Independence Day",
      day: 6,
      month: 12,
      year: 2016,
    });
  });

  it("should find another next holiday", function () {
    const nextHoliday = finder.after(12, 2016, 0, "FI");

    expect(nextHoliday).toEqual({
      description: "St. Stephen's Day",
      day: 26,
      month: 12,
      year: 2016,
    });
  });

  it("should find previous holiday", function () {
    const nextHoliday = finder.before(12, 2016, 0, "FI");

    expect(nextHoliday).toEqual({
      description: "Midsummer Eve",
      day: 24,
      month: 6,
      year: 2016,
    });
  });

  it("should find another previous holiday", function () {
    const nextHoliday = finder.before(12, 2016, 1, "FI");

    expect(nextHoliday).toEqual({
      description: "Independence Day",
      day: 6,
      month: 12,
      year: 2016,
    });
  });
});
