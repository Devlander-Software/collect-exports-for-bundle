import { hasPathWith } from "../src/features/collect-paths/has-path-with";
import { fileWithJsonPath, nodeModulesPath } from "./shared.test";

describe('hasPathWith', () => {
  it('should return true since node_modules exists in path', () => {
    let withNodeModulesInPath = hasPathWith([nodeModulesPath], 'node_modules');
    expect(withNodeModulesInPath).toBe(true);
  });

  it('returns true if a single path to check is not in the paths array', () => {
    let result = hasPathWith([nodeModulesPath, fileWithJsonPath], 'path1');
    expect(result).toBe(true);
  });

  it('returns false if one of the multiple paths to check is in the paths array', () => {
    let result = !hasPathWith([nodeModulesPath, fileWithJsonPath], 'node_modules');
    expect(result).toBe(false);
  });

  it('returns true if none of the multiple paths to check are in the paths array', () => {
    let result = hasPathWith([nodeModulesPath, fileWithJsonPath], 'path1');
    expect(result).toBe(true);
  });

 

  // Additional tests can be written to cover more edge cases and different inputs
});

