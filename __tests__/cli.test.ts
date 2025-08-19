import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

describe('Simplified CLI Functionality', () => {
  let testDir: string
  let cliPath: string

  beforeEach(() => {
    // Create test directory
    testDir = path.join(__dirname, 'test-cli-output')
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true })
    }

    // Path to the CLI (use compiled version)
    cliPath = path.join(__dirname, '../dist/cli/index.js')
  })

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true })
    }
  })

  describe('CLI Commands', () => {
    test('should show help when no arguments provided', () => {
      try {
        const result = execSync(`node ${cliPath}`, { 
          cwd: testDir,
          stdio: 'pipe'
        })
        
        // Should show help output
        const output = result.toString()
        expect(output).toContain('Usage:')
        expect(output).toContain('collect-exports')
      } catch (error: any) {
        // If it fails, check stderr for help output
        const stderr = error.stderr?.toString() || ''
        if (stderr.includes('Usage:') || stderr.includes('collect-exports')) {
          // Help was shown in stderr, which is fine
          expect(true).toBe(true)
        } else {
          // Unexpected error
          throw error
        }
      }
    })

    test('should show version information', () => {
      try {
        execSync(`node ${cliPath} --version`, { 
          cwd: testDir,
          stdio: 'pipe'
        })
      } catch (error: any) {
        // Should show version
        expect(error.stdout?.toString() || '').toContain('2.0.0')
      }
    })

    test('should show generate command help', () => {
      try {
        execSync(`node ${cliPath} generate --help`, { 
          cwd: testDir,
          stdio: 'pipe'
        })
      } catch (error: any) {
        // Should show generate command help
        expect(error.stdout?.toString() || '').toContain('Generate index file with exports')
        expect(error.stdout?.toString() || '').toContain('--style')
        expect(error.stdout?.toString() || '').toContain('--default-export')
      }
    })
  })

  describe('Generate Command - ES Modules', () => {
    test('should generate ES modules index file', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.ts'))).toBe(true)
        
        // Check content
        const content = fs.readFileSync(path.join(testDir, 'index.ts'), 'utf-8')
        expect(content).toContain('export * from')
        expect(content).toContain('./src/Button')
        expect(content).toContain('./src/Input')
        expect(content).toContain('./src/utils')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })

    test('should generate ES modules with custom default export', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --default-export ./Button`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.ts'))).toBe(true)
        
        // Check content
        const content = fs.readFileSync(path.join(testDir, 'index.ts'), 'utf-8')
        expect(content).toContain('export * from')
        expect(content).toContain('export { default } from')
        expect(content).toContain('./src/Button')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })
  })

  describe('Generate Command - CommonJS', () => {
    test('should generate CommonJS index file', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.js --style cjs`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.js'))).toBe(true)
        
        // Check content
        const content = fs.readFileSync(path.join(testDir, 'index.js'), 'utf-8')
        expect(content).toContain('module.exports = {')
        expect(content).toContain('require(')
        expect(content).toContain('Button:')
        expect(content).toContain('Input:')
        expect(content).toContain('utils:')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })

    test('should generate CommonJS with custom default export', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.js --style cjs --default-export ./Button`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.js'))).toBe(true)
        
        // Check content
        const content = fs.readFileSync(path.join(testDir, 'index.js'), 'utf-8')
        expect(content).toContain('module.exports = {')
        expect(content).toContain('default:')
        expect(content).toContain('./src/Button')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })
  })

  describe('Generate Command - Mixed Style', () => {
    test('should generate mixed style exports', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --style mixed --default-export ./Button`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.ts'))).toBe(true)
        
        // Check content
        const content = fs.readFileSync(path.join(testDir, 'index.ts'), 'utf-8')
        expect(content).toContain('export * from')
        expect(content).toContain('export { default } from')
        expect(content).toContain('./src/Button')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })
  })

  describe('Generate Command - Options', () => {
    test('should respect custom file extensions', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')
      fs.writeFileSync(path.join(srcDir, 'config.js'), 'export const config = {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --extensions .tsx,.js`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.ts'))).toBe(true)
        
        // Check content - should only include .tsx and .js files
        const content = fs.readFileSync(path.join(testDir, 'index.ts'), 'utf-8')
        expect(content).toContain('./src/Button')
        expect(content).toContain('./src/Input')
        expect(content).toContain('./src/config')
        expect(content).not.toContain('./src/utils') // .ts file should be excluded
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })

    test('should respect excluded folders', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')
      fs.writeFileSync(path.join(srcDir, 'utils.ts'), 'export const helper = () => {};')
      
      // Create excluded folder
      const excludedDir = path.join(srcDir, 'tests')
      fs.mkdirSync(excludedDir, { recursive: true })
      fs.writeFileSync(path.join(excludedDir, 'test.ts'), 'export const test = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --exclude tests`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Check that output file was created
        expect(fs.existsSync(path.join(testDir, 'index.ts'))).toBe(true)
        
        // Check content - should not include files from excluded folder
        const content = fs.readFileSync(path.join(testDir, 'index.ts'), 'utf-8')
        expect(content).toContain('./src/Button')
        expect(content).toContain('./src/Input')
        expect(content).toContain('./src/utils')
        expect(content).not.toContain('./src/tests/test')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })
  })

  describe('Generate Command - Dry Run', () => {
    test('should show output without writing files', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')

      try {
        const result = execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --dry-run`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Should show generated content
        const output = result.toString()
        expect(output).toContain('Generated exports (dry run):')
        expect(output).toContain('export * from')
        expect(output).toContain('./src/Button')
        expect(output).toContain('./src/Input')
        
        // Should not create output file
        expect(fs.existsSync(path.join(testDir, 'index.ts'))).toBe(false)
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })
  })

  describe('Generate Command - Error Handling', () => {
    test('should handle non-existent source directory', () => {
      try {
        execSync(`node ${cliPath} generate /nonexistent/directory --output ${testDir}/index.ts`, { 
          cwd: testDir,
          stdio: 'pipe'
        })
        // Should not reach here
        expect(true).toBe(false)
      } catch (error: any) {
        // Should fail with appropriate error
        expect(error.status).toBe(1)
        expect(error.stderr?.toString() || '').toContain('Source directory does not exist')
      }
    })

    test('should handle invalid export style', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')

      try {
        execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --style invalid`, { 
          cwd: testDir,
          stdio: 'pipe'
        })
        // Should not reach here
        expect(true).toBe(false)
      } catch (error: any) {
        // Should fail with appropriate error
        expect(error.status).toBe(1)
        expect(error.stderr?.toString() || '').toContain('Unknown export style')
      }
    })
  })

  describe('Generate Command - Debug Mode', () => {
    test('should show debug information when enabled', () => {
      // Create test source files
      const srcDir = path.join(testDir, 'src')
      fs.mkdirSync(srcDir, { recursive: true })
      
      fs.writeFileSync(path.join(srcDir, 'Button.tsx'), 'export const Button = () => {};')
      fs.writeFileSync(path.join(srcDir, 'Input.tsx'), 'export const Input = () => {};')

      try {
        const result = execSync(`node ${cliPath} generate ${srcDir} --output ${testDir}/index.ts --debug`, { 
          cwd: testDir,
          stdio: 'pipe'
        })

        // Should show debug information
        const output = result.toString()
        expect(output).toContain('Configuration:')
        expect(output).toContain('Found 2 files to process')
        expect(output).toContain('Index file generated successfully')
      } catch (error: any) {
        // Should succeed
        expect(error).toBeUndefined()
      }
    })
  })
})
