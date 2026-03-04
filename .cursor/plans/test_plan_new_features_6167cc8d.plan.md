---
name: Test Plan New Features
overview: Add unit and integration tests for the CLI, directive parser, config loader, TypeScript API exports, build-exports with directives/inline type, barrel mode, config aliases, presets, and get-paths-with-exports.
todos: []
isProject: false
---

# Test Plan for New Features

## Test Structure

- New tests go in `__tests__/` matching the pattern `<rootDir>/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)` per [jest.config.js](jest.config.js)
- Use existing shared fixtures where possible: **[tests**/shared.test.ts](__tests__/shared.test.ts), [src/for-tests/](src/for-tests/)
- Create `__tests__/__fixtures__/` for CLI and config-loader tests (isolated temp-style dirs)

---

## 1. Directive Parser Tests

**File:** `__tests__/directive-parser.test.ts`  
**Target:** [src/features/directive-parser.ts](src/features/directive-parser.ts)


| Function                      | Test cases                                                                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isFileExcludedByDirective`   | Returns `true` when `/** @collect-exports-exclude */` in file header (before first non-comment line); returns `false` when absent; accepts content string to avoid fs |
| `getExcludeNextLineNumbers`   | Returns Set of 1-based line numbers for exports after `// @collect-exports-exclude-next`; handles multiple directives; empty Set when none                            |
| `isExportExcludedByDirective` | Returns `true` when exportLineNumber is in excluded set; `false` otherwise                                                                                            |


Fixtures: inline strings (no files needed for most tests). Use `content` param to pass source; only test `content` path, not file path (or mock `fs` if needed).

---

## 2. Config Loader Tests

**File:** `__tests__/config-loader.test.ts`  
**Target:** [src/utils/config-loader.ts](src/utils/config-loader.ts)


| Scenario                                                  | Setup                                                                        | Assertion                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| `loadConfig({ configPath })`                              | Create temp dir with `.collect-exports.json` containing `{ rootDir: "src" }` | Returns object with `rootDir: "src"` |
| `loadConfig({ cwd })` finds `.collect-exports.json`       | Write `.collect-exports.json` in fixture dir                                 | Returns parsed config                |
| `loadConfig({ cwd })` finds `collect-exports.config.json` | Write only `collect-exports.config.json`                                     | Returns parsed config                |
| `loadConfig` with `package.json` `collectExports`         | Write `package.json` with `collectExports: { rootDir: "lib" }`               | Returns that config                  |
| No config anywhere                                        | Empty dir                                                                    | Returns `null`                       |
| Invalid path                                              | `configPath` to non-existent file                                            | Returns `null`                       |


Use `fs.mkdtempSync` + `fs.mkdirSync` for each test dir, clean up in `afterEach`. Cwd = fixture dir for discovery tests.

---

## 3. TypeScript API Exports Tests

**File:** `__tests__/ts-api-exports.test.ts`  
**Target:** [src/export-related/ts-api-exports.ts](src/export-related/ts-api-exports.ts)


| Scenario             | Input                                      | Assertion                                             |
| -------------------- | ------------------------------------------ | ----------------------------------------------------- |
| Named function       | `export function foo() {}`                 | `named` includes `{ name: 'foo', isTypeOnly: false }` |
| Named interface      | `export interface IBar {}`                 | `named` includes `{ name: 'IBar', isTypeOnly: true }` |
| Named type alias     | `export type TBaz = string`                | `named` includes `{ name: 'TBaz', isTypeOnly: true }` |
| Export clause        | `export { A, B }`                          | Both in `named`                                       |
| Export type clause   | `export type { T }` or `export { type T }` | `isTypeOnly: true`                                    |
| Default export       | `export default MyClass`                   | `defaultExport === 'MyClass'`                         |
| Empty file           | `""`                                       | `{ named: [] }`                                       |
| Invalid / no exports | Plain `const x = 1`                        | `named` empty                                         |


Use inline `content` param (second arg) to avoid fs. File path can be dummy `test.ts` for script kind.

---

## 4. Build Exports from Paths – New Behavior

**File:** Extend **[tests**/Exports-build-exports-from-paths.test.ts](__tests__/Exports-build-exports-from-paths.test.ts)


| Scenario                               | Config / content                                                | Assertion                                                               |
| -------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `useTypeScriptAPI: true` → inline type | Config `useTypeScriptAPI: true`, file with interface + function | Output contains `export { type IFoo, myFunc } from '...'` (single line) |
| `useTypeScriptAPI: false` (default)    | Same file                                                       | Separate `export { myFunc }` and `export type { IFoo }`                 |
| File excluded by directive             | File content with `/** @collect-exports-exclude */` in header   | No exports added to `results`                                           |
| Normal file without directive          | Standard export file                                            | Exports added as before                                                 |


Reuse [pathWithTypesExtension](__tests__/shared.test.ts), [pathWithFunctionExport](__tests__/shared.test.ts), [pathWithInterfaceInFile](__tests__/shared.test.ts). For directive test, build a minimal params object with synthetic `fileContent` including the directive.

---

## 5. Generate Exports from Dir – Barrel Mode

**File:** `__tests__/Exports-generate-exports-from-dir.test.ts`  
**Target:** [src/export-related/generate-exports-from-dir.ts](src/export-related/generate-exports-from-dir.ts)


| Scenario                     | Config                                              | Assertion                                                             |
| ---------------------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| `barrelMode: 'single'`       | `barrelMode: 'single'`, `rootDir` with nested files | Returns single `BarrelResult` with `outputPath` at root               |
| `barrelMode: 'perDirectory'` | `barrelMode: 'perDirectory'`                        | Returns multiple `BarrelResult[]`, one per directory containing files |


Mock or use `collectPathsFromDirectories` dependency – or run against [src/for-tests/](src/for-tests/) with a small config. Jest `beforeAll` may need to ensure paths exist.

Note: `generateExportsFromPaths` is used internally; integration may require real paths. Consider mocking `collectPathsFromDirectories` to return controlled paths for deterministic tests.

---

## 6. Config Aliases (modify-config)

**File:** `__tests__/modify-config-aliases.test.ts`  
**Target:** [src/utils/modify-config.ts](src/utils/modify-config.ts) `normalizeOptions`-equivalent behavior (via `modifyConfig`)


| Alias                   | Input                               | Assertion                                                              |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| `bundleDefaultAsObject` | `{ bundleDefaultAsObject: "App" }`  | Result has `bundleAsObjectForDefaultExport: "App"`                     |
| `outputPath`            | `{ outputPath: "./dist/index.ts" }` | Result has `outputFileName: "index"`, `outputFilenameExtension: ".ts"` |
| `includeBarrelFiles`    | `{ includeBarrelFiles: true }`      | Result has `includeIndexes: true`                                      |


Call `modifyConfig` with alias-only input and assert normalized keys. May need to pass minimal required fields to satisfy `AutoExporterOptions`.

---

## 7. get-paths-with-exports + Directive Integration

**File:** `__tests__/Exports-get-paths-with-exports.test.ts` (new or extend existing)  
**Target:** [src/export-related/get-paths-with-exports.ts](src/export-related/get-paths-with-exports.ts)


| Scenario                             | Setup                                     | Assertion                 |
| ------------------------------------ | ----------------------------------------- | ------------------------- |
| Path with `@collect-exports-exclude` | Create temp file with directive + exports | Path not in returned list |


Requires a real file with directive. Create in `__tests__/__fixtures__/directives/` or temp dir.

---

## 8. Presets Tests

**File:** `__tests__/presets.test.ts`  
**Target:** [src/config/presets.ts](src/config/presets.ts)


| Scenario                            | Assertion                                                |
| ----------------------------------- | -------------------------------------------------------- |
| `getPreset('react')`                | Returns object with `rootDir`, `allowedExtensions`, etc. |
| `isValidPreset('react')`            | `true`                                                   |
| `isValidPreset('invalid')`          | `false`                                                  |
| `listPresets()`                     | Returns array with keys `react`, `nodeLibrary`, etc.     |
| `createConfigFromPreset('library')` | Includes `useTypeScriptAPI: true`                        |


---

## 9. CLI Tests

**File:** `__tests__/cli.test.ts`  
**Target:** [src/cli/index.ts](src/cli/index.ts)

Run CLI via `spawnSync('node', [path.join(__dirname, '../dist/cjs/cli.js'), ...args])`. **Prerequisite:** `dist/cjs/cli.js` must exist (run `yarn build` in `link-packages` before full test suite).


| Command                             | Assertion                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `--help`                            | Exit 0, stdout contains `Usage`, `collect`, `init`, `validate`               |
| `-V`                                | Exit 0, version regex `\d+\.\d+\.\d+`                                        |
| `list-presets`                      | Exit 0, stdout contains `react`, `nodeLibrary`                               |
| `preset-info react`                 | Exit 0, stdout contains `React/TypeScript`                                   |
| `preset-info nonexistent`           | Exit 1, stderr contains error                                                |
| `init --preset react`               | In fixture dir: exit 0, `.collect-exports.json` exists with `rootDir: "src"` |
| `validate -c /nonexistent`          | Exit 1                                                                       |
| `validate -c .collect-exports.json` | In dir with valid config: exit 0                                             |


Fixture dir: `__tests__/__fixtures__/cli/`. Create/clean `.collect-exports.json` in `afterEach`. Skip `init --interactive` (requires stdin mocking).

---

## 10. Auto-Exporter Integration (Optional)

**File:** `__tests__/auto-exporter.integration.test.ts`  
**Target:** [src/features/auto-exporter.ts](src/features/auto-exporter.ts)

- Run `autoExporter({ rootDir: 'src/for-tests', ... })` with minimal config
- Assert it completes (no throw), returns void
- Optionally assert a barrel file was written at expected path

This may be slow and flaky. Mark as `describe.skip` or run only in CI if needed.

---

## Implementation Order

1. Directive parser (pure unit, no deps)
2. Config loader (needs temp dirs)
3. TS API exports (pure unit)
4. Build-exports extensions (builds on existing test file)
5. Config aliases
6. Presets
7. get-paths-with-exports + directive
8. Generate-exports-from-dir (barrel mode)
9. CLI
10. Auto-exporter (optional)

---

## Files to Create


| File                                                  | Purpose                           |
| ----------------------------------------------------- | --------------------------------- |
| `__tests__/directive-parser.test.ts`                  | Directive parser unit tests       |
| `__tests__/config-loader.test.ts`                     | Config discovery and loading      |
| `__tests__/ts-api-exports.test.ts`                    | TS API export extraction          |
| `__tests__/modify-config-aliases.test.ts`             | Config alias normalization        |
| `__tests__/presets.test.ts`                           | Preset helpers                    |
| `__tests__/Exports-get-paths-with-exports.test.ts`    | Path filtering with directives    |
| `__tests__/Exports-generate-exports-from-dir.test.ts` | Barrel mode behavior              |
| `__tests__/cli.test.ts`                               | CLI subprocess tests              |
| `__tests__/__fixtures__/cli/`                         | Fixture dir for CLI init/validate |


---

## Dependencies

- No new packages. Use `child_process.spawnSync`, `fs`, `path`, Jest's `describe`/`it`/`beforeEach`/`afterEach`.
- Ensure `yarn build` runs before tests that need `dist/cjs/cli.js` (already part of `link-packages` in `test` script).

