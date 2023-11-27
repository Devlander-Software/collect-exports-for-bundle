import { notValidExtension } from "../src/extensions/not-valid-extension";

// Mock the entire parseComplexExtensionFromPath module
jest.mock('../src/extensions/parse-complex-extension-from-path');


describe('extensionFeatures', () => {

describe('notValidExtension', () => {
  const webExtensions = ['.web.ts', '.web.tsx', '.web.js', '.web.jsx'];
  const nativeExtensions = ['.native.ts', '.native.tsx', '.native.js', '.native.jsx'];
  it('should return true with a extension with multiple dots if the extension is in the ignoreExtension array', () => {
    let result = notValidExtension('app.native.ts', nativeExtensions);


    expect(result).toBe(true)

    
  });

  it('It should return false if a extension with multiple dots does not exist inside ignoredExtensions', () => {
    let result = notValidExtension('app.web.ts', nativeExtensions)
    expect(result).toBe(false)
  });

  it('it return true if single dot extension is in ignored extension array', () => {
    let result = notValidExtension('example.js', ['.js'])
    expect(result).toBe(true)
  });
  it('it return false if single dot extension is not in ignored extension array', () => {
    let result = notValidExtension('example.web.js', ['.js'])
    expect(result).toBe(false)
  });

});


})