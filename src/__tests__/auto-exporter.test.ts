import * as fs from 'fs'
import { ModuleExportOptions } from '../types/types'
import { generateExportsFromDir } from '../utils/generate-exports-from-dir'
import { fileHasValidExtension } from '../utils/has-valid-extension'

jest.mock('fs')

describe('autoExporter', () => {
  beforeEach(() => {
    process.argv = [] // Reset any command-line arguments
  })

  describe('fileHasValidExtension', () => {
    it('should correctly identify valid extensions', () => {
      const mockOptions: ModuleExportOptions = {
        rootDir: 'src',
        allowedExtensions: ['.ts', '.tsx'],
        ignoredExtensions: ['.test.ts', '.spec.ts']
      }

      expect(fileHasValidExtension('file.ts', mockOptions)).toBe(true)
      expect(fileHasValidExtension('file.test.ts', mockOptions)).toBe(false)
      expect(fileHasValidExtension('file.jsx', mockOptions)).toBe(false)
    })
  })

  describe('generateExportsFromDir', () => {
    it('should generate correct export statements', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue([
        'file.ts',
        'file.test.ts',
        'folder'
      ])
      ;(fs.lstatSync as jest.Mock).mockImplementation((path) => {
        return {
          isDirectory: () => path === 'folder'
        }
      })

      const mockOptions: ModuleExportOptions = {
        rootDir: 'src',
        allowedExtensions: ['.ts', '.tsx'],
        ignoredExtensions: ['.test.ts', '.spec.ts']
      }

      const exports = generateExportsFromDir('src', mockOptions)
      expect(exports).toContain('export * from "./file";')
      expect(exports).not.toContain('export * from "./file.test";')
    })
  })

  // ... More tests for other functionalities.
})
