import { getFilenameFromPath } from '../src/utils/get-file-name-from-path';
import { complexFilePath, nativeExtensionPath, pathWithDirectory, pathWithJSFile, pathWithNoExtension, webExtensionPath } from './shared.test';

describe('collectPathsFeature', () => {

describe('getFilenameFromPath', () => {
  test('extracts filename without extension from a Unix-like path', () => {
    const path = pathWithJSFile;
    expect(getFilenameFromPath(path)).toBe('example-for-js');
  });

  test('extracts filename without full extension', () => {
    
    let result = getFilenameFromPath(complexFilePath);;
    expect(result).toBe('FuncComponentWithNoReturnType.web');

  });

  test('returns undefined for a path with no filename', () => {
    const path = `${pathWithDirectory}/`
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

  test('handles filenames with multiple dots', () => {
   
    let nativeResult = getFilenameFromPath(nativeExtensionPath);

    expect(nativeResult).toBe('myfile.native');

    let webResult = getFilenameFromPath(webExtensionPath);
    expect(webResult).toBe('myfile.web');
  });
});


})