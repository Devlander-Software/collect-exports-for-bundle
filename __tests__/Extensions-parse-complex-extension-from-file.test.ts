import { parseComplexExtensionFromFile } from "../src/extensions/parse-complex-extension-from-file";

describe('parseComplexExtension', () => {
  it('should extract file name, extension, and base file name from a file path', () => {
    const result = parseComplexExtensionFromFile("myfile.native.ts", { debug: false, forceIsFilePath: true });
    expect(result.fileName).toBe('myfile.native.ts');
    expect(result.extension).toBe('.native.ts');
    expect(result.baseFileName).toBe('myfile');
    expect(result.folderName).toBeUndefined();
    expect(result.words).toEqual(['myfile', 'native', 'ts']);
  });

  it('should handle file paths with multiple dots', () => {
    const result = parseComplexExtensionFromFile("t-color.types.ts", { debug: false, forceIsFilePath: true });
    expect(result.fileName).toBe('t-color.types.ts');
    expect(result.extension).toBe('.types.ts');
    expect(result.baseFileName).toBe('t-color');
    expect(result.words).toEqual(['t-color', 'types', 'ts']);
  });

  


  it('should handle directory paths correctly', () => {
    const result = parseComplexExtensionFromFile("node_modules", { debug: false, forceIsFilePath: false });
    expect(result.fileName).toBeUndefined();
    expect(result.extension).toBeUndefined();
    expect(result.baseFileName).toBeUndefined();
    expect(result.folderName).toBe('node_modules');
  });

  // Add more test cases as needed
});
