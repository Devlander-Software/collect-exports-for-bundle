# Improved Configuration System

The enhanced configuration system makes it easier and more accurate to set up the package for different use cases.

## 🚀 Quick Start with Presets

### Available Presets

```typescript
import { showAvailablePresets, createConfigFromPreset } from '@devlander/collect-exports-for-bundle'

// See all available presets
showAvailablePresets()
```

**Available Presets:**
- `react` - React/TypeScript project
- `nodeLibrary` - Node.js library with TypeScript
- `designSystem` - Component library with multiple platforms
- `monorepo` - Package within a monorepo structure
- `utility` - Collection of utility functions
- `apiClient` - API client library with types

### Using Presets

```typescript
import autoExporter, { createConfigFromPreset } from '@devlander/collect-exports-for-bundle'

// Quick setup for React project
const config = createConfigFromPreset('react', {
  rootDir: './src',
  outputFileName: 'exports'
})

await autoExporter(config)
```

## 🔧 Enhanced Configuration with Validation

### Basic Usage

```typescript
import { EnhancedConfig } from '@devlander/collect-exports-for-bundle'

const enhancedConfig = new EnhancedConfig({
  validate: true,    // Validate configuration
  autoFix: true,     // Auto-fix common issues
  debug: false       // Show debug information
})

// Create config from preset with validation
const config = enhancedConfig.createConfig('designSystem', {
  rootDir: './src/components',
  outputFileName: 'component-exports'
})

// Print configuration summary
enhancedConfig.printConfigSummary(config)

await autoExporter(config)
```

### Manual Configuration with Auto-Fixing

```typescript
const enhancedConfig = new EnhancedConfig({
  validate: true,
  autoFix: true
})

// Manual config with missing fields (will be auto-fixed)
const manualConfig = {
  rootDir: './src'
  // Missing allowedExtensions, ignoredExtensions, etc.
}

const fixedConfig = enhancedConfig.createConfig(manualConfig)
await autoExporter(fixedConfig)
```

## 📋 Configuration Presets Details

### React/TypeScript Preset

```typescript
const reactConfig = createConfigFromPreset('react')
// Equivalent to:
{
  rootDir: 'src',
  allowedExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  ignoredExtensions: ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx', '.stories.ts', '.stories.tsx'],
  excludedFolders: ['node_modules', 'dist', 'build', 'coverage'],
  outputFileName: 'index',
  outputFilenameExtension: '.ts',
  exportMode: 'named',
  includeIndexes: false
}
```

### Node.js Library Preset

```typescript
const nodeConfig = createConfigFromPreset('nodeLibrary')
// Equivalent to:
{
  rootDir: 'src',
  allowedExtensions: ['.ts', '.js'],
  ignoredExtensions: ['.test.ts', '.test.js', '.spec.ts', '.spec.js'],
  excludedFolders: ['node_modules', 'dist', 'build', 'coverage'],
  outputFileName: 'index',
  outputFilenameExtension: '.ts',
  exportMode: 'both',
  includeIndexes: false
}
```

### Design System Preset

```typescript
const designSystemConfig = createConfigFromPreset('designSystem')
// Equivalent to:
{
  rootDir: 'src',
  allowedExtensions: ['.ts', '.tsx', '.component.ts', '.component.tsx'],
  ignoredExtensions: ['.test.ts', '.test.tsx', '.stories.ts', '.stories.tsx'],
  excludedFolders: ['node_modules', 'dist', 'build', 'storybook-static'],
  outputFileName: 'index',
  outputFilenameExtension: '.ts',
  exportMode: 'named',
  includeIndexes: false
}
```

## 🎯 Common Use Cases

### 1. React Component Library

```typescript
const config = createConfigFromPreset('designSystem', {
  rootDir: './src/components',
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
```

### 2. Utility Library

```typescript
const config = createConfigFromPreset('utility', {
  rootDir: './src',
  allowedExtensions: ['.ts', '.js', '.util.ts', '.helper.ts'],
  ignoredExtensions: ['.test.ts', '.test.js', '.spec.ts', '.spec.js', '.benchmark.ts'],
  exportMode: 'named'
})

await autoExporter(config)
```

### 3. API Client with Types

```typescript
const config = createConfigFromPreset('apiClient', {
  rootDir: './src',
  allowedExtensions: ['.ts', '.type.ts', '.interface.ts', '.api.ts'],
  exportMode: 'both',
  primaryExportFile: 'client.ts'
})

await autoExporter(config)
```

### 4. Monorepo Package

```typescript
const config = createConfigFromPreset('monorepo', {
  rootDir: './packages/my-package/src',
  excludedFolders: [
    'node_modules', 
    'dist', 
    'build', 
    'coverage', 
    '.next', 
    'other-packages'
  ]
})

await autoExporter(config)
```

## 🔍 Configuration Validation

### Validation Features

The enhanced configuration system provides:

1. **Type Validation** - Ensures all fields have correct types
2. **Value Validation** - Checks for valid values and formats
3. **File System Validation** - Verifies directories exist and are accessible
4. **Conflict Detection** - Identifies conflicting settings
5. **Auto-Fixing** - Automatically fixes common configuration issues

### Validation Example

```typescript
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
```

## 🛠️ Auto-Fixing Features

### What Gets Auto-Fixed

1. **Missing allowedExtensions** → Adds `['.ts', '.tsx']`
2. **Missing ignoredExtensions** → Adds `['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx']`
3. **Missing excludedFolders** → Adds `['node_modules', 'dist', 'build']`
4. **Missing exportMode** → Sets to `'named'`
5. **Missing outputFileName** → Sets to `'index'`
6. **Missing outputFilenameExtension** → Sets to `'.ts'`

### Auto-Fix Example

```typescript
const enhancedConfig = new EnhancedConfig({
  validate: true,
  autoFix: true
})

// Minimal config (will be auto-fixed)
const minimalConfig = {
  rootDir: './src'
}

const fixedConfig = enhancedConfig.createConfig(minimalConfig)
// Now includes all necessary defaults

await autoExporter(fixedConfig)
```

## 📊 Configuration Summary

### Print Configuration Summary

```typescript
const enhancedConfig = new EnhancedConfig()
const config = createConfigFromPreset('react')

enhancedConfig.printConfigSummary(config)
// Output:
// 📋 Configuration Summary:
//   Root Directory: src
//   Output File: index.ts
//   Export Mode: named
//   Allowed Extensions: .ts, .tsx, .js, .jsx
//   Ignored Extensions: .test.ts, .test.tsx, .spec.ts, .spec.tsx, .stories.ts, .stories.tsx
//   Excluded Folders: node_modules, dist, build, coverage
//
// 💡 Suggestions:
//   • Consider adding ".component.tsx" for React components
```

## 🎯 Best Practices

### 1. Start with Presets

Always start with a preset that matches your project type, then customize as needed.

### 2. Use Validation

Enable validation to catch configuration errors early.

### 3. Leverage Auto-Fixing

Let the system auto-fix common issues to save time.

### 4. Review Suggestions

Pay attention to the suggestions provided by the configuration system.

### 5. Customize Extensions

Add project-specific extensions to `allowedExtensions` for better control.

## 🔄 Migration from Old Configuration

### Before (Old Way)

```typescript
const config = {
  rootDir: "src",
  allowedExtensions: [".ts", ".tsx"],
  ignoredExtensions: [".test.ts"],
  // Had to manually specify everything
}
```

### After (New Way)

```typescript
// Option 1: Use preset
const config = createConfigFromPreset('react')

// Option 2: Use enhanced config with auto-fixing
const enhancedConfig = new EnhancedConfig({ autoFix: true })
const config = enhancedConfig.createConfig({ rootDir: 'src' })
```

## 🚀 Performance Benefits

The improved configuration system provides:

1. **Faster Setup** - Presets eliminate configuration guesswork
2. **Fewer Errors** - Validation catches issues before runtime
3. **Better Defaults** - Auto-fixing provides sensible defaults
4. **Consistent Results** - Presets ensure consistent behavior across projects
5. **Reduced Maintenance** - Less manual configuration to maintain

## 📝 Summary

The enhanced configuration system makes the package much more user-friendly by:

- **Providing presets** for common use cases
- **Validating configurations** to catch errors early
- **Auto-fixing common issues** to reduce setup time
- **Offering helpful suggestions** for optimization
- **Ensuring consistency** across different project types

This results in a more accurate and reliable initial configuration experience. 