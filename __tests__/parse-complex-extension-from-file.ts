import { parseComplexExtensionFromFile } from "../src/extensions/parse-complex-extension-from-file";
import { nodeModulesPath } from "./shared.test";

describe('parseComplexExtension', () => {
  it('should extract file name, extension, and base file name from a file path', () => {
    const result = parseComplexExtensionFromFile("myfile.native.ts");
    expect(result.fileName).toBe('myfile.native');
    expect(result.extension).toBe('.native.ts');
    expect(result.baseFileName).toBe('myfile');
    expect(result.folderName).toBeUndefined();
    expect(result.words).toEqual(['path', 'to', 'file', 'ext']);
  });

  it('should handle file paths with multiple dots', () => {
    const result = parseComplexExtensionFromFile("t-color.types.ts");
    expect(result.fileName).toBe('t-color.types');
    expect(result.extension).toBe('.types.ts');
    expect(result.baseFileName).toBe('t-color');
    expect(result.words).toEqual(['another', 'path', 'to.file', 'file', 'name', 'ext']);
  });

  it('should return undefined for extension and base file name if no extension is present', () => {
    const result = parseComplexExtensionFromFile("normal-file-path.ts");
    expect(result.fileName).toBeUndefined();
    expect(result.extension).toBeUndefined();
    expect(result.baseFileName).toBeUndefined();
    expect(result.folderName).toEqual('folder');
    expect(result.words).toEqual(['path', 'to', 'folder']);
  });


  it('should handle directory paths correctly', () => {
    const result = parseComplexExtensionFromFile(nodeModulesPath);
    expect(result.fileName).toBeUndefined();
    expect(result.extension).toBeUndefined();
    expect(result.baseFileName).toBeUndefined();
    expect(result.folderName).toBe('directory');
    expect(result.words).toEqual(['path', 'to', 'directory']);
  });

  // Add more test cases as needed
});
