import { getCachedDirectory } from "../src/utils/collect-paths";

describe('getCachedDirectory', () => {
  it('should correctly identify a directory', async () => {
    // Mock fs.lstat as necessary

    const isDirectory = await getCachedDirectory('/path/to/directory');
    expect(isDirectory).toBe(true); // or false based on your mock
  });

  it('should handle errors and return false', async () => {
    // Mock fs.lstat to throw an error

    const result = await getCachedDirectory('/invalid/path');
    expect(result).toBe(false);
  });
});
