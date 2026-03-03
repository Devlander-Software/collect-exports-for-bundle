/**
 * Unit tests for config discovery and loading.
 * Target: src/utils/config-loader.ts
 */

import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { loadConfig } from '../src/utils/config-loader'

describe('config-loader', () => {
  let tempDir: string

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'config-loader-test-'))
  })

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true })
    }
  })

  describe('loadConfig with configPath', () => {
    it('returns config when configPath points to existing .collect-exports.json', () => {
      const configPath = path.join(tempDir, '.collect-exports.json')
      fs.writeFileSync(configPath, JSON.stringify({ rootDir: 'src' }))

      const result = loadConfig({ configPath, cwd: tempDir })

      expect(result).not.toBeNull()
      expect(result?.rootDir).toBe('src')
    })

    it('returns null when configPath points to non-existent file', () => {
      const configPath = path.join(tempDir, 'nonexistent.json')

      const result = loadConfig({ configPath, cwd: tempDir })

      expect(result).toBeNull()
    })
  })

  describe('loadConfig with cwd discovery', () => {
    it('finds .collect-exports.json in cwd', () => {
      fs.writeFileSync(
        path.join(tempDir, '.collect-exports.json'),
        JSON.stringify({ rootDir: 'lib' })
      )

      const result = loadConfig({ cwd: tempDir })

      expect(result).not.toBeNull()
      expect(result?.rootDir).toBe('lib')
    })

    it('finds collect-exports.config.json when .collect-exports.json is absent', () => {
      fs.writeFileSync(
        path.join(tempDir, 'collect-exports.config.json'),
        JSON.stringify({ rootDir: 'packages' })
      )

      const result = loadConfig({ cwd: tempDir })

      expect(result).not.toBeNull()
      expect(result?.rootDir).toBe('packages')
    })

    it('prefers .collect-exports.json over collect-exports.config.json', () => {
      fs.writeFileSync(
        path.join(tempDir, '.collect-exports.json'),
        JSON.stringify({ rootDir: 'first' })
      )
      fs.writeFileSync(
        path.join(tempDir, 'collect-exports.config.json'),
        JSON.stringify({ rootDir: 'second' })
      )

      const result = loadConfig({ cwd: tempDir })

      expect(result?.rootDir).toBe('first')
    })

    it('loads from package.json collectExports when no config files exist', () => {
      fs.writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({
          name: 'test',
          collectExports: { rootDir: 'lib' }
        })
      )

      const result = loadConfig({ cwd: tempDir })

      expect(result).not.toBeNull()
      expect(result?.rootDir).toBe('lib')
    })

    it('returns null when no config exists in empty dir', () => {
      const result = loadConfig({ cwd: tempDir })

      expect(result).toBeNull()
    })

    it('returns null when package.json has no collectExports', () => {
      fs.writeFileSync(
        path.join(tempDir, 'package.json'),
        JSON.stringify({ name: 'test' })
      )

      const result = loadConfig({ cwd: tempDir })

      expect(result).toBeNull()
    })
  })
})
