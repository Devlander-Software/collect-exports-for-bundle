import { getPathsWithExports } from '../src/export-related/get-paths-with-exports';
import { pathToFileWithDefaultExport, pathWithFunctionExport, pathWithTypesExtension } from './shared.test';


describe('detectExportsFeature', () => {

describe('getPathsWithExports', () => {

  
  it('should return the correct absolute path and tried paths', async () => {

        let paths = [
            pathWithFunctionExport,
            pathWithTypesExtension,
            pathToFileWithDefaultExport
        ]

        const result = await getPathsWithExports(paths, { debug: false, allowedExtensions: ['.ts', '.tsx', '.types.ts'], ignoredExtensions: ['.test.ts', '.test.tsx']});
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);

  });

  
})


})