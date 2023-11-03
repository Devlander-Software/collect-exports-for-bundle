// parseComplexExtensionFromPath.test.ts
import { parseComplexExtensionFromPath } from '../src/utils/parse-complex-extension-from-path';

describe('parseComplexExtensionFromPath', () => {
  it('should extract complex extensions correctly', () => {
    const filePath = "./files/hey/there/what/is/up-hello1265.schoolbus.yellow.ts";
    const expectedExtension = ".schoolbus.yellow.ts";
    expect(parseComplexExtensionFromPath(filePath)).toBe(expectedExtension);
  });

  it('should handle file paths without an extension', () => {
    const filePath = "./files/hey/there/what/is/up-hello1265";
    const expectedExtension = "";
    expect(parseComplexExtensionFromPath(filePath)).toBe(expectedExtension);
  });

  it('should throw an error for a file path without a filename', () => {
    const filePath = "./files/hey/there/what/is/";
    expect(() => parseComplexExtensionFromPath(filePath)).toThrow('No file name found in the provided file path.');
  });

  // Add more test cases as needed for different scenarios
});
