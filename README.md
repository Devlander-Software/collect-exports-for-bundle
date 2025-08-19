# @devlander/collect-exports-for-bundle

<p align="center">
  <a href="https://www.npmjs.com/package/@devlander/collect-exports-for-bundle">
    <img alt="npm" src="https://img.shields.io/npm/v/@devlander/collect-exports-for-bundle?label=version">
  </a>
  <a href="https://www.npmjs.com/package/@devlander/collect-exports-for-bundle">
    <img alt="downloads" src="https://img.shields.io/npm/dm/@devlander/collect-exports-for-bundle">
  </a>
  <a href="https://github.com/devlander/collect-exports-for-bundle/actions">
    <img alt="ci" src="https://img.shields.io/github/actions/workflow/status/devlander/collect-exports-for-bundle/ci.yml?label=ci">
  </a>
  <a href="https://app.codecov.io/gh/devlander/collect-exports-for-bundle">
    <img alt="coverage" src="https://img.shields.io/codecov/c/gh/devlander/collect-exports-for-bundle">
  </a>
  <a href="https://bundlephobia.com/package/@devlander/collect-exports-for-bundle">
    <img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@devlander/collect-exports-for-bundle">
  </a>
  <a href="https://packagephobia.com/result?p=@devlander/collect-exports-for-bundle">
    <img alt="install size" src="https://img.shields.io/packagephobia/install/@devlander/collect-exports-for-bundle">
  </a>
  <a href="https://www.npmjs.com/package/@devlander/collect-exports-for-bundle">
    <img alt="types" src="https://img.shields.io/badge/types-included-informational">
  </a>
  <a href="https://snyk.io/advisor/npm-package/@devlander/collect-exports-for-bundle">
    <img alt="security" src="https://img.shields.io/badge/security-checked-success">
  </a>
  <a href="https://opensource.org/license/mit/">
    <img alt="license" src="https://img.shields.io/npm/l/@devlander/collect-exports-for-bundle">
  </a>
</p>

Generate index files with exports from a directory. Simple, focused, and flexible.

## 📦 **Install**

```bash
npm install @devlander/collect-exports-for-bundle
```

## 🚀 **Quick Start (10 seconds)**

```typescript
import { autoExporter } from '@devlander/collect-exports-for-bundle';

// Generate exports for your src directory
await autoExporter({
  rootDir: './src',
  outputFileName: 'index',
  outputFilenameExtension: '.ts'
});
```

**Output:** `src/index.ts` with all your exports automatically generated!

## 📚 **API Documentation**

📖 **[Full API Documentation](docs/index.html)** - Comprehensive TypeScript API reference

## 🚀 **Advanced Usage**

### **Generate ES Modules Index**
```bash
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts
```

### **Generate CommonJS Index**
```bash
npx @devlander/collect-exports-for-bundle generate src --output src/index.js --style cjs
```

### **Generate with Custom Default Export**
```bash
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --default-export ./Button
```

## ✨ **Features**

- **📁 Simple**: Scan directory, generate index file
- **🎯 Flexible**: Choose export style (ESM, CommonJS, Mixed)
- **⭐ Customizable**: Define your own default export
- **🔧 Configurable**: Control file extensions and excluded folders
- **📦 Bundler Agnostic**: Works with any bundler (Rollup, Webpack, Vite, etc.)
- **🚀 Advanced**: Circular dependency detection, path validation, performance caching
- **⚡ Performance**: Parallel processing, intelligent caching, optimized algorithms
- **🔍 Smart**: TypeScript-specific optimizations, export analysis, bundle object generation
- **📊 Metadata**: Header generation, export sorting, organization strategies

## 📋 **Requirements**

- **Node.js**: >= 16.0.0

## 🎯 **Use Cases**

### **React Component Library**
```bash
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --default-export ./Button
```

**Output:**
```typescript
// src/index.ts
export * from './Button';
export * from './Input';
export * from './Modal';
export * from './utils';
export { default } from './Button';
```

### **Node.js Utility Library**
```bash
npx @devlander/collect-exports-for-bundle generate src --output src/index.js --style cjs --default-export ./main
```

**Output:**
```javascript
// src/index.js
module.exports = {
  Button: require('./Button'),
  Input: require('./Input'),
  Modal: require('./Modal'),
  utils: require('./utils'),
  default: require('./main')
};
```

### **Mixed Export Style**
```bash
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --style mixed --default-export ./Button
```

## 🛠️ **CLI Options**

```bash
npx @devlander/collect-exports-for-bundle generate <source> [options]
```

**Options:**
- `-o, --output <file>`: Output file path (default: index.ts)
- `-s, --style <style>`: Export style: esm, cjs, mixed (default: esm)
- `-d, --default-export <file>`: File to use as default export
- `-e, --extensions <extensions>`: File extensions to include (default: .ts,.tsx,.js,.jsx)
- `--exclude <folders>`: Folders to exclude (default: node_modules,__mocks__,tests)
- `--dry-run`: Show what would be generated without writing files
- `--debug`: Enable debug logging

**Advanced Options:**
- `--strategy <strategy>`: Export strategy: named, default, both, selective (default: both)
- `--sort <sort>`: Sort strategy: alphabetical, type, size (default: alphabetical)
- `--title <title>`: Title for generated header
- `--description <description>`: Description for generated header
- `--header`: Generate header with metadata
- `--bundle-object`: Generate bundle object exports
- `--validate-paths`: Validate export paths exist
- `--check-circular`: Check for circular dependencies
- `--cache`: Enable performance caching
- `--parallel`: Enable parallel processing
- `--fail-on-errors`: Fail build on validation errors

## 🔌 **Programmatic API**

The package can also be used programmatically:

```typescript
import { 
  autoExporter, 
  collectPaths, 
  generateESMExports, 
  generateCJSExports,
  createExtensions,
  toCamelCase 
} from '@devlander/collect-exports-for-bundle';

// Generate exports programmatically
const result = await autoExporter({
  rootDir: './src',
  exportStyle: 'esm',
  defaultExport: './Button',
  debug: true
});

// Use individual functions
const paths = await collectPaths('./src', {
  allowedExtensions: ['.ts', '.tsx'],
  excludedFolders: ['tests', 'node_modules']
});

const exports = generateESMExports(paths, {
  exportStyle: 'esm',
  defaultExport: './Button'
});
```

## ⚙️ **Export Styles**

### **ES Modules (esm)**
```typescript
export * from './Button';
export * from './Input';
export * from './Modal';
export { default } from './Button';
```

### **CommonJS (cjs)**
```javascript
module.exports = {
  Button: require('./Button'),
  Input: require('./Input'),
  Modal: require('./Modal'),
  default: require('./Button')
};
```

### **Mixed (mixed)**
```typescript
export * from './Button';
export * from './Input';
export * from './Modal';
export { default } from './Button';
```

## 🔧 **Integration Examples**

### **Package.json Scripts**
```json
{
  "scripts": {
    "prebuild": "npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --default-export ./Button",
    "build": "rollup -c"
  }
}
```

### **Rollup Integration**
```javascript
// rollup.config.mjs
import { execSync } from 'child_process';

// Pre-build step: Generate index
try {
  execSync('npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --default-export ./Button', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to generate index:', error);
  process.exit(1);
}

// Continue with Rollup configuration...
```

### **GitHub Actions**
```yaml
name: Build
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --default-export ./Button
      - run: npm run build
```

## 📚 **Examples**

### **Basic Usage**
```bash
# Generate index.ts with ES modules
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts
```

### **With Custom Default Export**
```bash
# Generate index.ts with Button as default export
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --default-export ./Button
```

### **CommonJS Style**
```bash
# Generate index.js with CommonJS exports
npx @devlander/collect-exports-for-bundle generate src --output src/index.js --style cjs
```

### **Custom Extensions**
```bash
# Only include .ts and .tsx files
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --extensions .ts,.tsx
```

### **Exclude Folders**
```bash
# Exclude tests and stories
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --exclude tests,stories,__mocks__
```

### **Dry Run**
```bash
# See what would be generated without writing files
npx @devlander/collect-exports-for-bundle generate src --output src/index.ts --dry-run
```

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 **License**

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 **Support**

- **Issues**: [GitHub Issues](https://github.com/devlander/collect-exports-for-bundle/issues)
- **Discussions**: [GitHub Discussions](https://github.com/devlander/collect-exports-for-bundle/discussions)
- **Documentation**: [Full Documentation](https://github.com/devlander/collect-exports-for-bundle#readme)
