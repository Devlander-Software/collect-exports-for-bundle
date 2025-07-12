import * as fs from 'fs'
import * as path from 'path'
import { logColoredMessage } from '../../utils/helpers/color-logger'

/**
 * Optimized regex patterns for export detection.
 * Compiled once and reused for better performance.
 */
const EXPORT_PATTERNS = {
  /** Single regex for all export types - much faster than multiple regexes */
  ALL_EXPORTS: /export\s+(?:default\s+)?(?:function|const|let|var|class|interface|type|enum)\s+(\w+)/g,
  
  /** Named exports pattern */
  NAMED_EXPORTS: /export\s*\{([^}]+)\}/g,
  
  /** Default exports pattern */
  DEFAULT_EXPORTS: /export\s+default\s+(?:function|const|let|var|class|enum)\s+(\w+)/g,
  
  /** Type exports pattern */
  TYPE_EXPORTS: /export\s+(?:type|interface)\s+(\w+)/g,
  
  /** Re-export patterns */
  RE_EXPORTS: /export\s*\{[^}]*\}\s+from\s+['"][^'"]+['"]/g
} as const

/**
 * Cache for file content and analysis results to improve performance.
 * Implements LRU-style cache management to prevent memory leaks.
 */
class ExportAnalysisCache {
  /** Cache for file content to avoid repeated file system reads */
  private fileContentCache = new Map<string, string>()
  /** Cache for analysis results to avoid repeated parsing */
  private analysisCache = new Map<string, ExportAnalysis>()
  /** Maximum number of entries in each cache */
  private maxCacheSize = 1000

  /**
   * Get file content from cache or read from file system.
   * @param filePath - The path to the file
   * @returns The file content as a string
   */
  getFileContent(filePath: string): string {
    if (this.fileContentCache.has(filePath)) {
      return this.fileContentCache.get(filePath)!
    }

    const content = fs.readFileSync(filePath, 'utf8')
    
    // Cache management - remove oldest entry if cache is full
    if (this.fileContentCache.size >= this.maxCacheSize) {
      const firstKey = this.fileContentCache.keys().next().value
      this.fileContentCache.delete(firstKey)
    }
    
    this.fileContentCache.set(filePath, content)
    return content
  }

  /**
   * Get cached analysis result for a file.
   * @param filePath - The path to the file
   * @returns The cached analysis or null if not found
   */
  getAnalysis(filePath: string): ExportAnalysis | null {
    return this.analysisCache.get(filePath) || null
  }

  /**
   * Store analysis result in cache.
   * @param filePath - The path to the file
   * @param analysis - The analysis result to cache
   */
  setAnalysis(filePath: string, analysis: ExportAnalysis): void {
    if (this.analysisCache.size >= this.maxCacheSize) {
      const firstKey = this.analysisCache.keys().next().value
      this.analysisCache.delete(firstKey)
    }
    this.analysisCache.set(filePath, analysis)
  }

  /**
   * Clear all caches to free memory.
   */
  clear(): void {
    this.fileContentCache.clear()
    this.analysisCache.clear()
  }
}

/**
 * Interface representing the analysis result of a file's exports.
 */
interface ExportAnalysis {
  /** Whether the file has any exports */
  hasExports: boolean
  /** Whether the file has a default export */
  hasDefaultExport: boolean
  /** Whether the file has named exports */
  hasNamedExports: boolean
  /** Array of all export names found in the file */
  exportNames: string[]
  /** Array of type export names */
  exportTypes: string[]
  /** Array of function names that are exported */
  functionNames: string[]
  /** Array of type names that are exported */
  typeNames: string[]
  /** Number of lines in the file */
  lineCount: number
  /** File size in bytes */
  fileSize: number
}

/**
 * Ultra-fast export analyzer with caching and optimized algorithms.
 * 
 * This class provides high-performance analysis of TypeScript/JavaScript files
 * to detect and extract export information. It uses:
 * - Optimized regex patterns for fast parsing
 * - Caching to avoid repeated analysis
 * - Batch processing for parallel execution
 * - Single-pass analysis algorithms
 * 
 * @example
 * ```typescript
 * const analyzer = new OptimizedExportAnalyzer(true); // Enable debug mode
 * const analysis = analyzer.analyzeFile('./src/myComponent.ts');
 * console.log(analysis.exportNames); // ['MyComponent', 'MyType']
 * ```
 */
export class OptimizedExportAnalyzer {
  /** Cache instance for storing file content and analysis results */
  private cache = new ExportAnalysisCache()
  /** Whether to enable debug logging */
  private debug: boolean

  /**
   * Create a new OptimizedExportAnalyzer instance.
   * @param debug - Whether to enable debug logging (default: false)
   */
  constructor(debug = false) {
    this.debug = debug
  }

  /**
   * Analyze a single file for exports - optimized version.
   * 
   * This method checks the cache first, and if no cached result exists,
   * performs a full analysis of the file content using optimized regex patterns.
   * 
   * @param filePath - The path to the file to analyze
   * @returns Analysis result containing export information
   * 
   * @example
   * ```typescript
   * const analysis = analyzer.analyzeFile('./src/components/Button.tsx');
   * if (analysis.hasDefaultExport) {
   *   console.log('File has default export');
   * }
   * ```
   */
  analyzeFile(filePath: string): ExportAnalysis {
    // Check cache first
    const cached = this.cache.getAnalysis(filePath)
    if (cached) {
      if (this.debug) {
        logColoredMessage(`📋 Cache hit for: ${filePath}`, 'green')
      }
      return cached
    }

    const startTime = Date.now()
    const content = this.cache.getFileContent(filePath)
    const analysis = this.analyzeContent(content, filePath)
    
    // Cache the result
    this.cache.setAnalysis(filePath, analysis)

    if (this.debug) {
      const duration = Date.now() - startTime
      logColoredMessage(`⚡ Analyzed ${filePath} in ${duration}ms`, 'blue')
    }

    return analysis
  }

  /**
   * Analyze multiple files in parallel - much faster than sequential processing.
   * 
   * This method processes files in batches to optimize memory usage and
   * provides parallel execution for better performance.
   * 
   * @param filePaths - Array of file paths to analyze
   * @returns Map of file paths to their analysis results
   * 
   * @example
   * ```typescript
   * const filePaths = ['./src/comp1.ts', './src/comp2.ts', './src/comp3.ts'];
   * const results = await analyzer.analyzeFiles(filePaths);
   * results.forEach((analysis, filePath) => {
   *   console.log(`${filePath}: ${analysis.exportNames.length} exports`);
   * });
   * ```
   */
  async analyzeFiles(filePaths: string[]): Promise<Map<string, ExportAnalysis>> {
    const results = new Map<string, ExportAnalysis>()
    
    // Process files in batches for optimal performance
    const batchSize = 50
    const batches = this.chunkArray(filePaths, batchSize)

    for (const batch of batches) {
      const batchPromises = batch.map(async (filePath) => {
        try {
          const analysis = this.analyzeFile(filePath)
          return { filePath, analysis }
        } catch (error) {
          if (this.debug) {
            logColoredMessage(`❌ Error analyzing ${filePath}: ${error}`, 'red')
          }
          return null
        }
      })

      const batchResults = await Promise.all(batchPromises)
      
      for (const result of batchResults) {
        if (result) {
          results.set(result.filePath, result.analysis)
        }
      }
    }

    return results
  }

  /**
   * Get files with exports - optimized version.
   * 
   * This method analyzes all provided files and returns only those that
   * contain exports, using parallel processing for better performance.
   * 
   * @param filePaths - Array of file paths to check
   * @returns Array of file paths that contain exports
   * 
   * @example
   * ```typescript
   * const allFiles = ['./src/file1.ts', './src/file2.ts', './src/file3.ts'];
   * const filesWithExports = await analyzer.getFilesWithExports(allFiles);
   * console.log(`Found ${filesWithExports.length} files with exports`);
   * ```
   */
  async getFilesWithExports(filePaths: string[]): Promise<string[]> {
    const startTime = Date.now()
    
    // Analyze all files in parallel
    const analyses = await this.analyzeFiles(filePaths)
    
    // Filter files with exports
    const filesWithExports = filePaths.filter(filePath => {
      const analysis = analyses.get(filePath)
      return analysis?.hasExports || false
    })

    if (this.debug) {
      const duration = Date.now() - startTime
      logColoredMessage(`⚡ Found ${filesWithExports.length} files with exports in ${duration}ms`, 'green')
    }

    return filesWithExports
  }

  /**
   * Optimized content analysis using single-pass regex.
   * 
   * This method performs a comprehensive analysis of file content using
   * pre-compiled regex patterns to detect all types of exports in a single pass.
   * 
   * @param content - The file content to analyze
   * @param filePath - The file path (for logging purposes)
   * @returns Analysis result with export information
   */
  private analyzeContent(content: string, filePath: string): ExportAnalysis {
    const lineCount = content.split('\n').length
    const fileSize = Buffer.byteLength(content, 'utf8')

    // Single-pass analysis for all export types
    const allMatches = [...content.matchAll(EXPORT_PATTERNS.ALL_EXPORTS)]
    const namedMatches = [...content.matchAll(EXPORT_PATTERNS.NAMED_EXPORTS)]
    const defaultMatches = [...content.matchAll(EXPORT_PATTERNS.DEFAULT_EXPORTS)]
    const typeMatches = [...content.matchAll(EXPORT_PATTERNS.TYPE_EXPORTS)]
    const reExportMatches = [...content.matchAll(EXPORT_PATTERNS.RE_EXPORTS)]

    // Extract names efficiently
    const exportNames = allMatches.map(match => match[1]).filter(Boolean)
    const functionNames = allMatches
      .filter(match => /function|const|let|var|class|enum/.test(match[0]))
      .map(match => match[1])
      .filter(Boolean)
    const typeNames = typeMatches.map(match => match[1]).filter(Boolean)

    // Parse named exports from export statements
    const namedExportNames: string[] = []
    for (const match of namedMatches) {
      const exportStatement = match[1]
      const names = exportStatement
        .split(',')
        .map(name => name.trim().split(' as ')[0].trim())
        .filter(name => name && !name.startsWith('type '))
      namedExportNames.push(...names)
    }

    const hasDefaultExport = defaultMatches.length > 0 || content.includes('export default')
    const hasNamedExports = namedMatches.length > 0 || reExportMatches.length > 0 || exportNames.length > 0
    const hasExports = hasDefaultExport || hasNamedExports

    return {
      hasExports,
      hasDefaultExport,
      hasNamedExports,
      exportNames: [...new Set([...exportNames, ...namedExportNames])], // Remove duplicates
      exportTypes: typeNames,
      functionNames: [...new Set(functionNames)],
      typeNames: [...new Set(typeNames)],
      lineCount,
      fileSize
    }
  }

  /**
   * Utility to chunk array for batch processing.
   * 
   * @param array - The array to chunk
   * @param size - The size of each chunk
   * @returns Array of chunks
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  /**
   * Clear cache to free memory.
   * 
   * Use this method when you need to free up memory or when you want
   * to ensure fresh analysis results.
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics for monitoring performance.
   * 
   * @returns Object containing cache size information
   * 
   * @example
   * ```typescript
   * const stats = analyzer.getCacheStats();
   * console.log(`File content cache: ${stats.fileContentSize} entries`);
   * console.log(`Analysis cache: ${stats.analysisSize} entries`);
   * ```
   */
  getCacheStats(): { fileContentSize: number; analysisSize: number } {
    return {
      fileContentSize: this.cache.fileContentCache.size,
      analysisSize: this.cache.analysisCache.size
    }
  }
}

/**
 * Optimized file path collector with caching.
 * 
 * This class provides efficient collection of file paths from directories,
 * with built-in caching and filtering capabilities for better performance.
 * 
 * @example
 * ```typescript
 * const collector = new OptimizedPathCollector();
 * const paths = await collector.collectPathsWithExports(
 *   ['./src'], 
 *   ['.ts', '.tsx'], 
 *   ['.test.ts'], 
 *   true
 * );
 * ```
 */
export class OptimizedPathCollector {
  /** Cache for directory path collections */
  private cache = new Map<string, string[]>()
  /** Maximum number of cached directory results */
  private maxCacheSize = 500

  /**
   * Collect paths with exports using optimized analyzer.
   * 
   * This method efficiently filters and analyzes files to find those
   * that contain exports, using parallel processing and caching.
   * 
   * @param paths - Array of file paths to check
   * @param allowedExtensions - Array of file extensions to include
   * @param ignoredExtensions - Array of file extensions to exclude
   * @param debug - Whether to enable debug logging
   * @returns Array of file paths that contain exports
   * 
   * @example
   * ```typescript
   * const allPaths = ['./src/comp1.ts', './src/comp2.tsx', './src/test.ts'];
   * const filesWithExports = await collector.collectPathsWithExports(
   *   allPaths,
   *   ['.ts', '.tsx'],
   *   ['.test.ts', '.spec.ts'],
   *   true
   * );
   * ```
   */
  async collectPathsWithExports(
    paths: string[],
    allowedExtensions: string[],
    ignoredExtensions: string[],
    debug = false
  ): Promise<string[]> {
    const startTime = Date.now()
    
    // Remove duplicates efficiently
    const uniquePaths = [...new Set(paths)]
    
    // Filter by extensions first (faster than analyzing content)
    const validPaths = uniquePaths.filter(path => {
      const extension = path.substring(path.lastIndexOf('.'))
      return allowedExtensions.includes(extension) && 
             !ignoredExtensions.some(ignored => path.includes(ignored))
    })

    if (debug) {
      logColoredMessage(`📁 Found ${validPaths.length} files with valid extensions`, 'blue')
    }

    // Analyze files for exports
    const analyzer = new OptimizedExportAnalyzer(debug)
    const filesWithExports = await analyzer.getFilesWithExports(validPaths)

    if (debug) {
      const duration = Date.now() - startTime
      logColoredMessage(`⚡ Path collection completed in ${duration}ms`, 'green')
    }

    return filesWithExports
  }

  /**
   * Batch process multiple directories.
   * 
   * This method processes multiple directories in parallel, collecting
   * all files with exports from each directory.
   * 
   * @param directories - Array of directory paths to process
   * @param allowedExtensions - Array of file extensions to include
   * @param ignoredExtensions - Array of file extensions to exclude
   * @param debug - Whether to enable debug logging
   * @returns Map of directory paths to arrays of files with exports
   * 
   * @example
   * ```typescript
   * const directories = ['./src/components', './src/utils', './src/types'];
   * const results = await collector.collectFromMultipleDirectories(
   *   directories,
   *   ['.ts', '.tsx'],
   *   ['.test.ts'],
   *   true
   * );
   * results.forEach((files, dir) => {
   *   console.log(`${dir}: ${files.length} files with exports`);
   * });
   * ```
   */
  async collectFromMultipleDirectories(
    directories: string[],
    allowedExtensions: string[],
    ignoredExtensions: string[],
    debug = false
  ): Promise<Map<string, string[]>> {
    const results = new Map<string, string[]>()
    
    // Process directories in parallel
    const promises = directories.map(async (dir) => {
      try {
        const paths = await this.collectPathsFromDirectory(dir, allowedExtensions, ignoredExtensions)
        const filesWithExports = await this.collectPathsWithExports(paths, allowedExtensions, ignoredExtensions, debug)
        return { directory: dir, files: filesWithExports }
      } catch (error) {
        if (debug) {
          logColoredMessage(`❌ Error processing directory ${dir}: ${error}`, 'red')
        }
        return { directory: dir, files: [] }
      }
    })

    const resultsArray = await Promise.all(promises)
    
    for (const result of resultsArray) {
      results.set(result.directory, result.files)
    }

    return results
  }

  /**
   * Collect all file paths from a directory.
   * 
   * This method recursively traverses a directory and collects all file paths
   * that match the specified extensions, with caching for better performance.
   * 
   * @param directory - The directory path to traverse
   * @param allowedExtensions - Array of file extensions to include
   * @param ignoredExtensions - Array of file extensions to exclude
   * @returns Array of file paths found in the directory
   */
  private async collectPathsFromDirectory(
    directory: string,
    allowedExtensions: string[],
    ignoredExtensions: string[]
  ): Promise<string[]> {
    const cacheKey = `${directory}:${allowedExtensions.join(',')}:${ignoredExtensions.join(',')}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    const paths: string[] = []
    
    const collectPaths = (dir: string): void => {
      try {
        const items = fs.readdirSync(dir)
        
        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stat = fs.statSync(fullPath)
          
          if (stat.isDirectory()) {
            // Skip ignored directories
            if (!ignoredExtensions.some(ignored => item.includes(ignored))) {
              collectPaths(fullPath)
            }
          } else if (stat.isFile()) {
            const extension = path.extname(fullPath)
            if (allowedExtensions.includes(extension)) {
              paths.push(fullPath)
            }
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    }

    collectPaths(directory)

    // Cache management
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    this.cache.set(cacheKey, paths)
    return paths
  }
} 