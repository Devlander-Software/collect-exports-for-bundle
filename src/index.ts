/**
 * @packageDocumentation
 * @module collect-exports-for-bundle
 * 
 * # Collect Exports for Bundle
 * 
 * A comprehensive TypeScript/JavaScript export generation tool designed for modern bundlers like Rollup and Webpack.
 * This library provides intelligent auto-export functionality, path collection, and export statement generation
 * to streamline your project's module organization.
 * 
 * ## Features
 * 
 * - **Smart Export Detection**: Automatically identifies and generates exports from your source files
 * - **Multi-Platform Support**: Handles web, native, and universal modules with intelligent extension parsing
 * - **Rollup Integration**: Built with Rollup compatibility in mind, supporting modern ES modules
 * - **TypeScript Support**: Full TypeScript support with type declarations and interfaces
 * - **Flexible Configuration**: Extensive configuration options with preset configurations
 * - **CLI Interface**: Command-line interface for automation and CI/CD integration
 * 
 * ## Quick Start
 * 
 * ```typescript
 * import { autoExporter } from '@devlander/collect-exports-for-bundle';
 * 
 * const result = await autoExporter({
 *   sourceDir: './src',
 *   outputFile: './src/index.ts',
 *   extensions: ['.ts', '.js']
 * });
 * ```
 * 
 * ## Core Modules
 * 
 * - **Auto Exporter**: Main functionality for automatic export generation
 * - **Path Collection**: Utilities for collecting and processing file paths
 * - **Export Generation**: Core logic for creating export statements
 * - **Extensions**: File extension handling and validation
 * - **Conversions**: Utility functions for naming conventions
 * 
 * @example
 * ```typescript
 * // Basic usage
 * import autoExporter from '@devlander/collect-exports-for-bundle';
 * 
 * const config = {
 *   sourceDir: './src/components',
 *   outputFile: './src/components/index.ts',
 *   extensions: ['.ts', '.tsx'],
 *   includeSubdirectories: true
 * };
 * 
 * const result = await autoExporter(config);
 * console.log(`Generated ${result.exports.length} exports`);
 * ```
 * 
 * @version 2.0.0-beta.1
 * @license MIT
 * @author DevLander
 */

// Core functionality exports
export * from './conversions/to-camel-case'
export * from './extensions/create-extensions'
export * from './extensions/get-extensions'

// Main auto-exporter (default export)
export { default } from './features/auto-exporter'

// Path collection utilities
export * from './features/collect-paths/collect-paths'

// Type definitions
export type * from './types/module-exporter.types'

// Enhanced configuration system
export * from './config/presets'
export * from './config/enhanced-config'

// Export generation functions
export * from './export-generation-core'
