/**
 * Unit tests for config alias normalization (modify-config).
 * Target: src/utils/modify-config.ts
 */

import { modifyConfig } from '../src/utils/modify-config'

describe('modify-config aliases', () => {
  it('maps bundleDefaultAsObject to bundleAsObjectForDefaultExport', async () => {
    const result = await modifyConfig({
      rootDir: 'src',
      bundleDefaultAsObject: 'App'
    })
    expect(result.bundleAsObjectForDefaultExport).toBe('App')
  })

  it('maps outputPath to outputFileName and outputFilenameExtension', async () => {
    const result = await modifyConfig({
      rootDir: 'src',
      outputPath: './dist/index.ts'
    })
    expect(result.outputFileName).toBe('index')
    expect(result.outputFilenameExtension).toBe('.ts')
  })

  it('defaults outputFilenameExtension to .ts when outputPath has an unsupported extension', async () => {
    const result = await modifyConfig({
      rootDir: 'src',
      outputPath: './dist/index.js'
    })
    expect(result.outputFileName).toBe('index')
    expect(result.outputFilenameExtension).toBe('.ts')
  })

  it('maps includeBarrelFiles to includeIndexes', async () => {
    const result = await modifyConfig({
      rootDir: 'src',
      includeBarrelFiles: true
    })
    expect(result.includeIndexes).toBe(true)
  })
})
