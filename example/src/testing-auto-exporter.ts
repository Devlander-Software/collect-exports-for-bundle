export interface ModuleExportOptions {
  rootDir?: string
  targetVersion?: 'es6' | 'es5'
  primaryExportFile?: string
  allowedExtensions?: string[]
  exportMode?: 'named' | 'default' | 'both'
  bundleAsFunctionForDefaultExportAs?: string
  outputFilenameExtension?: '.ts' | '.tsx'
  ignoredExtensions?: string[]
  specificFiles?: string[]
  excludedFolders?: string[]
}
const runAutoExporter = (config: ModuleExportOptions) => {
  // example/src/testing-auto-exporter.ts
  const autoExporter  = require('@devlander/collect-exports-for-bundle').default

  const path = require('path')
  const { rootDir } = config


  autoExporter({
    rootDir: './',
    allowedExtensions: ['.ts', '.tsx', '.component.tsx', '.component.ts'],
    ignoredExtensions: [
      '.test.tsx',
      '.stories.tsx',
      '.test.ts',
      '.stories.ts',
      '.extra.ts'
    ],
    excludedFolders: ['node_modules', 'junk'],
    ...config
  })
}

export { runAutoExporter }
