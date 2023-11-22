import { getPathsWithExports } from '../src/export-related/get-paths-with-exports';
import { pathToFileWithDefaultExport, pathWithFunctionExport, pathWithTypesExtension } from './shared.test';


describe.only('detectExportsFeature', () => {

describe('getPathsWithExports', () => {

  
  it('should return the correct absolute path and tried paths', async () => {
    // Mock fs.lstat and path.resolve as necessary
    // Example: fs.lstat.mockResolvedValue({ isDirectory: () => true });

        let paths = [
            pathWithFunctionExport,
            pathWithTypesExtension,
            pathToFileWithDefaultExport
        ]

        const result = await getPathsWithExports(paths, { debug: false});
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);

  });

  // Add more test cases for different scenarios, like handling errors
})


})