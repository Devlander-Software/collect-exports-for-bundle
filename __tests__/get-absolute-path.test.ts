import { getAbsolutePath } from "../src/utils/collect-paths";

describe('getAbsolutePath', () => {
  it('should return the correct absolute path and tried paths', async () => {
    // Mock fs.lstat and path.resolve as necessary
    // Example: fs.lstat.mockResolvedValue({ isDirectory: () => true });

    const result = await getAbsolutePath('testPath', { debug: false });
    expect(result).toHaveProperty('absolutePath');
    expect(result).toHaveProperty('paths');
    expect(result.paths).toBeInstanceOf(Array);
    // Add more assertions based on your expected output
  });

  // Add more test cases for different scenarios, like handling errors
});
