import { isValidExtension } from "../src/extensions/is-valid-extension";
import { normalFilePath, pathToForTests, webExtensionPath } from "./shared.test";

describe('isValidExtension', () => {
  const webExtensions = ['.web.ts', '.web.tsx', '.web.js', '.web.jsx'];
  const nativeExtensions = ['.native.ts', '.native.tsx', '.native.js', '.native.jsx'];
  it('Should work with .web related extensions and files with no .ts or .tsx included separately', () => {
    const webFilePathWithWebExtensions = isValidExtension(webExtensionPath, webExtensions);
    const nativePathWithWebExtensions = isValidExtension(webExtensionPath, nativeExtensions);
    expect(webFilePathWithWebExtensions).toBe(true);

    expect(nativePathWithWebExtensions).toBe(false);
  
  });

  it('Should work with .ts files if .ts is included in allowed extensions', () => {
    const result = isValidExtension(normalFilePath, ['.ts']);
    expect(result).toBe(true);
  });


  it('If the allowed file is .web.ts, .ts should be false', () => {
    const result = isValidExtension(webExtensionPath, ['.ts']);
    expect(result).toBe(false);
  });


  it('should return false if it is not a file', () => {
    const result = isValidExtension(pathToForTests, ['.ts']);
    expect(result).toBe(false);
  });

  it('should return false for an empty string as file path', () => {
    const result = isValidExtension('', ['.ts']);
    expect(result).toBe(false);
  });

  it('should return false if no allowed extensions are passed or if allowed extensions is empty', () => {
    const result = isValidExtension(normalFilePath, []);
    expect(result).toBe(false);
  });
  it('allowed extensions should remove empty strings in array and return false', () => {
    const result = isValidExtension(normalFilePath, ['', '']);
    expect(result).toBe(false);
  });
});
