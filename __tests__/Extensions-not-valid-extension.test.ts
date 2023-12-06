import { notValidExtension } from "../src/extensions/not-valid-extension";
import { nativeExtensionPath, pathWithJSFile, pathWithJSWebFile, webExtensionPath } from "./shared.test";

// Mock the entire parseComplexExtensionFromPath module


describe('extensionFeatures', () => {

describe('notValidExtension', () => {
  const webExtensions = ['.web.ts', '.web.tsx', '.web.js', '.web.jsx'];
  const nativeExtensions = ['.native.ts', '.native.tsx', '.native.js', '.native.jsx'];
  it('should return true with a extension with multiple dots if the extension is in the ignoreExtension array', () => {
    let result = notValidExtension(nativeExtensionPath, webExtensions, true);

    expect(result).toBe(false)

    
  });

  it('It should return false if a extension with multiple dots does not exist inside ignoredExtensions', () => {
    let result = notValidExtension(webExtensionPath, nativeExtensions, true)
    expect(result).toBe(false)
  });

  it('it return true if single dot extension is in ignored extension array', () => {
    let result = notValidExtension(pathWithJSFile, ['.js'], true)
    expect(result).toBe(true)
  });
  it('it return false if single dot extension is not in ignored extension array', () => {
    let result = notValidExtension(pathWithJSWebFile, ['.js'], true)
    expect(result).toBe(false)
  });

});


})