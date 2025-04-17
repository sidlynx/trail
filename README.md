# trail

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
npm dev
```

### Type-Check, Compile and Minify for Production

```sh
npm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm build

# Runs the end-to-end tests
npm test:e2e
# Runs the tests only on Chromium
npm test:e2e --project=chromium
# Runs the tests of a specific file
npm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
npm test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
