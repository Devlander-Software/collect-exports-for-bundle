// getAbsolutePath.test.js
import { Dirent } from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { collectPaths, getAbsolutePath } from '../src/utils/collect-paths';

// Mock the entire fs/promises module
jest.mock('fs/promises', () => ({
  lstat: jest.fn(),
  readdir: jest.fn(),
}));


jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: (...args: any) => args.join('/')
}));

// Cast mocked methods to their Jest mock types
const mockLstat = fs.lstat as jest.MockedFunction<typeof fs.lstat>;
const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>;


const mockJoin = path.join as jest.MockedFunction<typeof path.join>;
mockJoin.mockImplementation((...args) => args.join('/'));

const mockFileDirent = (name: string) => ({
    name,
    isDirectory: () => false,
    isFile: () => true,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
  } as unknown as Dirent);
const mockResolve = path.resolve as jest.MockedFunction<typeof path.resolve>;

describe('getAbsolutePath', () => {
  it('returns the absolute path for a valid directory', async () => {
    const fakeStats = { isDirectory: () => true };
    mockLstat.mockResolvedValue(fakeStats as any);

    mockResolve.mockImplementation(p => p);

    const result = await getAbsolutePath('test/path', { debug: true });
    expect(result.absolutePath).toBe('test/path');
    expect(result.paths).toEqual([]);
  });

  it('handles invalid paths', async () => {
    mockLstat.mockRejectedValue(new Error('Invalid path'));

    const result = await getAbsolutePath('invalid/path', { debug: true });
    expect(result.paths).toEqual([]);
  });

  // Additional test cases...
});

describe('collectPaths', () => {
  it('collects files from a directory', async () => {
    mockReaddir.mockResolvedValue([
        mockFileDirent('file1.ts'),
        mockFileDirent('file2.ts'),
      ]);
    mockLstat.mockResolvedValue({ isDirectory: () => false } as any);

    const mockJoin = path.join as jest.MockedFunction<typeof path.join>;
    mockJoin.mockImplementation((...args) => args.join('/'));

    

    const config = { /* your config object */ };
    const paths = await collectPaths('test/path', config);

    expect(paths).toEqual(['test/path/file1.ts', 'test/path/file2.ts']);
  });

  // Additional test cases...
});
