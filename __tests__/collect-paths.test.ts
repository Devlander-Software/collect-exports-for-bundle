import { collectPaths } from '../src/features/collect-paths/collect-paths';
import { hasPathWith } from '../src/features/collect-paths/has-path-with';
import { pathToForTests } from "./shared.test";

// Returning a promise directly from collectPathsForTestsOne
const collectPathsForTestsOne = () => collectPaths(pathToForTests, {
  debug: false, 
  excludedFolders: ["node_modules", "typings"],
  ignoredExtensions: [".yellowbus.school.ts"],
  allowedExtensions: [".ts"],
});

describe.only('collectPathsFeature', () => {
  describe('collectPaths', () => {
  
    it('should return the correct absolute path and tried paths', async () => {
      // Mock fs.lstat and path.resolve as necessary
      // Example: fs.lstat.mockResolvedValue({ isDirectory: () => true });

      const doesPathForTestsInclude = pathToForTests.includes("src/for-tests");
      expect(doesPathForTestsInclude).toBe(true);

      const result = await collectPathsForTestsOne();
      expect(result).toBeInstanceOf(Array);

      let wordsToCheck = [".yellowbus.school.ts"];
      let found = hasPathWith(result, wordsToCheck);
      expect(found).toBe(true);

      // Add more assertions based on your expected output
    });

    it("it should not return paths with node_modules or typings since they are in excludedFolders", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["node_modules", "typings"],
        ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts"],
      });

      expect(result).toBeInstanceOf(Array);

      let wordsToCheck = ["node_modules", "typings"];
      let found = hasPathWith(result, wordsToCheck);
      expect(found).toBe(false);
    });

    it("It should find paths related to both node_modules and typings since they are not in excludedFolders", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: [],
        ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts", ".type.ts"],
      });

      let foundFolders = hasPathWith(result, ["node_modules", "typings"]);
      expect(foundFolders).toBe(true);
    });

    it("it should not find any .native files since they are not included in allowed extensions", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["typings"],
        ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts", ".type.ts"],
      });

      let foundFiles = hasPathWith(result, ".native.ts");
      expect(foundFiles).toBe(false);
    });

    // Add more test cases for different scenarios, like handling errors
  });
});
