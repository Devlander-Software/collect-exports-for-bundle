import { extractDefaultExportVariable } from "../src/export-related/extract-default-export";
import { pathToFileWithDefaultExport, pathToIndexWithDefaultExport, pathWithFunctionExport } from "./shared.test";




describe('extractDefaultExportVariable', () => {


  it('extracts the default export variable name from file content', () => {
    // Mocking the return value of getFileContent to simulate a file with a default export
    const result = extractDefaultExportVariable(pathToFileWithDefaultExport);
    
    expect(result).toBe('MyExampleFunc');
  });

  it('returns null if no default export is present', () => {
    const defaultExport = extractDefaultExportVariable(pathWithFunctionExport);
    expect(defaultExport).toBeNull();
  });


  it('returns the function name if its destructured', () => {
    const defaultExport = extractDefaultExportVariable(pathToIndexWithDefaultExport);

    expect(defaultExport).toBe("TestComp");
  });

 
  

  // Add more tests for various edge cases and different export syntaxes as needed
});
