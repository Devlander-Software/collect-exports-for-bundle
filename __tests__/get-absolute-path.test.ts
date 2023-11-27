
import { getAbsolutePath } from '../src/features/collect-paths/absolute-path';
import { hasPathWith } from '../src/features/collect-paths/has-path-with';
import { pathToForTests } from "./shared.test";

describe('getAbsolutePath', () => {

  
  it('should return the correct absolute path and tried paths', async () => {
    // Mock fs.lstat and path.resolve as necessary
    // Example: fs.lstat.mockResolvedValue({ isDirectory: () => true });

    const result = await getAbsolutePath(pathToForTests, { debug: false, 
      excludedFolders: ["node_modules", "typings"],
      ignoredExtensions: [".yellowbus.school.ts"],
      allowedExtensions: [".ts"],
    });


    console.log(result, 'this is result for absolute path')
    const doesPathForTestsInclude = pathToForTests.includes("src/for-tests");
    expect(doesPathForTestsInclude).toBe(true);
    expect(result).toHaveProperty('absolutePath');
    expect(result).toHaveProperty('paths');
    expect(result.paths).toBeInstanceOf(Array);

    let wordsToCheck = [".yellowbus.school.ts"];
    let found = hasPathWith(result.paths, wordsToCheck);
   
    expect(found).toBe(true)

    // Add more assertions based on your expected output
  });

  


  it("it should not return paths with node_modules or typings since they are in excludedFolders", async () => {
    const result = await getAbsolutePath(pathToForTests, { debug: false, 
      excludedFolders: ["node_modules", "typings"],
      ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
      allowedExtensions: [".ts"],
    });

    console.log(result, 'this is result for excludedFolders')

    expect(result).toHaveProperty('paths');

    let wordsToCheck = ["node_modules", "typings"];
    let found = false;
    wordsToCheck.forEach(word => {
      hasPathWith(result.paths, word);
    } )
   
    expect(found).toBe(false)
  
  })


  it("It should find paths related to both node_modules and typings since they are not in excludedFolders", async () => {
    const result = await getAbsolutePath(pathToForTests, { debug: false, 
      excludedFolders: [],
      ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
      allowedExtensions: [".ts", ".type.ts"],
    });

    expect(result).toHaveProperty('paths');
    let foundFolders = hasPathWith(result.paths, ["node_modules", "typings"]);
    
   
    expect(foundFolders).toBe(true);
  })

  it("it should not find any .native files since they are not included in allowed extensions", async () => {
    const result = await getAbsolutePath(pathToForTests, { debug: false, 
      excludedFolders: ["typings"],
      ignoredExtensions: [".native.ts", ".web.ts", ".yellowbus.school.ts"],
      allowedExtensions: [".ts", ".type.ts"],
    });

    
    let foundFolders = hasPathWith(result.paths, ".native.ts");
    
   
    expect(foundFolders).toBe(false);
  })

  // Add more test cases for different scenarios, like handling errors
});
