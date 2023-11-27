import { extractDefaultExportVariable } from "../src/export-related/extract-default-export";
import { pathToFileWithDefaultExport, pathWithFunctionExport } from "./shared.test";




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

  

  // Add more tests for various edge cases and different export syntaxes as needed
});
