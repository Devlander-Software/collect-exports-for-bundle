import { TestOptions } from './test-options.types'

/** Barrel generation mode: single file vs per-directory (ctix-style) */
export type BarrelMode = 'single' | 'perDirectory'

/**
 * Base options for barrel generation. Use with {@link autoExporter} or the CLI.
 * Extended by {@link ModuleExportOptions}.
 *
 * @property rootDir - Directory to scan. Default is 'src'.
 * @property allowedExtensions - Extensions to include (e.g. `['.ts', '.tsx']`).
 * @property ignoredExtensions - Extensions to skip (e.g. `['.test.ts', '.stories.tsx']`).
 * @property excludedFolders - Folders to skip (default: node_modules, dist, build).
 * @property outputFileName - Output name without extension. Default is 'index'.
 * @property outputFilenameExtension - Output extension. Default is '.ts'.
 * @property exportMode - 'named' | 'default' | 'both'. Default is 'named'.
 * @property useTypeScriptAPI - Use TypeScript Compiler API for accurate extraction.
 * @property barrelMode - 'single' (one barrel) | 'perDirectory' (barrel per dir).
 */
export interface BaseModuleExportOptions {
  rootDir?: string
  targetVersion?: 'es6' | 'es5'
  allowedExtensions?: string[]
  exportMode?: 'named' | 'default' | 'both'
  outputFileName?: string
  outputFilenameExtension?: '.ts' | '.tsx'
  ignoredExtensions?: string[]
  specificFiles?: string[]
  includeIndexes?: boolean
  excludedFolders?: string[]
  excludeSpecificFiles?: string[]
  testOptions?: TestOptions
  debug?: boolean
  description?: string
  title?: string
  /** Use TypeScript Compiler API for accurate export extraction (produces compilable barrels) */
  useTypeScriptAPI?: boolean
  /** single: one barrel in rootDir; perDirectory: barrel in each directory (ctix create mode) */
  barrelMode?: BarrelMode
  /** Alias for bundleAsObjectForDefaultExport */
  bundleDefaultAsObject?: string
  /** Alias: full path e.g. ./src/index.ts (overrides outputFileName + outputFilenameExtension) */
  outputPath?: string
  /** Alias for includeIndexes */
  includeBarrelFiles?: boolean
}

export interface ResultItem {
  nameOrPath: string
  reason: string[]
}

export interface Results {
  title: string
  description: string
  includedFolders: ResultItem[]
  includedFiles: ResultItem[]
  excludedFolders: ResultItem[]
  excludedFiles: ResultItem[]
  includedExports: ResultItem[]
  excludedExports: ResultItem[]
  startTime: number
  endTime: number
  duration: string
  withParameters: {
    ignoredExtensions: string[]
    allowedExtensions: string[]
    excludedFolders: string[]
    specificFiles: string[]
    rootDir: string
  }
}

export interface AutoExporterOptions {
  rootDir: string
  targetVersion?: 'es6' | 'es5'
  allowedExtensions: string[]
  exportMode: 'named' | 'default' | 'both'
  outputFileName: string
  outputFilenameExtension: '.ts' | '.tsx'
  ignoredExtensions: string[]
  primaryExportFile?: string | undefined
  specificFiles: string[]
  excludeSpecificFiles: string[]
  includeIndexes: boolean
  excludedFolders: string[]
  bundleAsObjectForDefaultExport?: string | undefined
  testOptions?: TestOptions
  debug: boolean
  description?: string
  title?: string
  results: Results
  /** Use TypeScript Compiler API for accurate export extraction (produces compilable barrels) */
  useTypeScriptAPI?: boolean
  /** single: one barrel; perDirectory: barrel per directory (ctix create mode) */
  barrelMode?: BarrelMode
}

// These types enforce the constraints when used
export type ExclusivePrimaryExportFile<
  T extends {
    exportMode?: 'named' | 'default' | 'both'
    primaryExportFile?: string
  }
> = T['exportMode'] extends 'named' ? never : T['primaryExportFile']

export type ExclusiveBundleAsFunction<
  T extends {
    bundleAsFunctionForDefaultExportAs?: string
    primaryExportFile?: string
    exportMode?: 'named' | 'default' | 'both'
  }
> = T['exportMode'] extends 'named'
  ? never
  : T['bundleAsFunctionForDefaultExportAs']

// Create a type that combines the base options with the conditional ones
export type ModuleExportOptions = BaseModuleExportOptions & {
  primaryExportFile?: ExclusivePrimaryExportFile<BaseModuleExportOptions>
  bundleAsObjectForDefaultExport?: ExclusiveBundleAsFunction<BaseModuleExportOptions>
  includeIndexes?: boolean
}
