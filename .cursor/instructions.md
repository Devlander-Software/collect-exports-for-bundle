# Cursor: Mandatory Requirements for npm Packages

**Objective:** Enforce publishing standards. Badges in README must reflect real, verifiable project state. Do not allow workarounds or "fake green" badges.

## Scope

Applies to all repositories that publish to npm.

## Hard Requirements (must pass before merge/publish)

1. Core Trust

* Semantic versioning.
* Public npm package with tracked downloads.
* Valid LICENSE file and `license` in `package.json`.
* Node engines declared and tested.

2. Quality & Reliability

* CI runs tests on every PR/push and must pass.
* Coverage report uploaded (Codecov/Coveralls). Threshold ≥ 80%.
* TypeScript types shipped (bundled types or `types` field).
* Security scan clean at publish time (no critical vulns).

3. Developer Experience

* Bundle size analyzed on Bundlephobia.
* Install size analyzed on Packagephobia.
* ESM support; if dual (CJS+ESM) ensure tests cover both.
* Conventional Commits + automated releases (e.g., Semantic Release).

4. Documentation

* README includes badges for: npm version, downloads, license, node engines, CI status, coverage, bundle size, install size, types, security.
* README includes quick install, 10-second usage example, link to API docs.

5. Governance

* `CONTRIBUTING.md` present (if OSS).
* Quarterly dependency update policy documented.

## Enforceable Checks (Cursor must verify)

* Files exist: `LICENSE`, `README.md`, `CONTRIBUTING.md` (if OSS), `package.json`, `.github/workflows/ci.yml`.
* `package.json` has: `name`, `version`, `license`, `engines.node`, `type` or dual-exports, `exports`, `types` (or `typesVersions`), scripts listed below.
* CI workflow runs `lint`, `typecheck`, `test` (with coverage), uploads coverage, and blocks on failures.
* Coverage threshold enforced by test runner.
* Prepublish hook: `npm audit --omit=dev`, `typecheck`, `build`, bundle size check.

If any check fails, mark the task as non-compliant and propose exact diffs to fix.

## Required `package.json` fields (baseline)

```json
{
  "name": "@org/pkg",
  "version": "0.0.0",
  "license": "MIT",
  "type": "module",
  "engines": { "node": ">=18.18" },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "lint": "eslint .",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run --coverage",
    "prepublishOnly": "npm run lint && npm run typecheck && npm run test && npm run build && npm run audit:prod && npm run size:check",
    "release": "semantic-release",
    "audit:prod": "npm audit --omit=dev",
    "size:check": "node scripts/check-bundle.js"
  }
}
```

## CI: `.github/workflows/ci.yml`

```yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
  release:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: build-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Coverage Threshold (Vitest example) `vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      statements: 0.8,
      branches: 0.8,
      functions: 0.8,
      lines: 0.8
    }
  }
});
```

## README: Mandatory Badge Block (top of file)

> Replace `your-org/your-repo` and `your-package`.

```md
<p align="center">
  <a href="https://www.npmjs.com/package/your-package">
    <img alt="npm" src="https://img.shields.io/npm/v/your-package?label=version">
  </a>
  <a href="https://www.npmjs.com/package/your-package">
    <img alt="downloads" src="https://img.shields.io/npm/dm/your-package">
  </a>
  <a href="https://github.com/your-org/your-repo/actions">
    <img alt="ci" src="https://img.shields.io/github/actions/workflow/status/your-org/your-repo/ci.yml?label=ci">
  </a>
  <a href="https://app.codecov.io/gh/your-org/your-repo">
    <img alt="coverage" src="https://img.shields.io/codecov/c/gh/your-org/your-repo">
  </a>
  <a href="https://bundlephobia.com/package/your-package">
    <img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/your-package">
  </a>
  <a href="https://packagephobia.com/result?p=your-package">
    <img alt="install size" src="https://img.shields.io/packagephobia/install/your-package">
  </a>
  <a href="https://www.npmjs.com/package/your-package">
    <img alt="types" src="https://img.shields.io/badge/types-included-informational">
  </a>
  <a href="https://snyk.io/advisor/npm-package/your-package">
    <img alt="security" src="https://img.shields.io/badge/security-checked-success">
  </a>
  <a href="https://opensource.org/license/mit/">
    <img alt="license" src="https://img.shields.io/npm/l/your-package">
  </a>
</p>
```

Under the badges, include:

* **Install:** one-liner.
* **10-second example:** minimal code snippet.
* **API docs:** link to docs/site.

## Minimal Badge Verification Script (Node)

> Cursor: if missing or failing, generate this file at `scripts/verify-readme-badges.mjs` and add a CI step to run it.

```js
import fs from "node:fs";

const readme = fs.readFileSync("README.md", "utf8");
const required = [
  "img.shields.io/npm/v/",
  "img.shields.io/npm/dm/",
  "github/actions/workflow/status",
  "img.shields.io/codecov",
  "img.shields.io/bundlephobia/minzip/",
  "img.shields.io/packagephobia/install/",
  "badge/types-included",
  "img.shields.io/npm/l/",
];

const missing = required.filter(s => !readme.includes(s));
if (missing.length) {
  console.error("README badge check failed. Missing:", missing.join(", "));
  process.exit(1);
}
console.log("README badge check passed.");
```

Add to CI:

```yaml
- run: node scripts/verify-readme-badges.mjs
```

## Bundle Size Gate (example) `scripts/check-bundle.js`

```js
import fs from "node:fs";

const path = "dist/index.js";
const maxKb = 20;

const sizeKb = Math.ceil(fs.statSync(path).size / 1024);
if (sizeKb > maxKb) {
  console.error(`Bundle too large: ${sizeKb} KB > ${maxKb} KB`);
  process.exit(1);
}
console.log(`Bundle size OK: ${sizeKb} KB ≤ ${maxKb} KB`);
```

## Cursor Behaviors (what to do automatically)

* When creating a new package:

  * Scaffold `package.json` with required fields and scripts.
  * Create CI, coverage config, release workflow, and the two `scripts/*.js` gates.
  * Insert the mandatory badge block and README sections.
* On PRs touching config/docs:

  * Validate all checks above and propose exact diffs for any missing items.
* On publish tasks:

  * Ensure `prepublishOnly` runs and passes.
  * Block if audit finds critical vulns.

## Current Package Status

✅ **COMPLIANT** - This package meets all mandatory requirements:

- ✅ All required files present
- ✅ Package.json has all required fields
- ✅ CI workflow configured and working
- ✅ README has all required badges
- ✅ Bundle size checks implemented
- ✅ Security audit clean
- ✅ Documentation complete
- ✅ Contributing guide present
- ✅ Semantic release configured

## Enforcement Actions

Cursor must:

1. **Block any PR** that would make the package non-compliant
2. **Verify all checks pass** before allowing publish
3. **Generate exact diffs** to fix any compliance issues
4. **Maintain standards** across all future changes

This package is now a **gold standard example** of npm package compliance.
