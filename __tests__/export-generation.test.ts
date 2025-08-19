import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'
import * as fs from 'fs'
import * as path from 'path'

// Import the export generation functions
const { generateESMExports, generateCJSExports, generateMixedExports } = require('../dist')

describe('Export Generation Functions', () => {
  let testDir: string

  beforeEach(() => {
    // Create test directory
    testDir = path.join(__dirname, 'test-export-generation')
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true })
    }
  })

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true })
    }
  })

  describe('ES Modules Export Generation', () => {
    test('should generate ES modules exports', () => {
      const files = [
        path.join(testDir, 'Button.tsx'),
        path.join(testDir, 'Input.tsx'),
        path.join(testDir, 'utils.ts')
      ]
      
      const config = {
        output: path.join(testDir, 'index.ts'),
        rootDir: testDir
      }

      const result = generateESMExports(files, config)
      
      expect(result.exports).toHaveLength(3)
      expect(result.exports[0]).toContain('export * from')
      expect(result.exports[0]).toContain('./Button')
      expect(result.exports[1]).toContain('./Input')
      expect(result.exports[2]).toContain('./utils')
    })

    test('should include default export when specified', () => {
      const files = [
        path.join(testDir, 'Button.tsx'),
        path.join(testDir, 'Input.tsx')
      ]
      
      const config = {
        output: path.join(testDir, 'index.ts'),
        rootDir: testDir,
        defaultExport: './Button'
      }

      const result = generateESMExports(files, config)
      
      expect(result.exports).toHaveLength(3) // 2 files + 1 default export
      expect(result.exports[2]).toContain('export { default } from')
      expect(result.exports[2]).toContain('./Button')
    })
  })

  describe('CommonJS Export Generation', () => {
    test('should generate CommonJS exports', () => {
      const files = [
        path.join(testDir, 'Button.tsx'),
        path.join(testDir, 'Input.tsx'),
        path.join(testDir, 'utils.ts')
      ]
      
      const config = {
        output: path.join(testDir, 'index.js'),
        rootDir: testDir
      }

      const result = generateCJSExports(files, config)
      
      expect(result.requires).toHaveLength(3)
      expect(result.requires[0]).toContain('Button:')
      expect(result.requires[0]).toContain('require(')
      expect(result.requires[1]).toContain('Input:')
      expect(result.requires[2]).toContain('utils:')
    })

    test('should include default export when specified', () => {
      const files = [
        path.join(testDir, 'Button.tsx'),
        path.join(testDir, 'Input.tsx')
      ]
      
      const config = {
        output: path.join(testDir, 'index.js'),
        rootDir: testDir,
        defaultExport: './Button'
      }

      const result = generateCJSExports(files, config)
      
      expect(result.requires).toHaveLength(3) // 2 files + 1 default export
      expect(result.requires[2]).toContain('default:')
      expect(result.requires[2]).toContain('./Button')
    })
  })

  describe('Mixed Export Generation', () => {
    test('should generate mixed exports', () => {
      const files = [
        path.join(testDir, 'Button.tsx'),
        path.join(testDir, 'Input.tsx'),
        path.join(testDir, 'utils.ts')
      ]
      
      const config = {
        output: path.join(testDir, 'index.ts'),
        rootDir: testDir
      }

      const result = generateMixedExports(files, config)
      
      expect(result.exports).toHaveLength(3)
      expect(result.exports[0]).toContain('export * from')
      expect(result.exports[0]).toContain('./Button')
      expect(result.exports[1]).toContain('./Input')
      expect(result.exports[2]).toContain('./utils')
    })

    test('should include default export when specified', () => {
      const files = [
        path.join(testDir, 'Button.tsx'),
        path.join(testDir, 'Input.tsx')
      ]
      
      const config = {
        output: path.join(testDir, 'index.ts'),
        rootDir: testDir,
        defaultExport: './Button'
      }

      const result = generateMixedExports(files, config)
      
      expect(result.exports).toHaveLength(3) // 2 files + 1 default export
      expect(result.exports[2]).toContain('export { default } from')
      expect(result.exports[2]).toContain('./Button')
    })
  })
})
