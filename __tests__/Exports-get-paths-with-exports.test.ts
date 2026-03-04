import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import { getPathsWithExports } from '../src/export-related/get-paths-with-exports'
import {
  pathToFileWithDefaultExport,
  pathWithFunctionExport,
  pathWithTypesExtension
} from './shared.test'
import type { ConfigForCollectPathsFromDirectories } from '../src/features/collect-paths/collect-paths-from-directories'

const MINIMAL_CONFIG: ConfigForCollectPathsFromDirectories = {
  allowedExtensions: ['.ts'],
  debug: false
}

describe('detectExportsFeature', () => {
  describe('getPathsWithExports', () => {
    it('should return the correct absolute path and tried paths', async () => {
      const paths = [
        pathWithFunctionExport,
        pathWithTypesExtension,
        pathToFileWithDefaultExport
      ]
      const result = await getPathsWithExports(paths, {
        debug: false,
        allowedExtensions: ['.ts', '.tsx', '.types.ts'],
        ignoredExtensions: ['.test.ts', '.test.tsx']
      })
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(3)
    })

  })
})

describe('getPathsWithExports @collect-exports-exclude', () => {
  let tempDir: string
  let excludedFilePath: string

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ceb-'))
    excludedFilePath = path.join(tempDir, 'excluded.ts')
    const content = `/** @collect-exports-exclude */
export const x = 1`
    fs.writeFileSync(excludedFilePath, content, 'utf8')
  })

  afterEach(() => {
    try {
      if (excludedFilePath && fs.existsSync(excludedFilePath)) {
        fs.unlinkSync(excludedFilePath)
      }
      if (tempDir && fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir)
      }
    } catch {
      // ignore cleanup errors
    }
  })

  it('excludes paths for files with @collect-exports-exclude directive', async () => {
    const result = await getPathsWithExports([excludedFilePath], MINIMAL_CONFIG)

    expect(result).not.toContain(excludedFilePath)
    expect(result).toEqual([])
  })
})