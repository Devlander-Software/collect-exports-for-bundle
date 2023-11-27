
import { getCachedDirectory } from "../src/features/collect-paths/get-cached-directory";
import { pathWithDirectory } from "./shared.test";

describe('getCachedDirectory', () => {
  it('should correctly identify a directory', async () => {
    // Mock fs.lstat as necessary

    const isDirectory = await getCachedDirectory(pathWithDirectory);
    expect(isDirectory).toBe(true); // or false based on your mock
  });

  it('should handle errors and return false', async () => {
    // Mock fs.lstat to throw an error

    const result = await getCachedDirectory('/invalid/path');
    expect(result).toBe(false);
  });
});
