import { hasPathWith } from "../src/features/collect-paths/has-path-with";
import { fileWithJsonPath, nativeExtensionPath, nodeModulesPath } from "./shared.test";

describe('hasPathWith', () => {
  it('should return true since node_modules exists in path', () => {
    const result = hasPathWith([nodeModulesPath], 'node_modules');
    expect(result).toBe(true);
  });

  it('should return true if it finds the filename with extension', () => {
    const result = hasPathWith([nativeExtensionPath], 'myfile.native.ts', true);
    expect(result).toBe(true);
  });

  it('should return true if looking for an extension with multiple dots', () => {
    const result = hasPathWith([nativeExtensionPath], '.native.ts', true);
    expect(result).toBe(true);
  });

  it('should return true if looking just for the filename without an extension', () => {
    const result = hasPathWith([nativeExtensionPath], 'myfile', true);
    expect(result).toBe(true);
  });

  it('should returns true if a single path to check matches an extension in the paths array', () => {
    const result = hasPathWith([fileWithJsonPath, nodeModulesPath], '.json', true);
    expect(result).toBe(true);
  });

  it('returns false if the path to check does not match any item in the paths array', () => {
    const result = hasPathWith([nodeModulesPath], 'nonexistent');
    expect(result).toBe(false);
  });

  it('returns true if any of the multiple paths to check are in the paths array', () => {
    const result = hasPathWith([nodeModulesPath, fileWithJsonPath], ['node_modules', 'nonexistent'], true);
    expect(result).toBe(true);
  });

  it('returns false if none of the multiple paths to check are in the paths array', () => {
    const result = hasPathWith([nodeModulesPath, fileWithJsonPath], ['nonexistent1', 'nonexistent2'], true);
    expect(result).toBe(false);
  });

  // Additional tests can be written to cover more scenarios like nested paths, empty inputs, etc.
});
