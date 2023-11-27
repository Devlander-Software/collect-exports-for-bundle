import { getFileContent } from "../src/utils/get-file-content";
import { nativeExtensionPath } from "./shared.test";

;

describe('getFileContent', () => {
  it('should throw an error for an invalid file path', () => {
    let result = getFileContent("hello");
    expect(result).toThrow();
  });

  it('should return an empty string for a non-existent file', () => {
    const result = getFileContent('non-existent.txt');
    expect(result).toBe('');
  });

  it('should return file content for an existing file', () => {
    let result = getFileContent(nativeExtensionPath)
    // get rid of whitespace and newlines
    // put everything on one line

    
   

    let expected = `export const myFileForNative = (): string => { return 'Hello World' }`;
    expect(result).toBe(expected);
  });

  // Additional tests for error handling, etc.
});
