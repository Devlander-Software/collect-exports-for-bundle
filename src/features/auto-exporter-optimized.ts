import { ModuleExportOptions, AutoExporterOptions } from '../types/module-exporter.types'
import { OptimizedExportAnalyzer, OptimizedPathCollector } from '../core/optimized/export-analyzer'
import { logColoredMessage } from '../utils/helpers/color-logger'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Optimized auto-exporter with significant performance improvements.
 * 
 * This class provides high-performance export collection and generation
 * for TypeScript/JavaScript projects. It uses optimized algorithms and
 * caching to significantly improve performance over the standard auto-exporter.
 * 
 * Key features:
 * - Parallel file processing
 * - Intelligent caching
 * - Batch operations
 * - Memory-efficient algorithms
 * - Comprehensive error handling
 * 
 * @example
 * ```typescript
 * const config = {
 *   rootDir: './src',
 *   allowedExtensions: ['.ts', '.tsx'],
 *   exportMode: 'both',
 *   debug: true
 * };
 * 
 * const exporter = new OptimizedAutoExporter(config);
 * await exporter.collectExports();
 * ```
 */
export class OptimizedAutoExporter {
  /** Optimized export analyzer instance */
  private analyzer: OptimizedExportAnalyzer
  /** Optimized path collector instance */
  private pathCollector: OptimizedPathCollector
  /** Configuration options for the exporter */
  private config: AutoExporterOptions

  /**
   * Create a new OptimizedAutoExporter instance.
   * 
   * @param config - Configuration options for export collection
   * 
   * @example
   * ```typescript
   * const exporter = new OptimizedAutoExporter({
   *   rootDir: './src',
   *   allowedExtensions: ['.ts', '.tsx'],
   *   exportMode: 'named',
   *   debug: true
   * });
   * ```
   */
  constructor(config: ModuleExportOptions) {
    this.config = this.validateAndEnhanceConfig(config)
    this.analyzer = new OptimizedExportAnalyzer(config.debug)
    this.pathCollector = new OptimizedPathCollector()
  }

  /**
   * Main export collection method - optimized version.
   * 
   * This method orchestrates the entire export collection process:
   * 1. Collects all file paths from the root directory
   * 2. Filters and analyzes files with exports
   * 3. Generates optimized export statements
   * 4. Writes the output file
   * 
   * @returns Promise that resolves when export collection is complete
   * 
   * @example
   * ```typescript
   * try {
   *   await exporter.collectExports();
   *   console.log('Export collection completed successfully');
   * } catch (error) {
   *   console.error('Export collection failed:', error);
   * }
   * ```
   */
  async collectExports(): Promise<void> {
    const startTime = Date.now()
    
    try {
      logColoredMessage('🚀 Starting optimized export collection...', 'blue')

      // Step 1: Collect all file paths efficiently
      const allPaths = await this.collectAllPaths()
      
      // Step 2: Filter and analyze files with exports
      const filesWithExports = await this.pathCollector.collectPathsWithExports(
        allPaths,
        this.config.allowedExtensions,
        this.config.ignoredExtensions,
        this.config.debug
      )

      // Step 3: Generate export statements
      const exportContent = await this.generateExportContent(filesWithExports)

      // Step 4: Write output file
      await this.writeOutputFile(exportContent)

      const duration = Date.now() - startTime
      logColoredMessage(`✅ Export collection completed in ${duration}ms`, 'green')
      
      // Log performance statistics
      this.logPerformanceStats()

    } catch (error) {
      logColoredMessage(`❌ Error during export collection: ${error}`, 'red')
      throw error
    }
  }

  /**
   * Collect all file paths from the root directory.
   * 
   * This method recursively traverses the root directory and collects
   * all file paths that match the allowed extensions, excluding
   * specified folders and files.
   * 
   * @returns Promise that resolves to an array of file paths
   * 
   * @example
   * ```typescript
   * const paths = await exporter.collectAllPaths();
   * console.log(`Found ${paths.length} files to analyze`);
   * ```
   */
  private async collectAllPaths(): Promise<string[]> {
    const startTime = Date.now()
    
    if (!fs.existsSync(this.config.rootDir)) {
      throw new Error(`Root directory does not exist: ${this.config.rootDir}`)
    }

    const paths: string[] = []
    const excludedFolders = new Set(this.config.excludedFolders)
    const allowedExtensions = new Set(this.config.allowedExtensions)

    const collectPaths = (dir: string): void => {
      try {
        const items = fs.readdirSync(dir)
        
        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stat = fs.statSync(fullPath)
          
          if (stat.isDirectory()) {
            // Skip excluded directories
            if (!excludedFolders.has(item)) {
              collectPaths(fullPath)
            }
          } else if (stat.isFile()) {
            const extension = path.extname(fullPath)
            if (allowedExtensions.has(extension)) {
              paths.push(fullPath)
            }
          }
        }
      } catch (error) {
        // Skip directories that can't be read
        if (this.config.debug) {
          logColoredMessage(`⚠️  Skipping directory ${dir}: ${error}`, 'yellow')
        }
      }
    }

    collectPaths(this.config.rootDir)

    if (this.config.debug) {
      const duration = Date.now() - startTime
      logColoredMessage(`📁 Collected ${paths.length} files in ${duration}ms`, 'blue')
    }

    return paths
  }

  /**
   * Generate export content from files with exports.
   * 
   * This method analyzes all files with exports and generates
   * optimized import and export statements based on the configuration.
   * 
   * @param filesWithExports - Array of file paths that contain exports
   * @returns Promise that resolves to the generated export content
   * 
   * @example
   * ```typescript
   * const files = ['./src/comp1.ts', './src/comp2.tsx'];
   * const content = await exporter.generateExportContent(files);
   * console.log('Generated content:', content);
   * ```
   */
  private async generateExportContent(filesWithExports: string[]): Promise<string> {
    const startTime = Date.now()
    
    // Analyze all files in parallel
    const analyses = await this.analyzer.analyzeFiles(filesWithExports)
    
    // Generate export statements
    const exportStatements: string[] = []
    const importStatements: string[] = []

    for (const filePath of filesWithExports) {
      const analysis = analyses.get(filePath)
      if (!analysis) continue

      const relativePath = path.relative(this.config.rootDir, filePath)
      const importPath = this.getImportPath(relativePath)

      // Generate import statement
      if (this.config.exportMode === 'named' || this.config.exportMode === 'both') {
        if (analysis.hasNamedExports && analysis.exportNames.length > 0) {
          importStatements.push(`import { ${analysis.exportNames.join(', ')} } from '${importPath}'`)
          exportStatements.push(`export { ${analysis.exportNames.join(', ')} } from '${importPath}'`)
        }
      }

      // Generate default export
      if (this.config.exportMode === 'default' || this.config.exportMode === 'both') {
        if (analysis.hasDefaultExport) {
          const defaultName = this.getDefaultExportName(relativePath)
          importStatements.push(`import ${defaultName} from '${importPath}'`)
          exportStatements.push(`export default ${defaultName}`)
        }
      }
    }

    // Combine all statements
    const content = [
      '// Auto-generated export file',
      '// Generated by @devlander/collect-exports-for-bundle',
      '',
      ...importStatements,
      '',
      ...exportStatements,
      ''
    ].join('\n')

    if (this.config.debug) {
      const duration = Date.now() - startTime
      logColoredMessage(`📝 Generated export content in ${duration}ms`, 'blue')
    }

    return content
  }

  /**
   * Write the output file with generated export content.
   * 
   * This method creates the output directory if it doesn't exist
   * and writes the generated export content to the specified file.
   * 
   * @param content - The export content to write to the file
   * @returns Promise that resolves when the file is written
   * 
   * @example
   * ```typescript
   * const content = 'export { MyComponent } from "./MyComponent";';
   * await exporter.writeOutputFile(content);
   * ```
   */
  private async writeOutputFile(content: string): Promise<void> {
    const outputPath = path.join(
      this.config.rootDir,
      `${this.config.outputFileName}${this.config.outputFilenameExtension}`
    )

    // Ensure directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write file
    fs.writeFileSync(outputPath, content, 'utf8')

    if (this.config.debug) {
      logColoredMessage(`💾 Written to: ${outputPath}`, 'green')
    }
  }

  /**
   * Get import path from relative path.
   * 
   * This method converts a relative file path to an import path
   * by removing the file extension and converting Windows path
   * separators to forward slashes.
   * 
   * @param relativePath - The relative path to convert
   * @returns The import path suitable for import statements
   * 
   * @example
   * ```typescript
   * const importPath = exporter.getImportPath('./components/Button.tsx');
   * console.log(importPath); // './components/Button'
   * ```
   */
  private getImportPath(relativePath: string): string {
    const extension = path.extname(relativePath)
    const basePath = relativePath.replace(extension, '')
    
    // Convert Windows path separators
    return basePath.replace(/\\/g, '/')
  }

  /**
   * Get default export name from file path.
   * 
   * This method generates a default export name by capitalizing
   * the first letter of the filename (without extension).
   * 
   * @param relativePath - The relative path to extract the name from
   * @returns The default export name
   * 
   * @example
   * ```typescript
   * const name = exporter.getDefaultExportName('./components/button.tsx');
   * console.log(name); // 'Button'
   * ```
   */
  private getDefaultExportName(relativePath: string): string {
    const fileName = path.basename(relativePath, path.extname(relativePath))
    return fileName.charAt(0).toUpperCase() + fileName.slice(1)
  }

  /**
   * Validate and enhance configuration.
   * 
   * This method validates the provided configuration and adds
   * default values for missing properties to ensure the exporter
   * works correctly.
   * 
   * @param config - The configuration to validate and enhance
   * @returns Enhanced configuration with all required properties
   * 
   * @example
   * ```typescript
   * const config = exporter.validateAndEnhanceConfig({
   *   rootDir: './src'
   * });
   * console.log(config.allowedExtensions); // ['.ts', '.tsx']
   * ```
   */
  private validateAndEnhanceConfig(config: ModuleExportOptions): AutoExporterOptions {
    // Add defaults if missing
    const enhancedConfig: AutoExporterOptions = {
      rootDir: config.rootDir || 'src',
      allowedExtensions: config.allowedExtensions || ['.ts', '.tsx'],
      ignoredExtensions: config.ignoredExtensions || ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx'],
      excludedFolders: config.excludedFolders || ['node_modules', 'dist', 'build'],
      outputFileName: config.outputFileName || 'index',
      outputFilenameExtension: config.outputFilenameExtension || '.ts',
      exportMode: config.exportMode || 'named',
      includeIndexes: config.includeIndexes ?? false,
      debug: config.debug ?? false,
      results: {
        title: 'Optimized Export Collection Results',
        description: 'Results from optimized export collection',
        startTime: Date.now(),
        endTime: 0,
        duration: '',
        includedFolders: [],
        includedFiles: [],
        excludedFolders: [],
        excludedFiles: [],
        includedExports: [],
        excludedExports: [],
        withParameters: {
          ignoredExtensions: config.ignoredExtensions || [],
          allowedExtensions: config.allowedExtensions || [],
          excludedFolders: config.excludedFolders || [],
          specificFiles: config.specificFiles || [],
          rootDir: config.rootDir || 'src'
        }
      }
    }

    return enhancedConfig
  }

  /**
   * Log performance statistics.
   * 
   * This method logs cache statistics and other performance metrics
   * when debug mode is enabled.
   * 
   * @example
   * ```typescript
   * exporter.logPerformanceStats();
   * // Output: 📊 Performance Statistics:
   * //         File content cache: 150 entries
   * //         Analysis cache: 150 entries
   * ```
   */
  private logPerformanceStats(): void {
    const cacheStats = this.analyzer.getCacheStats()
    
    if (this.config.debug) {
      logColoredMessage('📊 Performance Statistics:', 'blue')
      logColoredMessage(`  File content cache: ${cacheStats.fileContentSize} entries`, 'cyan')
      logColoredMessage(`  Analysis cache: ${cacheStats.analysisSize} entries`, 'cyan')
    }
  }

  /**
   * Clear all caches to free memory.
   * 
   * This method clears all internal caches to free up memory.
   * Useful when processing large projects or when memory usage
   * becomes a concern.
   * 
   * @example
   * ```typescript
   * exporter.clearCaches();
   * console.log('All caches cleared');
   * ```
   */
  clearCaches(): void {
    this.analyzer.clearCache()
    logColoredMessage('🗑️  All caches cleared', 'yellow')
  }
}

/**
 * Convenience function for backward compatibility.
 * 
 * This function provides a simple interface for using the optimized
 * auto-exporter without creating a class instance directly.
 * 
 * @param config - Configuration options for export collection
 * @returns Promise that resolves when export collection is complete
 * 
 * @example
 * ```typescript
 * await optimizedAutoExporter({
 *   rootDir: './src',
 *   allowedExtensions: ['.ts', '.tsx'],
 *   exportMode: 'both',
 *   debug: true
 * });
 * ```
 */
export async function optimizedAutoExporter(config: ModuleExportOptions): Promise<void> {
  const exporter = new OptimizedAutoExporter(config)
  await exporter.collectExports()
}

export default optimizedAutoExporter 