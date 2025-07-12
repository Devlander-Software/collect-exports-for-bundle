import autoExporter, { 
  createConfigFromPreset, 
  showAvailablePresets,
  EnhancedConfig 
} from '@devlander/collect-exports-for-bundle'

/**
 * Enhanced usage examples with the new configuration system
 */

// Example 1: Using presets for quick setup
async function exampleWithPresets() {
  console.log('🚀 Example 1: Using presets for quick setup')
  
  // Show available presets
  showAvailablePresets()
  
  // Use React preset with custom overrides
  const config = createConfigFromPreset('react', {
    rootDir: './src',
    outputFileName: 'exports',
    debug: true
  })
  
  await autoExporter(config)
}

// Example 2: Enhanced configuration with validation
async function exampleWithEnhancedConfig() {
  console.log('🚀 Example 2: Enhanced configuration with validation')
  
  const enhancedConfig = new EnhancedConfig({
    validate: true,
    autoFix: true,
    debug: true
  })
  
  // Create config from preset with validation
  const config = enhancedConfig.createConfig('designSystem', {
    rootDir: './src/components',
    outputFileName: 'component-exports'
  })
  
  // Print configuration summary
  enhancedConfig.printConfigSummary(config)
  
  await autoExporter(config)
}

// Example 3: Manual configuration with auto-fixing
async function exampleWithManualConfig() {
  console.log('🚀 Example 3: Manual configuration with auto-fixing')
  
  const enhancedConfig = new EnhancedConfig({
    validate: true,
    autoFix: true
  })
  
  // Manual config with missing fields (will be auto-fixed)
  const manualConfig = {
    rootDir: './src',
    // Missing allowedExtensions, ignoredExtensions, etc.
  }
  
  const fixedConfig = enhancedConfig.createConfig(manualConfig)
  
  await autoExporter(fixedConfig)
}

// Example 4: Node.js library setup
async function exampleNodeLibrary() {
  console.log('🚀 Example 4: Node.js library setup')
  
  const config = createConfigFromPreset('nodeLibrary', {
    rootDir: './src',
    exportMode: 'both',
    primaryExportFile: 'main.ts'
  })
  
  await autoExporter(config)
}

// Example 5: Monorepo package setup
async function exampleMonorepo() {
  console.log('🚀 Example 5: Monorepo package setup')
  
  const config = createConfigFromPreset('monorepo', {
    rootDir: './packages/my-package/src',
    excludedFolders: ['node_modules', 'dist', 'build', 'coverage', '.next', 'other-packages']
  })
  
  await autoExporter(config)
}

// Example 6: Utility library with custom extensions
async function exampleUtilityLibrary() {
  console.log('🚀 Example 6: Utility library with custom extensions')
  
  const config = createConfigFromPreset('utility', {
    rootDir: './src',
    allowedExtensions: ['.ts', '.js', '.util.ts', '.helper.ts'],
    ignoredExtensions: ['.test.ts', '.test.js', '.spec.ts', '.spec.js', '.benchmark.ts'],
    exportMode: 'named'
  })
  
  await autoExporter(config)
}

// Example 7: API client with types
async function exampleApiClient() {
  console.log('🚀 Example 7: API client with types')
  
  const config = createConfigFromPreset('apiClient', {
    rootDir: './src',
    allowedExtensions: ['.ts', '.type.ts', '.interface.ts', '.api.ts'],
    exportMode: 'both',
    primaryExportFile: 'client.ts'
  })
  
  await autoExporter(config)
}

// Example 8: Design system with multiple platforms
async function exampleDesignSystem() {
  console.log('🚀 Example 8: Design system with multiple platforms')
  
  const config = createConfigFromPreset('designSystem', {
    rootDir: './src',
    allowedExtensions: [
      '.ts', 
      '.tsx', 
      '.component.ts', 
      '.component.tsx',
      '.web.tsx',
      '.native.tsx'
    ],
    ignoredExtensions: [
      '.test.ts', 
      '.test.tsx', 
      '.stories.ts', 
      '.stories.tsx',
      '.spec.ts',
      '.spec.tsx'
    ],
    excludedFolders: [
      'node_modules', 
      'dist', 
      'build', 
      'storybook-static',
      'docs'
    ]
  })
  
  await autoExporter(config)
}

// Example 9: Configuration validation only
async function exampleValidationOnly() {
  console.log('🚀 Example 9: Configuration validation only')
  
  const enhancedConfig = new EnhancedConfig({
    validate: true,
    autoFix: false // Don't auto-fix, just validate
  })
  
  const config = {
    rootDir: './src',
    allowedExtensions: ['.ts', '.tsx'],
    // Missing ignoredExtensions and excludedFolders
  }
  
  const isValid = enhancedConfig.validateConfig(config)
  
  if (!isValid) {
    console.log('❌ Configuration needs manual fixes')
    return
  }
  
  await autoExporter(config)
}

// Example 10: Progressive configuration enhancement
async function exampleProgressiveConfig() {
  console.log('🚀 Example 10: Progressive configuration enhancement')
  
  const enhancedConfig = new EnhancedConfig({
    validate: true,
    autoFix: true,
    debug: true
  })
  
  // Start with minimal config
  let config = {
    rootDir: './src'
  }
  
  // Enhance step by step
  console.log('Step 1: Basic validation')
  enhancedConfig.validateConfig(config)
  
  console.log('Step 2: Auto-fix common issues')
  config = enhancedConfig.autoFixConfig(config)
  
  console.log('Step 3: Add custom overrides')
  config = {
    ...config,
    outputFileName: 'custom-exports',
    exportMode: 'both' as const
  }
  
  console.log('Step 4: Final validation and summary')
  enhancedConfig.validateConfig(config)
  enhancedConfig.printConfigSummary(config)
  
  await autoExporter(config)
}

// Run examples
async function runExamples() {
  try {
    // Uncomment the examples you want to run
    
    // await exampleWithPresets()
    // await exampleWithEnhancedConfig()
    // await exampleWithManualConfig()
    // await exampleNodeLibrary()
    // await exampleMonorepo()
    // await exampleUtilityLibrary()
    // await exampleApiClient()
    // await exampleDesignSystem()
    // await exampleValidationOnly()
    // await exampleProgressiveConfig()
    
    console.log('✅ All examples completed successfully!')
  } catch (error) {
    console.error('❌ Error running examples:', error)
  }
}

// Export for use in other files
export {
  exampleWithPresets,
  exampleWithEnhancedConfig,
  exampleWithManualConfig,
  exampleNodeLibrary,
  exampleMonorepo,
  exampleUtilityLibrary,
  exampleApiClient,
  exampleDesignSystem,
  exampleValidationOnly,
  exampleProgressiveConfig,
  runExamples
}

// Run if this file is executed directly
if (require.main === module) {
  runExamples()
} 