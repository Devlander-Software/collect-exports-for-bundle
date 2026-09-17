# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Changed

- **Branding / SEO**: Replaced personal author, keywords, social, and funding links with Devlander Software / collectbyexports product metadata (`package.json`, `README.md`, `index.html`, `.github/FUNDING.yml`)

### Fixed

- **Typecheck**: Resolved `tsc --noEmit` conflict with `emitDeclarationOnly` by adding `tsconfig.typecheck.json`; `yarn typecheck` now passes
- **Tests**: Fixed 7 failing tests:
  - `Exports-create-export-matches.test.ts` – added `isTypeOnly` to expected match items
  - `parse-complex-extension-from-path.test.ts` – created `src/info` fixture for path-without-extension case
  - `get-exported-default-function-names-by-file-content.test.ts`, `Exports-has-default-export.test.ts` – regex `matchesExportNamedAsDefault` now supports optional semicolon and double quotes
  - `Exports-generate-exports-from-paths.test.ts` – fixed array assertion for comment blocks (join result before `toContain`)
- **ESLint**: Added explicit return types to CLI and validator; prefixed unused vars with `_` in fixtures and config modules
