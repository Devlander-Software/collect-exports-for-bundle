import * as path from 'path'
import * as fs from 'fs'

// Import existing utility functions
import { toCamelCase } from './conversions/to-camel-case'
import { createExtensions } from './extensions/create-extensions'
import { collectPathsFromDirectories as collectPathsFromDirectoriesOriginal } from './features/collect-paths/collect-paths-from-directories'
import autoExporter from './features/auto-exporter'

// Advanced export generation with all the powerful features
class AdvancedExportGenerator {
  private config: any
  private cache: Map<string, any>
  private exportCache: Map<string, any>

  constructor(config: any) {
    this.config = config
    this.cache = new Map()
    this.exportCache = new Map()
  }

  // Generate exports with advanced features
  generateAdvancedExports(files: string[], config: any) {
    const result = {
      exports: [] as string[],
      defaultExport: null as string | null,
      bundleObject: null as string[] | null,
      header: [] as string[],
      metadata: {} as any
    }

    // Generate header with metadata
    if (config.generateHeader) {
      result.header = this.generateHeader(config)
    }

    // Generate main exports
    result.exports = this.generateMainExports(files, config)

    // Generate default export if specified
    if (config.defaultExport) {
      result.defaultExport = this.generateDefaultExport(config.defaultExport, config)
    }

    // Generate bundle object if requested
    if (config.generateBundleObject) {
      result.bundleObject = this.generateBundleObject(files, config)
    }

    // Add metadata
    result.metadata = this.generateMetadata(files, config)

    return result
  }

  // Generate header with metadata
  generateHeader(config: any): string[] {
    const header: string[] = []
    header.push('/**')
    
    if (config.title) {
      header.push(` * ${config.title}`)
    }
    
    if (config.description) {
      header.push(` * ${config.description}`)
    }
    
    header.push(' * Generated automatically by @devlander/collect-exports-for-bundle')
    header.push(' */')
    header.push('')
    
    return header
  }

  // Generate main exports with advanced features
  generateMainExports(files: string[], config: any): string[] {
    const exports: string[] = []
    
    // Sort files if requested
    if (config.sortExports) {
      files = this.sortFiles(files, config.sortStrategy)
    }

    files.forEach(file => {
      const relativePath = path.relative(path.dirname(config.output), file)
      const cleanPath = relativePath.replace(/\\/g, '/').replace(/\.[^/.]+$/, '')
      
      // Check for circular dependencies
      if (config.checkCircularDependencies) {
        if (this.hasCircularDependency(file, config)) {
          console.warn(`Warning: Potential circular dependency detected in ${file}`)
        }
      }

      // Validate path if requested
      if (config.validatePaths) {
        if (!this.validatePath(file, config)) {
          console.warn(`Warning: Path validation failed for ${file}`)
        }
      }

      // Generate export based on strategy
      const exportStatement = this.generateExportStatement(cleanPath, file, config)
      exports.push(exportStatement)
    })

    return exports
  }

  // Generate export statement with advanced options
  generateExportStatement(cleanPath: string, file: string, config: any): string {
    const fileName = path.basename(cleanPath)
    
    // Set default exportStrategy if none specified
    const exportStrategy = config.exportStrategy || 'both'
    
    // Check export style first
    if (config.exportStyle === 'cjs') {
      // Generate CommonJS format
      switch (exportStrategy) {
        case 'named':
          return `  ${fileName}: require('./${cleanPath}'),`
        case 'default':
          return `  ${fileName}: require('./${cleanPath}'),`
        case 'both':
          return `  ${fileName}: require('./${cleanPath}'),`
        case 'selective':
          return `  ${fileName}: require('./${cleanPath}'),`
        default:
          return `  ${fileName}: require('./${cleanPath}'),`
      }
    } else {
      // Generate ES module format
      switch (exportStrategy) {
        case 'named':
          return `export { ${fileName} } from './${cleanPath}';`
        case 'default':
          return `export { default as ${fileName} } from './${cleanPath}';`
        case 'both':
          return `export * from './${cleanPath}';`
        case 'selective':
          return this.generateSelectiveExport(cleanPath, file, config)
        default:
          return `export * from './${cleanPath}';`
      }
    }
  }

  // Generate selective exports based on file content analysis
  generateSelectiveExport(cleanPath: string, file: string, config: any): string {
    try {
      const content = fs.readFileSync(file, 'utf-8')
      const exports = this.analyzeFileExports(content)
      
      if (exports.default && exports.named.length > 0) {
        return `export { default, ${exports.named.join(', ')} } from './${cleanPath}';`
      } else if (exports.default) {
        return `export { default } from './${cleanPath}';`
      } else if (exports.named.length > 0) {
        return `export { ${exports.named.join(', ')} } from './${cleanPath}';`
      } else {
        return `export * from './${cleanPath}';`
      }
    } catch (error) {
      // Fallback to wildcard export
      return `export * from './${cleanPath}';`
    }
  }

  // Analyze file exports
  analyzeFileExports(content: string) {
    const exports = {
      default: false,
      named: [] as string[]
    }

    // Check for default export
    if (content.includes('export default') || content.includes('module.exports =')) {
      exports.default = true
    }

    // Check for named exports
    const namedExportMatches = content.match(/export\s+(?:const|let|var|function|class)\s+(\w+)/g)
    if (namedExportMatches) {
      namedExportMatches.forEach(match => {
        const name = match.match(/(?:const|let|var|function|class)\s+(\w+)/)?.[1]
        if (name) exports.named.push(name)
      })
    }

    return exports
  }

  // Generate default export
  generateDefaultExport(defaultExportPath: string, config: any): string {
    const defaultPath = path.relative(path.dirname(config.output), path.resolve(config.rootDir, defaultExportPath))
    const cleanDefaultPath = defaultPath.replace(/\\/g, '/').replace(/\.[^/.]+$/, '')
    
    if (config.exportStyle === 'cjs') {
      return `  default: require('./${cleanDefaultPath}'),`
    } else {
      return `export { default } from './${cleanDefaultPath}';`
    }
  }

  // Generate bundle object
  generateBundleObject(files: string[], config: any): string[] {
    const bundleExports: string[] = []
    
    files.forEach(file => {
      const relativePath = path.relative(path.dirname(config.output), file)
      const cleanPath = relativePath.replace(/\\/g, '/').replace(/\.[^/.]+$/, '')
      const moduleName = path.basename(cleanPath)
      
      if (config.exportStyle === 'cjs') {
        bundleExports.push(`  ${moduleName}: require('./${cleanPath}'),`)
      } else {
        bundleExports.push(`export { ${moduleName} } from './${cleanPath}';`)
      }
    })

    return bundleExports
  }

  // Generate metadata
  generateMetadata(files: string[], config: any) {
    return {
      totalFiles: files.length,
      exportStyle: config.exportStyle,
      exportStrategy: config.exportStrategy,
      hasDefaultExport: !!config.defaultExport,
      hasBundleObject: config.generateBundleObject,
      generatedAt: new Date().toISOString()
    }
  }

  // Sort files based on strategy
  sortFiles(files: string[], strategy: string): string[] {
    const sortedFiles = [...files]
    
    switch (strategy) {
      case 'alphabetical':
        return sortedFiles.sort((a, b) => path.basename(a).localeCompare(path.basename(b)))
      case 'type':
        return sortedFiles.sort((a, b) => {
          const extA = path.extname(a)
          const extB = path.extname(b)
          return extA.localeCompare(extB)
        })
      case 'size':
        return sortedFiles.sort((a, b) => {
          try {
            const statA = fs.statSync(a)
            const statB = fs.statSync(b)
            return statA.size - statB.size
          } catch {
            return 0
          }
        })
      default:
        return sortedFiles
    }
  }

  // Check for circular dependencies
  hasCircularDependency(file: string, config: any): boolean {
    try {
      const content = fs.readFileSync(file, 'utf-8')
      const imports = content.match(/from\s+['"]([^'"]+)['"]/g) || []
      
      // Simple circular dependency check
      // In a real implementation, you'd want more sophisticated detection
      return imports.some(imp => {
        const importPath = imp.replace(/from\s+['"]/, '').replace(/['"]$/, '')
        return importPath.includes(path.basename(config.output, path.extname(config.output)))
      })
    } catch {
      return false
    }
  }

  // Validate file path
  validatePath(file: string, config: any): boolean {
    try {
      const stat = fs.statSync(file)
      return stat.isFile()
    } catch {
      return false
    }
  }

  // Performance caching
  getCachedResult(key: string): any {
    if (this.config.enableCaching && this.cache.has(key)) {
      return this.cache.get(key)
    }
    return null
  }

  setCachedResult(key: string, result: any): void {
    if (this.config.enableCaching) {
      this.cache.set(key, result)
    }
  }

  // Parallel processing for large file sets
  async processFilesInParallel(files: string[], config: any, batchSize = 10): Promise<any[]> {
    if (!config.parallelProcessing || files.length <= batchSize) {
      return files.map(file => this.processFile(file, config))
    }

    const results: any[] = []
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize)
      const batchPromises = batch.map(file => this.processFile(file, config))
      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)
    }
    
    return results
  }

  // Process individual file
  processFile(file: string, config: any): any {
    const cacheKey = `${file}-${JSON.stringify(config)}`
    const cached = this.getCachedResult(cacheKey)
    
    if (cached) {
      return cached
    }

    const result = {
      file,
      processed: true,
      timestamp: Date.now()
    }

    this.setCachedResult(cacheKey, result)
    return result
  }
}

// Simple interface functions for backward compatibility
function generateESMExports(files: string[], config: any) {
  // Ensure config has proper export style for ESM
  const esmConfig = { ...config, exportStyle: 'esm' }
  const generator = new AdvancedExportGenerator(esmConfig)
  const result = generator.generateAdvancedExports(files, esmConfig)
  
  // Handle default export
  let exports = [...result.exports]
  if (config.defaultExport && result.defaultExport) {
    exports.push(result.defaultExport)
  }
  
  return { exports }
}

function generateCJSExports(files: string[], config: any) {
  // Ensure config has proper export style for CJS
  const cjsConfig = { ...config, exportStyle: 'cjs' }
  const generator = new AdvancedExportGenerator(cjsConfig)
  const result = generator.generateAdvancedExports(files, cjsConfig)
  
  // Handle default export for CJS
  let requires = [...result.exports]
  if (config.defaultExport && result.defaultExport) {
    requires.push(result.defaultExport)
  }
  
  return { requires }
}

function generateMixedExports(files: string[], config: any) {
  // Ensure config has proper export style for mixed
  const mixedConfig = { ...config, exportStyle: 'mixed' }
  const generator = new AdvancedExportGenerator(mixedConfig)
  const result = generator.generateAdvancedExports(files, mixedConfig)
  
  // Handle default export
  let exports = [...result.exports]
  if (config.defaultExport && result.defaultExport) {
    exports.push(result.defaultExport)
  }
  
  return { exports }
}

// Format functions
function formatESMOutput(exportOutput: any): string {
  return exportOutput.exports.join('\n') + '\n'
}

function formatCJSOutput(exportOutput: any): string {
  return `module.exports = {\n${exportOutput.requires.join('\n')}\n};\n`
}

function formatMixedOutput(exportOutput: any): string {
  return exportOutput.exports.join('\n') + '\n'
}

// Advanced formatting with all features
function formatAdvancedOutput(exportOutput: any, config: any): string {
  let output = ''
  
  // Add header
  if (exportOutput.header && exportOutput.header.length > 0) {
    output += exportOutput.header.join('\n') + '\n'
  }
  
  // Add main exports
  if (config.exportStyle === 'cjs') {
    output += `module.exports = {\n${exportOutput.exports.join('\n')}\n};\n`
  } else {
    output += exportOutput.exports.join('\n') + '\n'
  }
  
  // Add default export if separate
  if (exportOutput.defaultExport && config.exportStyle !== 'cjs') {
    output += exportOutput.defaultExport + '\n'
  }
  
  // Add bundle object if generated
  if (exportOutput.bundleObject && config.generateBundleObject) {
    if (config.exportStyle === 'cjs') {
      output += '\n// Bundle object\n'
      output += `module.exports.bundle = {\n${exportOutput.bundleObject.join('\n')}\n};\n`
    } else {
      output += '\n// Bundle exports\n'
      output += exportOutput.bundleObject.join('\n') + '\n'
    }
  }
  
  return output
}

// Wrapper function for collectPathsFromDirectories that uses the existing implementation
async function collectPathsFromDirectories(rootDir: string, options: any = {}): Promise<string[]> {
  const {
    allowedExtensions = ['.ts', '.tsx', '.js', '.jsx'],
    ignoredExtensions = [],
    excludedFolders = ['node_modules', '__mocks__', 'tests'],
    debug = false
  } = options;

  const config = {
    rootDir,
    allowedExtensions,
    ignoredExtensions,
    excludedFolders,
    debug
  };

  // Use the existing implementation
  return collectPathsFromDirectoriesOriginal(rootDir, config);
}

// Wrapper function for collectExportsForBundle that uses the existing implementation
async function collectExportsForBundle(config: any) {
  try {
    await autoExporter(config);
    
    // Return a result object for compatibility
    return {
      files: [],
      exports: {},
      formatted: 'Generated using existing autoExporter'
    };
  } catch (error) {
    throw error;
  }
}

// Default export function for backward compatibility
async function autoExporterWrapper(config: any) {
  return autoExporter(config);
}

export {
  AdvancedExportGenerator,
  generateESMExports,
  generateCJSExports,
  generateMixedExports,
  formatESMOutput,
  formatCJSOutput,
  formatMixedOutput,
  formatAdvancedOutput,
  // Programmatic API functions
  createExtensions,
  collectExportsForBundle,
  collectPathsFromDirectories,
  toCamelCase,
  // Default export for backward compatibility
  autoExporterWrapper as default
}
