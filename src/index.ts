/**
 * collectexports — Generate barrel exports automatically
 *
 * Easily collect all exports from a directory to your index file for bundling.
 * Ideal for design systems, shared types, monorepos, and projects using Rollup, Vite, or Storybook.
 *
 * ## Installation
 *
 * ```bash
 * npm install collectexports
 * yarn add collectexports
 * ```
 *
 * ## Quick Start
 *
 * **CLI:** Run `collectexports collect` or `collectexports init --interactive` for guided setup.
 *
 * **Programmatic:** Import `autoExporter` and call it with your config:
 *
 * ```typescript
 * import { autoExporter } from 'collectexports'
 *
 * await autoExporter({
 *   rootDir: 'src/components',
 *   allowedExtensions: ['.ts', '.tsx'],
 *   ignoredExtensions: ['.test.ts'],
 * })
 * ```
 *
 * @packageDocumentation
 */

export { default as autoExporter } from './features/auto-exporter'
export { default } from './features/auto-exporter'
export {
  EnhancedConfig,
  createConfigFromPreset,
  showAvailablePresets
} from './config/enhanced-config'
export {
  CONFIG_PRESETS,
  getPreset,
  listPresets,
  isValidPreset,
  type PresetName
} from './config/presets'
export type {
  ModuleExportOptions,
  BaseModuleExportOptions,
  BarrelMode,
  Results,
  ResultItem,
  AutoExporterOptions
} from './types/module-exporter.types'
