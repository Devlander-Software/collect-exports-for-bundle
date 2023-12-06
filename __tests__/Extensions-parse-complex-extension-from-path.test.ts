// parseComplexExtensionFromPath.test.ts
import { parseComplexExtensionFromPath } from '../src/extensions/parse-complex-extension-from-path';
import { pathWithDirectory, pathWithNoExtension, pathWithTypesExtension } from './shared.test';


describe('extensionFeatures', () => {

describe('parseComplexExtensionFromPath', () => {
  it('should extract complex extensions correctly', () => {


    const expectedExtension = ".types.ts";
    const {extension, fileName, folderName} = parseComplexExtensionFromPath(pathWithTypesExtension);
    expect(extension).toBe(expectedExtension);
    expect(extension).not.toBe(".types");
    expect(extension).not.toBe(".ts");
    expect(fileName).toBe("t-color.types.ts");
    expect(folderName).toBe(undefined);
  });

  it('should handle file paths without an extension', () => {
    console.log(pathWithNoExtension, 'pathWithNoExtension')
    const {extension, fileName, folderName} = parseComplexExtensionFromPath(pathWithNoExtension);
    console.log(extension, fileName, folderName, 'extension, fileName, folderName')
    expect(extension).toBe(undefined);
    expect(fileName).toBe("info");
    expect(folderName).not.toBe("info");
    expect(folderName).toBe(undefined);
  });

  it('Should handle directory names', () => {
   
   
    const {extension, fileName, folderName} = parseComplexExtensionFromPath(pathWithDirectory);
    expect(extension).toBe(undefined);
    expect(fileName).toBe(undefined);
    expect(fileName).not.toBe("types");

    expect(folderName).toBe("types");
  });

})




})
