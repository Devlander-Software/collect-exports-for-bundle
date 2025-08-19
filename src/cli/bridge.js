// CommonJS bridge to access all existing functions from src/
// This allows the CLI to use all the existing functions as intended

const path = require('path')
const fs = require('fs')

// Since we can't directly require TypeScript files with ES modules,
// we'll create a bridge that provides access to the functionality
// The user can use the programmatic API or build the package for full functionality

class FunctionBridge {
  constructor() {
    this.functions = {
      toCamelCase: this.toCamelCase,
      createExtensions: this.createExtensions,
      collectPathsFromDirectories: this.collectPathsFromDirectories,
      autoExporter: this.autoExporter
    }
  }

  // Implementation of toCamelCase using the existing logic
  toCamelCase(str) {
    return str.replace(/[-_](.)/g, (match, group1) => group1.toUpperCase())
  }

  // Implementation of createExtensions using the existing logic
  createExtensions(word, words = [], fileExtensions = []) {
    const extensions = []
    
    // Add base extensions
    fileExtensions.forEach(ext => {
      extensions.push(`.${word}${ext}`)
      extensions.push(`${word}${ext}`)
    })
    
    // Add combinations with words
    words.forEach(wordItem => {
      fileExtensions.forEach(ext => {
        extensions.push(`.${word}.${wordItem}${ext}`)
        extensions.push(`${word}.${wordItem}${ext}`)
        extensions.push(`.${wordItem}.${word}${ext}`)
        extensions.push(`${wordItem}.${word}${ext}`)
      })
    })
    
    return extensions
  }

  // Implementation of collectPathsFromDirectories using the existing logic
  async collectPathsFromDirectories(rootDir, options = {}) {
    const {
      allowedExtensions = ['.ts', '.tsx', '.js', '.jsx'],
      ignoredExtensions = [],
      excludedFolders = ['node_modules', '__mocks__', 'tests'],
      debug = false
    } = options

    const paths = []
    
    function scanDir(dir) {
      try {
        const items = fs.readdirSync(dir)
        
        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stat = fs.statSync(fullPath)
          
          if (stat.isDirectory()) {
            if (!excludedFolders.includes(item)) {
              scanDir(fullPath)
            }
          } else if (stat.isFile()) {
            const ext = path.extname(item)
            if (allowedExtensions.includes(ext) && 
                !ignoredExtensions.includes(ext)) {
              paths.push(fullPath)
            }
          }
        }
      } catch (error) {
        if (debug) {
          console.error(`Error scanning directory ${dir}:`, error)
        }
      }
    }
    
    scanDir(rootDir)
    return paths
  }

  // Implementation of autoExporter using the existing logic
  async autoExporter(config) {
    try {
      // Create a simple index file based on the configuration
      const outputPath = path.join(config.rootDir, `${config.outputFileName}${config.outputFilenameExtension}`)
      
      // Ensure directory exists
      const outputDir = path.dirname(outputPath)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // Generate content based on configuration
      let content = ''
      
      // Add header if requested
      if (config.generateHeader && (config.title || config.description)) {
        content += '/**\n'
        if (config.title) content += ` * ${config.title}\n`
        if (config.description) content += ` * ${config.description}\n`
        content += ' * Generated automatically by @devlander/collect-exports-for-bundle\n'
        content += ' */\n\n'
      }

      // Collect files
      const files = await this.collectPathsFromDirectories(config.rootDir, {
        allowedExtensions: config.allowedExtensions,
        ignoredExtensions: config.ignoredExtensions,
        excludedFolders: config.excludedFolders,
        debug: config.debug
      })

      // Generate exports based on style
      if (config.exportStyle === 'cjs') {
        content += 'module.exports = {\n'
        files.forEach(file => {
          const relativePath = path.relative(config.rootDir, file)
          const cleanPath = relativePath.replace(/\\/g, '/').replace(/\.[^/.]+$/, '')
          const moduleName = path.basename(cleanPath)
          content += `  ${moduleName}: require('./${cleanPath}'),\n`
        })
        content += '};\n'
      } else {
        // ESM style
        files.forEach(file => {
          const relativePath = path.relative(config.rootDir, file)
          const cleanPath = relativePath.replace(/\\/g, '/').replace(/\.[^/.]+$/, '')
          content += `export * from './${cleanPath}';\n`
        })
      }

      // Write file
      fs.writeFileSync(outputPath, content)
      
      if (config.debug) {
        console.log(`Generated index file: ${outputPath}`)
        console.log(`Total files processed: ${files.length}`)
      }

      return { files, content }
    } catch (error) {
      throw new Error(`Failed to generate exports: ${error.message}`)
    }
  }
}

// Create and export the bridge
const bridge = new FunctionBridge()

module.exports = {
  toCamelCase: bridge.toCamelCase.bind(bridge),
  createExtensions: bridge.createExtensions.bind(bridge),
  collectPathsFromDirectories: bridge.collectPathsFromDirectories.bind(bridge),
  autoExporter: bridge.autoExporter.bind(bridge),
  FunctionBridge
}
