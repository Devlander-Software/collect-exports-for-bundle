import { getFilenameFromPath } from '../src/utils/get-file-name-from-path';

describe('getFilenameFromPath', () => {
  test('extracts filename without extension from a Unix-like path', () => {
    const path = '/user/dev/project/get-cli-permissions.js';
    expect(getFilenameFromPath(path)).toBe('get-cli-permissions');
  });

  test('extracts filename without extension from a Windows path', () => {
    const path = 'C:\\Users\\lj___\\collect-exports-for-bundle\\example\\src\\packages\\@devlander\\package-json-helper\\get-cli-permissions.js';
    expect(getFilenameFromPath(path)).toBe('get-cli-permissions');
  });

  test('returns undefined for a path with no filename', () => {
    const path = '/user/dev/project/';
    expect(getFilenameFromPath(path)).toBe(undefined);
  });

  test('handles file names without an extension', () => {
    const path = '/user/dev/project/README';
    expect(getFilenameFromPath(path)).toBe('README');
  });

  test('handles empty path', () => {
    const path = '';
    expect(getFilenameFromPath(path)).toBe(undefined);
  });

  test('handles paths ending with a dot', () => {
    const path = '/user/dev/project/file.';
    expect(getFilenameFromPath(path)).toBe('file');
  });

  test('handles filenames with multiple dots', () => {
    const path = '/user/dev/project/file.name.js';
    expect(getFilenameFromPath(path)).toBe('file');
  });
});
