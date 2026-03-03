/**
 * Unit tests for directive parser (eslint-style exclusions).
 * Target: src/features/directive-parser.ts
 */

import {
  isFileExcludedByDirective,
  getExcludeNextLineNumbers,
  isExportExcludedByDirective
} from '../src/features/directive-parser'

describe('directive-parser', () => {
  describe('isFileExcludedByDirective', () => {
    it('returns true when @collect-exports-exclude is in file header (block comment)', () => {
      const content = `/**
 * Some file
 * @collect-exports-exclude
 */
export const foo = 1`
      expect(isFileExcludedByDirective('/fake/path.ts', content)).toBe(true)
    })

    it('returns true when directive is in single-line block comment', () => {
      const content = `/** @collect-exports-exclude */
export const foo = 1`
      expect(isFileExcludedByDirective('/fake/path.ts', content)).toBe(true)
    })

    it('returns false when @collect-exports-exclude-next is present but not @collect-exports-exclude', () => {
      const content = `// @collect-exports-exclude-next
export const foo = 1`
      expect(isFileExcludedByDirective('/fake/path.ts', content)).toBe(false)
    })

    it('returns false when directive is absent', () => {
      const content = `/**
 * Some file
 */
export const foo = 1`
      expect(isFileExcludedByDirective('/fake/path.ts', content)).toBe(false)
    })

    it('returns false when directive appears after first non-comment line', () => {
      const content = `export const foo = 1
/** @collect-exports-exclude */`
      expect(isFileExcludedByDirective('/fake/path.ts', content)).toBe(false)
    })

    it('returns false for empty content', () => {
      expect(isFileExcludedByDirective('/fake/path.ts', '')).toBe(false)
    })
  })

  describe('getExcludeNextLineNumbers', () => {
    it('returns Set of line numbers for exports after @collect-exports-exclude-next', () => {
      const content = `// line 0
// @collect-exports-exclude-next
export const foo = 1
export const bar = 2`
      const excluded = getExcludeNextLineNumbers('/fake/path.ts', content)
      // Next line after directive (index 1) is index 2
      expect(excluded.has(2)).toBe(true)
      expect(excluded.size).toBe(1)
    })

    it('handles multiple directives', () => {
      const content = `// @collect-exports-exclude-next
export const a = 1
// @collect-exports-exclude-next
export const b = 2`
      const excluded = getExcludeNextLineNumbers('/fake/path.ts', content)
      expect(excluded.has(1)).toBe(true)
      expect(excluded.has(3)).toBe(true)
      expect(excluded.size).toBe(2)
    })

    it('returns empty Set when no directive present', () => {
      const content = `export const foo = 1`
      const excluded = getExcludeNextLineNumbers('/fake/path.ts', content)
      expect(excluded.size).toBe(0)
    })

    it('returns empty Set for empty content', () => {
      const excluded = getExcludeNextLineNumbers('/fake/path.ts', '')
      expect(excluded.size).toBe(0)
    })
  })

  describe('isExportExcludedByDirective', () => {
    it('returns true when exportLineNumber is in excluded set', () => {
      const content = `// @collect-exports-exclude-next
export const foo = 1`
      const excluded = getExcludeNextLineNumbers('/fake/path.ts', content)
      expect(excluded.has(1)).toBe(true)
      expect(isExportExcludedByDirective('/fake/path.ts', 1, content)).toBe(true)
    })

    it('returns false when exportLineNumber is not in excluded set', () => {
      const content = `// @collect-exports-exclude-next
export const foo = 1
export const bar = 2`
      expect(isExportExcludedByDirective('/fake/path.ts', 2, content)).toBe(false)
    })

    it('returns false when no directives present', () => {
      const content = `export const foo = 1`
      expect(isExportExcludedByDirective('/fake/path.ts', 0, content)).toBe(false)
    })
  })
})
