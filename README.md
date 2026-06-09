# nordic-holiday-calculator-js

A TypeScript library for listing Nordic national holidays. With 0 production dependencies. Based on the https://github.com/ericnishio/finnish-holidays-js package.

Currently supported countries, and planned support:

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
NordicHolidays.year(2025, "SE");
NordicHolidays.year(2025, "NO");

// Include holidays falling on weekends
NordicHolidays.year(2025, "FI", true);

// Get holidays for a specific month
NordicHolidays.month(12, 2025, "FI");

// Get the next N upcoming holidays (default: 3)
NordicHolidays.next("FI", 5);

// Get the holiday after a given one (by month, year, index)
NordicHolidays.after(6, 2025, 0, "FI");

// Get the holiday before a given one
NordicHolidays.before(12, 2025, 0, "FI");
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
pnpm build      # compile TypeScript to dist/
```

## Publishing a new version

Requires `NODE_AUTH_TOKEN` set in your environment (GitHub PAT with `write:packages`):

```sh
pnpm release:patch   # 1.1.2 → 1.1.3
pnpm release:minor   # 1.1.2 → 1.2.0
pnpm release:major   # 1.1.2 → 2.0.0
```

Each command runs tests, builds, bumps the version, and publishes to GitHub Packages. Push the version commit and tag afterward:

```sh
git push && git push --tags
```

## License

MIT
