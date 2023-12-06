import { collectPaths } from '../src/features/collect-paths/collect-paths';
import { hasPathWith } from '../src/features/collect-paths/has-path-with';
import { pathToForTests } from "./shared.test";

// Returning a promise directly from collectPathsForTestsOne
const collectPathsForTestsOne = () => collectPaths(pathToForTests, {
  debug: false, 
  ignoredExtensions: [".yellowbus.school.ts"],
  allowedExtensions: [".ts"],
});

describe('collectPathsFeature', () => {
  describe('collectPaths', () => {
  
    it('Should not find any extensions with .yellowbus.school.ts', async () => {
 
      const doesPathForTestsInclude = pathToForTests.includes("src/for-tests");
      expect(doesPathForTestsInclude).toBe(true);

      const result = await collectPathsForTestsOne();
      expect(result).toBeInstanceOf(Array);

      let wordsToCheck = [".yellowbus.school.ts"];
      let found = hasPathWith(result, wordsToCheck, true);
      expect(found).toBe(false);

    });



    it("node_modules and typings should not be in result from collect paths", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["node_modules", "typings"],
        ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts"],
      });

      expect(result).toBeInstanceOf(Array);

      let wordsToCheck = ["node_modules", "typings"];
      let found = hasPathWith(result, wordsToCheck, true);
      expect(found).toBe(false);
    });

    it("Should find paths with node_modules and typings since they are not in excludedFolders", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: [],
        ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts", ".type.ts"],
      });

      let foundFolders = hasPathWith(result, ["node_modules", "typings"], true);
      expect(foundFolders).toBe(true);
    });

    it("it should not find any .native.ts files since they are included in ignoredExtensions", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["typings"],
        ignoredExtensions: [".native.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts", ".type.ts"],
      });

      let foundFiles = hasPathWith(result, ".native.ts", true);
      expect(foundFiles).toBe(false);
    });

    it("it should find .ts files as long as the .ts files are not in ignoredExtensions", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["typings"],
        ignoredExtensions: [".native.ts", ".yellowbus.school.ts"],
        allowedExtensions: [".ts", ".type.ts"],
      });


      let foundFiles = hasPathWith(result, [".native.ts", '.yellowbus.school.ts'], true);
      expect(foundFiles).toBe(false);

      let foundFilesTypescriptFiles = hasPathWith(result, [".ts"]);
      expect(foundFilesTypescriptFiles).toBe(true);
    });


    it("If includeIndexes is not defined in config it should not gather index files", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["node_modules"],
        allowedExtensions: [".ts", ".type.ts"],
        includeIndexes: false,
      });
 

      let foundTestComp = hasPathWith(result, ["TestComp"], true);
      expect(foundTestComp).toBe(true);

      let foundTestIndex = hasPathWith(result, ["index"], true);
      expect(foundTestIndex).toBe(false);


    });

    it("If includeIndexes is set to true it will gather the indexes", async () => {
      const result = await collectPaths(pathToForTests, { 
        debug: false, 
        excludedFolders: ["node_modules"],
        allowedExtensions: [".ts", ".type.ts"],
        includeIndexes: true,
      });



      let foundTestComp = hasPathWith(result, ["TestComp"], true);
      expect(foundTestComp).toBe(true);

      let foundTestIndex = hasPathWith(result, ["index"], true);
      expect(foundTestIndex).toBe(true);


    });

    // Add more test cases for different scenarios, like handling errors
  });
});
