import { processDirectoryContents } from "../src/utils/collect-paths";

describe('processDirectoryContents', () => {
  it('should process contents of a directory correctly', async () => {
    // Mock fs.readdir, fs.lstat, and other dependencies as necessary

    const paths = await processDirectoryContents('/path/to/directory', [], { /* Mock config */ });
    expect(paths).toBeInstanceOf(Array);
    // Additional assertions...
  });

  // Add more tests to cover different scenarios like excluded folders, handling files, etc.
});
