/**
 * Unit tests for TypeScript API export extraction.
 * Target: src/export-related/ts-api-exports.ts
 */

import type { ExtractedExport } from '../src/export-related/ts-api-exports'
import { extractExportsWithTsApi } from '../src/export-related/ts-api-exports'

const TEST_FILE = 'test.ts'

describe('ts-api-exports', () => {
  describe('extractExportsWithTsApi', () => {
    it('extracts named function with isTypeOnly false', () => {
      const content = 'export function foo() {}'
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named).toContainEqual({
        name: 'foo',
        isTypeOnly: false,
        isDefault: false
      })
    })

    it('extracts named interface with isTypeOnly true', () => {
      const content = 'export interface IBar {}'
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named).toContainEqual({
        name: 'IBar',
        isTypeOnly: true,
        isDefault: false
      })
    })

    it('extracts named type alias with isTypeOnly true', () => {
      const content = 'export type TBaz = string'
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named).toContainEqual({
        name: 'TBaz',
        isTypeOnly: true,
        isDefault: false
      })
    })

    it('extracts export clause with multiple names', () => {
      const content = `const A = 1; const B = 2; export { A, B }`
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named.map((e: ExtractedExport) => e.name)).toContain('A')
      expect(result.named.map((e: ExtractedExport) => e.name)).toContain('B')
    })

    it('extracts export type clause with isTypeOnly true', () => {
      const content = `type T = string; export type { T }`
      const result = extractExportsWithTsApi(TEST_FILE, content)
      const tExport = result.named.find((e: ExtractedExport) => e.name === 'T')
      expect(tExport).toBeDefined()
      expect(tExport?.isTypeOnly).toBe(true)
    })

    it('extracts default export identifier', () => {
      const content = `const MyClass = class {}; export default MyClass`
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.defaultExport).toBe('MyClass')
    })

    it('extracts default export from export default class', () => {
      const content = `export default class MyDefaultClass {}`
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.defaultExport).toBe('MyDefaultClass')
    })

    it('returns empty named for empty content', () => {
      const result = extractExportsWithTsApi(TEST_FILE, '')
      expect(result.named).toEqual([])
    })

    it('returns empty named when no exports', () => {
      const content = 'const x = 1'
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named).toEqual([])
    })

    it('extracts export const', () => {
      const content = 'export const myConst = 1'
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named).toContainEqual({
        name: 'myConst',
        isTypeOnly: false,
        isDefault: false
      })
    })

    it('extracts export enum', () => {
      const content = `export enum MyEnum { A, B }`
      const result = extractExportsWithTsApi(TEST_FILE, content)
      expect(result.named).toContainEqual({
        name: 'MyEnum',
        isTypeOnly: false,
        isDefault: false
      })
    })
  })
})
