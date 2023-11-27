import { getFilenameFromPath } from '../src/utils/get-file-name-from-path';
import { fileWithJsonPath, nativeExtensionPath, pathWithNoExtension, webExtensionPath } from './shared.test';

describe('collectPathsFeature', () => {

describe('getFilenameFromPath', () => {
  test('extracts filename without extension from a Unix-like path', () => {
    const path = '/user/dev/project/get-cli-permissions.js';
    expect(getFilenameFromPath(path)).toBe('get-cli-permissions');
  });

  test('extracts filename without full extension', () => {
    
    let result = getFilenameFromPath(fileWithJsonPath);;
    expect(result).toBe('example');

  });

  test('returns undefined for a path with no filename', () => {
    const path = '/user/dev/project/';
    expect(getFilenameFromPath(path)).toBe(undefined);
  });

  test('handles file names without an extension', () => {
    const path = pathWithNoExtension

    let result = getFilenameFromPath(path);
    expect(result).toBe('info');
    
  });

  test('handles empty path', () => {
    const path = '';
    let result = getFilenameFromPath(path);
    expect(result).toBe(undefined);

  });

  test('handles paths ending with a dot', () => {
    const path = '/user/dev/project/file.';
    expect(getFilenameFromPath(path)).toBe('file');
  });

  test('handles filenames with multiple dots', () => {
   
    let nativeResult = getFilenameFromPath(nativeExtensionPath);

    expect(nativeResult).toBe('myfile');

    let webResult = getFilenameFromPath(webExtensionPath);
    expect(webResult).toBe('myfile');
  });
});


})