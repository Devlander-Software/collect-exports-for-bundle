#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Reorganizes the source code structure for better organization
 */
class StructureReorganizer {
  constructor() {
    this.stats = {
      filesMoved: 0,
      directoriesCreated: 0,
      importsUpdated: 0
    }
  }

  async reorganize() {
    console.log('🏗️  Reorganizing source code structure...\n')

    // 1. Create new directory structure
    await this.createNewStructure()
    
    // 2. Move files to logical groups
    await this.moveFilesToGroups()
    
    // 3. Update imports
    await this.updateImports()
    
    // 4. Create barrel exports
    await this.createBarrelExports()
    
    // 5. Clean up old directories
    await this.cleanupOldDirectories()
    
    this.printStats()
  }

  async createNewStructure() {
    const newStructure = [
      'src/core',
      'src/core/parsers',
      'src/core/validators',
      'src/core/generators',
      'src/core/collectors',
      'src/core/exporters',
      'src/features',
      'src/features/auto-exporter',
      'src/features/bundle-exporter',
      'src/features/path-collector',
      'src/utils',
      'src/utils/helpers',
      'src/utils/converters',
      'src/utils/constraints',
      'src/utils/extensions',
      'src/config',
      'src/types',
      'src/comments',
      'src/test-utils'
    ]

    for (const dir of newStructure) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        this.stats.directoriesCreated++
        console.log(`📁 Created: ${dir}`)
      }
    }
  }

  async moveFilesToGroups() {
    const fileMoves = [
      // Core parsers
      {
        from: 'src/export-related/extract-default-export.ts',
        to: 'src/core/parsers/default-export-parser.ts'
      },
      {
        from: 'src/export-related/extract-default-export-by-file-path.ts',
        to: 'src/core/parsers/file-path-parser.ts'
      },
      {
        from: 'src/export-related/get-exported-function-names-by-filecontent.ts',
        to: 'src/core/parsers/function-parser.ts'
      },
      {
        from: 'src/export-related/get-exported-function-names-by-filepath.ts',
        to: 'src/core/parsers/function-file-parser.ts'
      },
      {
        from: 'src/export-related/get-exported-default-function-names-by-filecontent.ts',
        to: 'src/core/parsers/default-function-parser.ts'
      },
      {
        from: 'src/export-related/get-exported-default-function-names-by-filepath.ts',
        to: 'src/core/parsers/default-function-file-parser.ts'
      },
      {
        from: 'src/export-related/get-exported-type-declarations-by-filecontent.ts',
        to: 'src/core/parsers/type-parser.ts'
      },
      {
        from: 'src/export-related/get-exported-type-declarations-by-filepath.ts',
        to: 'src/core/parsers/type-file-parser.ts'
      },

      // Core validators
      {
        from: 'src/export-related/has-default-export.ts',
        to: 'src/core/validators/default-export-validator.ts'
      },
      {
        from: 'src/export-related/has-named-exports.ts',
        to: 'src/core/validators/named-export-validator.ts'
      },
      {
        from: 'src/export-related/has-no-exports.ts',
        to: 'src/core/validators/no-export-validator.ts'
      },

      // Core generators
      {
        from: 'src/export-related/generate-export-statement.ts',
        to: 'src/core/generators/export-statement-generator.ts'
      },
      {
        from: 'src/export-related/generate-exports-from-dir.ts',
        to: 'src/core/generators/directory-exports-generator.ts'
      },
      {
        from: 'src/export-related/generator-exports-from-paths.ts',
        to: 'src/core/generators/path-exports-generator.ts'
      },
      {
        from: 'src/export-related/build-exports-from-paths.ts',
        to: 'src/core/generators/exports-builder.ts'
      },

      // Core collectors
      {
        from: 'src/export-related/get-paths-with-exports.ts',
        to: 'src/core/collectors/export-path-collector.ts'
      },
      {
        from: 'src/export-related/create-export-matches.ts',
        to: 'src/core/collectors/export-match-collector.ts'
      },

      // Core exporters
      {
        from: 'src/export-related/handle-default-exports.ts',
        to: 'src/core/exporters/default-export-handler.ts'
      },
      {
        from: 'src/export-related/remove-folders-from-paths.ts',
        to: 'src/core/exporters/path-cleaner.ts'
      },

      // Features
      {
        from: 'src/features/auto-exporter.ts',
        to: 'src/features/auto-exporter/index.ts'
      },
      {
        from: 'src/features/bundle-export-as-function.ts',
        to: 'src/features/bundle-exporter/function-bundler.ts'
      },
      {
        from: 'src/features/bundle-export-as-function-old.ts',
        to: 'src/features/bundle-exporter/legacy-function-bundler.ts'
      },

      // Path collector feature
      {
        from: 'src/features/collect-paths/collect-paths.ts',
        to: 'src/features/path-collector/index.ts'
      },
      {
        from: 'src/features/collect-paths/collect-paths-from-directories.ts',
        to: 'src/features/path-collector/directory-collector.ts'
      },
      {
        from: 'src/features/collect-paths/collect-relavant-paths.ts',
        to: 'src/features/path-collector/relevant-path-collector.ts'
      },
      {
        from: 'src/features/collect-paths/get-cached-directory.ts',
        to: 'src/features/path-collector/cache-manager.ts'
      },
      {
        from: 'src/features/collect-paths/has-path-with.ts',
        to: 'src/features/path-collector/path-matcher.ts'
      },
      {
        from: 'src/features/collect-paths/process-directory-contents.ts',
        to: 'src/features/path-collector/directory-processor.ts'
      },
      {
        from: 'src/features/collect-paths/absolute-path.ts',
        to: 'src/features/path-collector/path-resolver.ts'
      },

      // Utils - helpers
      {
        from: 'src/utils/get-duration.ts',
        to: 'src/utils/helpers/duration-helper.ts'
      },
      {
        from: 'src/utils/get-file-content.ts',
        to: 'src/utils/helpers/file-content-helper.ts'
      },
      {
        from: 'src/utils/get-file-name-from-extension.ts',
        to: 'src/utils/helpers/filename-helper.ts'
      },
      {
        from: 'src/utils/get-file-name-from-path.ts',
        to: 'src/utils/helpers/path-helper.ts'
      },
      {
        from: 'src/utils/log-extension-from-extensions.ts',
        to: 'src/utils/helpers/extension-logger.ts'
      },
      {
        from: 'src/utils/log-with-color.ts',
        to: 'src/utils/helpers/color-logger.ts'
      },
      {
        from: 'src/utils/modify-config.ts',
        to: 'src/utils/helpers/config-modifier.ts'
      },
      {
        from: 'src/utils/process-exports-from-match-item.ts',
        to: 'src/utils/helpers/match-processor.ts'
      },
      {
        from: 'src/utils/push-to-results.ts',
        to: 'src/utils/helpers/result-pusher.ts'
      },
      {
        from: 'src/utils/stimulate-progress-bar.ts',
        to: 'src/utils/helpers/progress-bar.ts'
      },

      // Utils - converters
      {
        from: 'src/conversions/dash-to-camel-case.ts',
        to: 'src/utils/converters/case-converter.ts'
      },
      {
        from: 'src/conversions/to-camel-case.ts',
        to: 'src/utils/converters/camel-case-converter.ts'
      },
      {
        from: 'src/conversions/to-dash-case.ts',
        to: 'src/utils/converters/dash-case-converter.ts'
      },
      {
        from: 'src/conversions/to-valid-function-name.ts',
        to: 'src/utils/converters/function-name-converter.ts'
      },
      {
        from: 'src/conversions/correct-duplicate-drive-letters.ts',
        to: 'src/utils/converters/drive-letter-fixer.ts'
      },
      {
        from: 'src/conversions/stripe-special-characters.ts',
        to: 'src/utils/converters/special-char-remover.ts'
      },

      // Utils - constraints
      {
        from: 'src/constraints/is-camel-case.ts',
        to: 'src/utils/constraints/case-validators.ts'
      },
      {
        from: 'src/constraints/is-constant-case.ts',
        to: 'src/utils/constraints/case-validators.ts'
      },
      {
        from: 'src/constraints/is-dash-case.ts',
        to: 'src/utils/constraints/case-validators.ts'
      },
      {
        from: 'src/constraints/is-pascal-case.ts',
        to: 'src/utils/constraints/case-validators.ts'
      },
      {
        from: 'src/constraints/is-snake-case.ts',
        to: 'src/utils/constraints/case-validators.ts'
      },
      {
        from: 'src/constraints/is-file-path.ts',
        to: 'src/utils/constraints/path-validators.ts'
      },
      {
        from: 'src/constraints/is-mac.ts',
        to: 'src/utils/constraints/platform-validators.ts'
      },
      {
        from: 'src/constraints/is-windows.ts',
        to: 'src/utils/constraints/platform-validators.ts'
      },
      {
        from: 'src/constraints/regex-definitions.ts',
        to: 'src/utils/constraints/regex-definitions.ts'
      },
      {
        from: 'src/constraints/test-for-patterns.ts',
        to: 'src/utils/constraints/pattern-tester.ts'
      },

      // Utils - extensions
      {
        from: 'src/extensions/create-extension.ts',
        to: 'src/utils/extensions/extension-creator.ts'
      },
      {
        from: 'src/extensions/create-extensions.ts',
        to: 'src/utils/extensions/extensions-creator.ts'
      },
      {
        from: 'src/extensions/filter-extension.ts',
        to: 'src/utils/extensions/extension-filter.ts'
      },
      {
        from: 'src/extensions/get-extensions.ts',
        to: 'src/utils/extensions/extension-getter.ts'
      },
      {
        from: 'src/extensions/has-valid-extension.ts',
        to: 'src/utils/extensions/extension-validator.ts'
      },
      {
        from: 'src/extensions/is-valid-extension.ts',
        to: 'src/utils/extensions/extension-checker.ts'
      },
      {
        from: 'src/extensions/not-valid-extension.ts',
        to: 'src/utils/extensions/invalid-extension-checker.ts'
      },
      {
        from: 'src/extensions/parse-complex-extension-from-file.ts',
        to: 'src/utils/extensions/complex-extension-parser.ts'
      },
      {
        from: 'src/extensions/parse-complex-extension-from-path.ts',
        to: 'src/utils/extensions/path-extension-parser.ts'
      },
      {
        from: 'src/extensions/parse-complex-extensions.ts',
        to: 'src/utils/extensions/complex-extensions-parser.ts'
      },
      {
        from: 'src/extensions/remove-extension-and-make-relative.ts',
        to: 'src/utils/extensions/extension-remover.ts'
      },

      // Test utils
      {
        from: 'src/for-tests',
        to: 'src/test-utils'
      }
    ]

    for (const move of fileMoves) {
      if (fs.existsSync(move.from)) {
        const targetDir = path.dirname(move.to)
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
        }
        
        fs.renameSync(move.from, move.to)
        this.stats.filesMoved++
        console.log(`📄 Moved: ${move.from} → ${move.to}`)
      }
    }
  }

  async updateImports() {
    console.log('\n🔄 Updating imports...')
    
    // This would require a more sophisticated approach to update all imports
    // For now, we'll create a script that can be run separately
    const updateScript = `
#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Update imports in all TypeScript files
function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  
  // Update import paths based on new structure
  const importUpdates = [
    // Core parsers
    { from: '../export-related/extract-default-export', to: '../core/parsers/default-export-parser' },
    { from: '../export-related/extract-default-export-by-file-path', to: '../core/parsers/file-path-parser' },
    // Add more import updates here...
  ]
  
  for (const update of importUpdates) {
    content = content.replace(new RegExp(update.from, 'g'), update.to)
  }
  
  fs.writeFileSync(filePath, content)
}

// Recursively update all .ts files
function updateAllImports(dir) {
  const files = fs.readdirSync(dir)
  
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      updateAllImports(filePath)
    } else if (file.endsWith('.ts')) {
      updateImportsInFile(filePath)
    }
  }
}

updateAllImports('./src')
console.log('✅ Imports updated')
`

    fs.writeFileSync('scripts/update-imports.js', updateScript)
    console.log('📝 Created import update script: scripts/update-imports.js')
  }

  async createBarrelExports() {
    console.log('\n📦 Creating barrel exports...')
    
    const barrelExports = [
      {
        file: 'src/core/parsers/index.ts',
        exports: [
          'default-export-parser',
          'file-path-parser',
          'function-parser',
          'function-file-parser',
          'default-function-parser',
          'default-function-file-parser',
          'type-parser',
          'type-file-parser'
        ]
      },
      {
        file: 'src/core/validators/index.ts',
        exports: [
          'default-export-validator',
          'named-export-validator',
          'no-export-validator'
        ]
      },
      {
        file: 'src/core/generators/index.ts',
        exports: [
          'export-statement-generator',
          'directory-exports-generator',
          'path-exports-generator',
          'exports-builder'
        ]
      },
      {
        file: 'src/core/collectors/index.ts',
        exports: [
          'export-path-collector',
          'export-match-collector'
        ]
      },
      {
        file: 'src/core/exporters/index.ts',
        exports: [
          'default-export-handler',
          'path-cleaner'
        ]
      },
      {
        file: 'src/core/index.ts',
        exports: [
          './parsers',
          './validators',
          './generators',
          './collectors',
          './exporters'
        ]
      },
      {
        file: 'src/utils/helpers/index.ts',
        exports: [
          'duration-helper',
          'file-content-helper',
          'filename-helper',
          'path-helper',
          'extension-logger',
          'color-logger',
          'config-modifier',
          'match-processor',
          'result-pusher',
          'progress-bar'
        ]
      },
      {
        file: 'src/utils/converters/index.ts',
        exports: [
          'case-converter',
          'camel-case-converter',
          'dash-case-converter',
          'function-name-converter',
          'drive-letter-fixer',
          'special-char-remover'
        ]
      },
      {
        file: 'src/utils/constraints/index.ts',
        exports: [
          'case-validators',
          'path-validators',
          'platform-validators',
          'regex-definitions',
          'pattern-tester'
        ]
      },
      {
        file: 'src/utils/extensions/index.ts',
        exports: [
          'extension-creator',
          'extensions-creator',
          'extension-filter',
          'extension-getter',
          'extension-validator',
          'extension-checker',
          'invalid-extension-checker',
          'complex-extension-parser',
          'path-extension-parser',
          'complex-extensions-parser',
          'extension-remover'
        ]
      },
      {
        file: 'src/utils/index.ts',
        exports: [
          './helpers',
          './converters',
          './constraints',
          './extensions'
        ]
      },
      {
        file: 'src/features/index.ts',
        exports: [
          './auto-exporter',
          './bundle-exporter',
          './path-collector'
        ]
      }
    ]

    for (const barrel of barrelExports) {
      const exportStatements = barrel.exports.map(exp => `export * from './${exp}'`).join('\n')
      const content = `// Auto-generated barrel export\n${exportStatements}\n`
      
      fs.writeFileSync(barrel.file, content)
      console.log(`📦 Created: ${barrel.file}`)
    }
  }

  async cleanupOldDirectories() {
    const oldDirs = [
      'src/export-related',
      'src/conversions',
      'src/constraints',
      'src/extensions',
      'src/features/collect-paths'
    ]

    for (const dir of oldDirs) {
      if (fs.existsSync(dir)) {
        try {
          fs.rmdirSync(dir, { recursive: true })
          console.log(`🗑️  Removed: ${dir}`)
        } catch (error) {
          console.log(`⚠️  Could not remove ${dir}: ${error.message}`)
        }
      }
    }
  }

  printStats() {
    console.log('\n📊 Reorganization Complete!')
    console.log(`📁 Directories created: ${this.stats.directoriesCreated}`)
    console.log(`📄 Files moved: ${this.stats.filesMoved}`)
    console.log(`🔄 Import updates: ${this.stats.importsUpdated}`)
    
    console.log('\n🎯 Next steps:')
    console.log('1. Run: node scripts/update-imports.js')
    console.log('2. Test the build: npm run build')
    console.log('3. Run tests: npm test')
    console.log('4. Update documentation if needed')
  }
}

// Run reorganization
const reorganizer = new StructureReorganizer()
reorganizer.reorganize().catch(console.error) 