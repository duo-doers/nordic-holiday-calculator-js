# nordic-holiday-calculator-js

A TypeScript library for listing Nordic national holidays. With 0 production dependencies. Based on the https://github.com/ericnishio/finnish-holidays-js package.

Currently supported countries:

- [x] Finland (FI)
- [x] Sweden (SE)
- [x] Norway (NO)

## Installation

```sh
pnpm add nordic-holiday-calculator-js
```

## Usage

```ts
import * as NordicHolidays from "nordic-holiday-calculator-js";

// Country is a required parameter for all functions.

// Get all non-weekend holidays for a year
NordicHolidays.year(2025, "FI");
// [
//   { year: 2025, month: 1,  day: 1,  description: "New Year's Day" },
//   { year: 2025, month: 1,  day: 6,  description: "Epiphany" },
//   { year: 2025, month: 4,  day: 18, description: "Good Friday" },
//   { year: 2025, month: 4,  day: 21, description: "Easter Monday" },
//   { year: 2025, month: 5,  day: 1,  description: "May Day" },
//   { year: 2025, month: 5,  day: 29, description: "Ascension Day" },
//   { year: 2025, month: 6,  day: 20, description: "Midsummer Eve" },
//   { year: 2025, month: 12, day: 24, description: "Christmas Eve" },
//   { year: 2025, month: 12, day: 25, description: "Christmas Day" },
//   { year: 2025, month: 12, day: 26, description: "St. Stephen's Day" },
// ]

// Include holidays falling on weekends
NordicHolidays.year(2025, "FI", true);
// returns all 15 FI holidays regardless of weekday

// Get holidays for a specific month
NordicHolidays.month(12, 2025, "FI");
// [
//   { year: 2025, month: 12, day: 24, description: "Christmas Eve" },
//   { year: 2025, month: 12, day: 25, description: "Christmas Day" },
//   { year: 2025, month: 12, day: 26, description: "St. Stephen's Day" },
// ]

// Get the next N upcoming holidays (default: 3)
NordicHolidays.next("FI", 5);
// returns the next 5 upcoming FI holidays from today

// Get the holiday after a given one (by month, year, index within that month)
NordicHolidays.after(6, 2025, 0, "FI");
// { year: 2025, month: 12, day: 24, description: "Christmas Eve" }

// Get the holiday before a given one
NordicHolidays.before(12, 2025, 0, "FI");
// { year: 2025, month: 6, day: 20, description: "Midsummer Eve" }
```

### `Country` type

```ts
type Country = "FI" | "SE" | "NO";
```

### `Holiday` object shape

```ts
interface Holiday {
  year: number;
  month: number;
  day: number;
  description: string;
}
```

## Development

```sh
pnpm install
pnpm test       # run Jest tests
pnpm typecheck  # run TypeScript type checks
pnpm build      # compile TypeScript to dist/
```

## Publishing a new version

Use the release scripts — they bump the version in `package.json`, commit, tag, and push. The GitHub Actions workflow then runs typecheck, tests, build, and publishes to npm automatically.

```sh
pnpm release:patch   # e.g. 0.1.0 → 0.1.1
pnpm release:minor   # e.g. 0.1.0 → 0.2.0
pnpm release:major   # e.g. 0.1.0 → 1.0.0
```

## License

MIT
