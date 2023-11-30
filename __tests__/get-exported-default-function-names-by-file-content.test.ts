import { getExportedDefaultFunctionsByFileContent } from "../src/export-related/get-exported-default-function-names-by-filecontent";
import { getFileContent } from "../src/utils/get-file-content";
import { fileContentWithIndexDefaultExport, pathWithDefaultFuncFunc } from './shared.test';

describe('getExportedDefaultFunctionNamesByFileContent', () => {
    it('should return function names for default exports', () => {
        const fileContent = getFileContent(pathWithDefaultFuncFunc);
        const expectedFunctionNames = ['TestFunc'];
      
        const result = getExportedDefaultFunctionsByFileContent(fileContent);
      
        expect(result).toEqual(expectedFunctionNames);
      });

      it('should return an empty array if no default exports are found', () => {
        const fileContent = `function TestFunc() {}`;
      
        const result = getExportedDefaultFunctionsByFileContent(fileContent);
      
        expect(result).toEqual([]);
      });

      it('it should handle destructured named imports that are exported as default', () => {
      
        const result = getExportedDefaultFunctionsByFileContent(fileContentWithIndexDefaultExport);
        console.log(result, 'this is result for getExportedDefaultFunctionsByFileContent')
        expect(result).toEqual(["TestComp"]);
      });
      
      

    })