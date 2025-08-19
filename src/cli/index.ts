const { Command } = require('commander')
const fs = require('fs')
const path = require('path')

// Import functions from the main package
const pkg = require('../index.js')
const { 
  toCamelCase, 
  createExtensions, 
  collectPaths,
  generateESMExports,
  generateCJSExports,
  generateMixedExports
} = pkg
const autoExporter = pkg.default

const program = new Command()

program
  .name('collect-exports')
  .description('Generate index file with exports from a directory')
  .version('2.0.0')

// Main command - simple and focused
program
  .command('generate')
  .description('Generate index file with exports')
  .argument('<source>', 'Source directory to scan')
  .option('-o, --output <file>', 'Output file path', 'index.ts')
  .option('-s, --style <style>', 'Export style: esm, cjs, mixed', 'esm')
  .option('-d, --default-export <file>', 'File to use as default export')
  .option('-e, --extensions <extensions>', 'File extensions to include (comma-separated)', '.ts,.tsx,.js,.jsx')
  .option('--exclude <folders>', 'Folders to exclude (comma-separated)', 'node_modules,__mocks__,tests')
  .option('--dry-run', 'Show what would be generated without writing files')
  .option('--debug', 'Enable debug logging')
  
  // Advanced features
  .option('--strategy <strategy>', 'Export strategy: named, default, both, selective', 'both')
  .option('--sort <sort>', 'Sort strategy: alphabetical, type, size', 'alphabetical')
  .option('--title <title>', 'Title for generated header')
  .option('--description <description>', 'Description for generated header')
  .option('--header', 'Generate header with metadata')
  .option('--bundle-object', 'Generate bundle object exports')
  .option('--validate-paths', 'Validate export paths exist')
  .option('--check-circular', 'Check for circular dependencies')
  .option('--cache', 'Enable performance caching')
  .option('--parallel', 'Enable parallel processing')
  .option('--fail-on-errors', 'Fail build on validation errors')
  .action(async (source: string, options: any) => {
    try {
      await generateIndexFile(source, options)
    } catch (error: any) {
      console.error('Error:', error.message)
      process.exit(1)
    }
  })

// Main function - simple and focused
async function generateIndexFile(source: string, options: any): Promise<void> {
  // Ensure source directory exists
  if (!fs.existsSync(source)) {
    throw new Error(`Source directory does not exist: ${source}`)
  }

  // Validate export style
  const validStyles = ['esm', 'cjs', 'mixed']
  if (options.style && !validStyles.includes(options.style)) {
    throw new Error(`Unknown export style: ${options.style}. Valid styles are: ${validStyles.join(', ')}`)
  }

  // Build configuration
  const config = {
    rootDir: source,
    output: options.output,
    outputFileName: path.basename(options.output, path.extname(options.output)),
    outputFilenameExtension: path.extname(options.output),
    exportMode: options.strategy || 'both',
    allowedExtensions: options.extensions?.split(',') || ['.ts', '.tsx', '.js', '.jsx'],
    ignoredExtensions: [],
    excludedFolders: options.exclude?.split(',') || ['node_modules', '__mocks__', 'tests'],
    debug: options.debug,
    
    // Export style control
    exportStyle: options.style || 'esm',
    defaultExport: options.defaultExport,
    
    // Advanced features
    title: options.title,
    description: options.description,
    generateHeader: !!options.header,
    generateBundleObject: !!options.bundleObject,
    validatePaths: !!options.validatePaths,
    checkCircularDependencies: !!options.checkCircular,
    enableCaching: !!options.cache,
    parallelProcessing: !!options.parallel,
    failOnErrors: !!options.failOnErrors
  }

  if (options.debug) {
    console.log('Configuration:')
    console.log(JSON.stringify(config, null, 2))
  }

  // Use the export generation functions directly
  try {
    // First, collect paths from the source directory
    const paths = await collectPaths(source, {
      allowedExtensions: config.allowedExtensions,
      ignoredExtensions: config.ignoredExtensions,
      excludedFolders: config.excludedFolders,
      debug: config.debug
    })
    
    // Generate exports from the collected paths based on export style
    let formattedExports
    if (config.exportStyle === 'cjs') {
      const result = generateCJSExports(paths, config)
      formattedExports = `module.exports = {\n${result.requires.join('\n')}\n}`
    } else if (config.exportStyle === 'mixed') {
      const result = generateMixedExports(paths, config)
      formattedExports = result.exports.join('\n')
    } else {
      // Default to ESM
      const result = generateESMExports(paths, config)
      formattedExports = result.exports.join('\n')
    }
    
    // Write the generated content to the output file
    if (options.dryRun) {
      console.log('Generated exports (dry run):')
      console.log(formattedExports)
    } else {
      // Ensure output directory exists
      const outputDir = path.dirname(options.output)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
      
      // Write the file
      fs.writeFileSync(options.output, formattedExports)
      
      console.log(`Index file generated successfully: ${options.output}`)
    }
    
    if (options.debug) {
      console.log(`Found ${paths.length} files to process`)
      
      if (options.title) {
        console.log(`Title: ${options.title}`)
      }
      
      if (options.description) {
        console.log(`Description: ${options.description}`)
      }
      
      // Demonstrate using other functions
      console.log('\nDemonstrating other functions:')
      console.log('toCamelCase("test-string"):', toCamelCase('test-string'))
      console.log('createExtensions("web", ["props"], [".ts"]):', createExtensions('web', ["props"], [".ts"]).slice(0, 3))
    }
    
  } catch (error: any) {
    throw new Error(`Failed to generate exports: ${error.message}`)
  }
}

// Parse command line arguments
program.parse(process.argv)

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
