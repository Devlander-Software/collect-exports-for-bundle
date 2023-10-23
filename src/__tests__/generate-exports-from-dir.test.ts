import * as fs from 'fs'
import path from 'path'
import { ModuleExportOptions } from '../types/types'
import {
  extractDefaultExportVariable,
  generateExportsFromDir
} from '../utils/generate-exports-from-dir'

jest.mock('fs')

describe('generateExportsFromDir', () => {
  it('should generate exports from directory', () => {
    const config: ModuleExportOptions = {
      targetVersion: 'es6',
      rootDir: 'src/components'
      // Add other configurations as needed
    }

    const rootDir = 'src/components'
    const result = generateExportsFromDir(rootDir, config)

    // Depending on your expectation, add specific checks, e.g.,
    expect(result).toContain('export * from "./Button"')
    // You might want to add more expectations here based on your use case
  })
})

describe('extractDefaultExportVariable', () => {
  beforeAll(() => {
    ;(fs.readFileSync as jest.Mock).mockReturnValue(
      `export default MyComponent;`
    )
  })

  it('should extract default export variable from file', () => {
    const filepath = path.join(__dirname, 'MyComponent.tsx')
    const result = extractDefaultExportVariable(filepath)
    expect(result).toBe('MyComponent')
  })

  it('should return null for file without default export', () => {
    ;(fs.readFileSync as jest.Mock).mockReturnValue(
      `export const MyComponent = () => {};`
    )
    const filepath = path.join(__dirname, 'MyComponent.tsx')
    const result = extractDefaultExportVariable(filepath)
    expect(result).toBeNull()
  })
})
