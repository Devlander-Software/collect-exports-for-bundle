/**
 * Unit tests for configuration presets.
 * Target: src/config/presets.ts
 */

import {
  getPreset,
  isValidPreset,
  listPresets
} from '../src/config/presets'

describe('presets', () => {
  describe('getPreset', () => {
    it("getPreset('react') returns config with rootDir", () => {
      const config = getPreset('react')

      expect(config).toBeDefined()
      expect(config.rootDir).toBe('src')
    })

    it("getPreset('library').useTypeScriptAPI is true", () => {
      const config = getPreset('library')

      expect(config).toBeDefined()
      expect(config.useTypeScriptAPI).toBe(true)
    })
  })

  describe('isValidPreset', () => {
    it("isValidPreset('react') returns true", () => {
      expect(isValidPreset('react')).toBe(true)
    })

    it("isValidPreset('invalid') returns false", () => {
      expect(isValidPreset('invalid')).toBe(false)
    })
  })

  describe('listPresets', () => {
    it('listPresets includes react', () => {
      const presets = listPresets()

      const reactPreset = presets.find((p) => p.key === 'react')
      expect(reactPreset).toBeDefined()
      expect(reactPreset?.key).toBe('react')
      expect(reactPreset?.name).toBe('React/TypeScript')
      expect(reactPreset?.description).toBe(
        'Standard React project with TypeScript'
      )
    })
  })
})
