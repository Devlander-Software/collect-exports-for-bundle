import { removeExtensionAndMakeRelative } from "../src/extensions/remove-extension-and-make-relative";
import { fileContentWithDefaultExport, pathToForTests, pathWithNoExtension } from "./shared.test";

describe('removeExtensionAndMakeRelative', () => {
    it('should correctly convert a file path to a relative path and remove its extension', () => {
        const filepath = fileContentWithDefaultExport
        const rootDir = pathToForTests
      
        const result = removeExtensionAndMakeRelative(filepath, rootDir, true);
        let expected = './../.'
        expect(result).toBe(expected);
      });

      it('should return the relative path unchanged if there is no extension', () => {
        const filepath = pathWithNoExtension
        const rootDir = pathToForTests
      
        const result = removeExtensionAndMakeRelative(filepath, rootDir, true);
        let expected = './.'
        expect(result).toBe(expected);
      });

    });      