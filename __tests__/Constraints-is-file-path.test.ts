import { isFilePath } from '../src/constraints/is-file-path';
import { nativeExtensionPath, pathToForTests, pathWithFunctionExport, pathWithNoExtension } from "./shared.test";

describe('isFilePath', () => {
  // Test cases for valid file paths
  it('it should work with folders', () => {
    const path = pathToForTests
    let result = isFilePath(path);
    expect(result).toBe(true);
  });

  it('should work with files with extensions with multiple dots', () => {
    let result = isFilePath(nativeExtensionPath);
    expect(result).toBe(true);
  });

  it('should work with files with no extension', () => {
    let result = isFilePath(pathWithNoExtension);
    expect(result).toBe(true);
  });

  it('should work with files with extensions with one dot', () => {
    let result = isFilePath(pathWithFunctionExport);
    expect(result).toBe(true);
  })

  it('should return false if it is just a normal string', () => {

    let result = isFilePath("hello");
    expect(result).toBe(false);
  }


  )




 

  // Add more test cases as needed to cover different edge cases and scenarios
});
