export const FRIDAY = 5;
export const SATURDAY = 6;
export const SUNDAY = 0;

export function createDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function today(): Date {
  return new Date();
}

export function getYear(date: Date): number {
  return date.getFullYear();
}

export function getMonth(date: Date): number {
  return date.getMonth() + 1;
}

export function getDay(date: Date): number {
  return date.getDate();
}

export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.setDate(date.getDate() + days));
}

export function subtractDays(date: Date, days: number): Date {
  return new Date(date.setDate(date.getDate() - days));
}

export function isWeekend(year: number, month: number, day: number): boolean {
  const dayOfWeek = createDate(year, month, day).getDay();
  return dayOfWeek === SATURDAY || dayOfWeek === SUNDAY;
}

export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n0 = h + l + 7 * m + 114;
  const n = Math.floor(n0 / 31) - 1;
  const p = (n0 % 31) + 1;
  return createDate(year, n + 1, p);
}

export function easterMonday(year: number): Date {
  const date = easterSunday(year);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate() + 1;
  return createDate(y, m, d);
}

export function goodFriday(year: number): Date {
  let date = easterSunday(year);
  let dayOfWeek: number | null = null;

  function resolveFriday(): Date {
    if (dayOfWeek === FRIDAY) {
      return date;
    } else {
      date = subtractDays(date, 1);
      dayOfWeek = getDayOfWeek(date);
      return resolveFriday();
    }
  }

  return resolveFriday();
}

export function maundyThursday(year: number): Date {
  return subtractDays(easterSunday(year), 3);
}

export function ascensionDay(year: number): Date {
  return addDays(easterSunday(year), 39);
}

export function pentecost(year: number): Date {
  return addDays(easterSunday(year), 49);
}

export function whitMonday(year: number): Date {
  return addDays(easterSunday(year), 50);
}

export function midsummerEve(year: number): Date {
  const month = 6;
  let result: Date | undefined;

  range(19, 26).forEach(function (day) {
    if (!result) {
      const date = createDate(year, month, day);
      if (getDayOfWeek(date) === FRIDAY) {
        result = date;
      }
    }
  });

  return result!;
}

export function midsummerDay(year: number): Date {
  const month = 6;
  let result: Date | undefined;

  range(20, 26).forEach(function (day) {
    if (!result) {
      const date = createDate(year, month, day);
      if (getDayOfWeek(date) === SATURDAY) {
        result = date;
      }
    }
  });

  return result!;
}

export function allSaintsDay(year: number): Date {
  const october31 = createDate(year, 10, 31);
  const secondMonth = 11;
  let result: Date | undefined;

  if (getDayOfWeek(october31) === SATURDAY) {
    result = october31;
  } else {
    range(1, 6).forEach(function (day) {
      if (!result) {
        const date = createDate(year, secondMonth, day);
        if (getDayOfWeek(date) === SATURDAY) {
          result = date;
        }
      }
    });
  }

  return result!;
}

export function zerofy(num: number): string {
  const n = parseInt(String(num));
  if (n < 10) {
    return "0" + n;
  }
  return n.toString();
}

export function range(fromNumber: number, toNumber: number): number[] {
  if (typeof fromNumber === "undefined" || typeof toNumber === "undefined") {
    throw Error("Invalid range.");
  }

  const arr: number[] = [];
  for (let i = fromNumber; i <= toNumber; i++) {
    arr.push(i);
  }
  return arr;
}
