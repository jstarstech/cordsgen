# coordsgen

Project designed to generate random geographical coordinates within a specified bounding box. It outputs the generated coordinates in both GeoJSON and GeoHash formats, making it useful for spatial data simulations and geospatial applications.

## Node Version

Requires Node.js version 20 or higher.

## Installation

To install the project dependencies, run:

```sh
npm install
```

## Usage

To generate GeoData and GeoHash JSON files, run:

```sh
node index.js
```

## Scripts

- `lint`: Runs ESLint to check for linting errors.

```sh
npm run lint
```

## Configuration

- **ESLint**: Configured with `eslint.config.mjs` and uses recommended settings from `@eslint/js`.
- **Prettier**: Configured with `.prettierrc.json` for code formatting.
