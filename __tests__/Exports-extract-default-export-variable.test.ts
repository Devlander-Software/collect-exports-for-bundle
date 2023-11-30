import { extractDefaultExportVariable } from '../src/export-related/extract-default-export';
import { extractDefaultExportVariableByFilePath } from '../src/export-related/extract-default-export-by-file-path';
import { fileContentWithDefaultExport, fileContentWithFunction, fileContentWithIndexDefaultExport, pathToFileWithDefaultExport, pathToIndexWithDefaultExport, pathWithFunctionExport } from "./shared.test";




describe('extractDefaultExportVariableByFilePath', () => {


  it('extracts the default export variable name from file content', () => {
    // Mocking the return value of getFileContent to simulate a file with a default export
    const result = extractDefaultExportVariableByFilePath(pathToFileWithDefaultExport);
    
    expect(result).toBe('MyExampleFunc');
  });

  it('returns null if no default export is present', () => {
    const defaultExport = extractDefaultExportVariableByFilePath(pathWithFunctionExport);
    expect(defaultExport).toBeNull();
  });


  it('returns the function name if its destructured', () => {
    const defaultExport = extractDefaultExportVariableByFilePath(pathToIndexWithDefaultExport);

    expect(defaultExport).toBe("TestComp");
  });

 
  

  // Add more tests for various edge cases and different export syntaxes as needed
});


describe('extractDefaultExportVariable', () => {


  it('extracts the default export variable name from file content', () => {
    // Mocking the return value of getFileContent to simulate a file with a default export
    const result = extractDefaultExportVariable(fileContentWithDefaultExport);
    
    expect(result).toBe('MyExampleFunc');
  });

  it('returns null if no default export is present', () => {
    const defaultExport = extractDefaultExportVariable(fileContentWithFunction);
    expect(defaultExport).toBeNull();
  });


  it('returns the function name if its destructured', () => {
    const defaultExport = extractDefaultExportVariable(fileContentWithIndexDefaultExport);

    expect(defaultExport).toBe("TestComp");
  });

 
  

  // Add more tests for various edge cases and different export syntaxes as needed
});
