import { getExportedFunctionNamesByFilePath } from "../src/export-related/get-exported-function-names-by-filepath";
import { normalFilePath, pathWithNoExports } from "./shared.test";


describe('getExportedFunctionNamesByFilePath', () => {
  it('It should get a var variable', () => {
    let result = getExportedFunctionNamesByFilePath(normalFilePath, ['var']);
    expect(result).toEqual(['myVarFunc', 'myVarVariable', 'myVarObject']);
  });

  it('it should get a const variable if exported', () => {
    let result = getExportedFunctionNamesByFilePath(normalFilePath, ['const']);
    expect(result).toEqual(['myConstFunc', 'myConstVariable', 'myConstObject']);
  });


  it('it should not get a const file if its not exported', () => {
    let result = getExportedFunctionNamesByFilePath(pathWithNoExports, ['const']);
    expect(result).toEqual([]);
  });

  it('it should get a let variable', () => {
    let result = getExportedFunctionNamesByFilePath(normalFilePath, ['let']);
    expect(result).toEqual(['myLetFunc',  'myLetObject',  'myLetVariable']);
  });

  it('should not get a let variable if its not exported', () => {
    let result = getExportedFunctionNamesByFilePath(pathWithNoExports, ['let']);
    expect(result).toEqual([]);
    });


    it('it should get a function', () => {
        let result = getExportedFunctionNamesByFilePath(normalFilePath, ['function']);
        expect(result).toEqual(['myFuncFunc']);
    });

    it('it should get a function if its not exported', () => {
        let result = getExportedFunctionNamesByFilePath(pathWithNoExports, ['function']);
        expect(result).toEqual([]);
    })

    it('it should get a class', () => {
        let result = getExportedFunctionNamesByFilePath(normalFilePath, ['class']);
        expect(result).toEqual(['MyClass']);
    });


    it('it should get a class if its not exported', () => {
        let result = getExportedFunctionNamesByFilePath(pathWithNoExports, ['class']);

        expect(result).toEqual([]);
    }
    );
    it('it should get a enum', () => {
        let result = getExportedFunctionNamesByFilePath(normalFilePath, ['enum']);
        expect(result).toEqual(['MyEnum']);
    });

    it('should not get a enum if its not exported', () => {
        let result = getExportedFunctionNamesByFilePath(pathWithNoExports, ['enum']);
        expect(result).toEqual([]);
    } );

    it('it should get everything if array is empty', () => {
        let result = getExportedFunctionNamesByFilePath(normalFilePath, []);
        expect(result).toEqual(['myFuncFunc', 'myConstFunc', 'myConstVariable', 'myConstObject', 'myLetFunc', 'myLetObject', 'myLetVariable', 'myVarFunc', 'myVarVariable', 'myVarObject', 'MyEnum', 'MyClass']);
    })

    it('it should not get anything since nothing is exported', () => {
        let result = getExportedFunctionNamesByFilePath(pathWithNoExports, []);
        expect(result).toEqual([]);
    }
    );

  // Additional tests for error handling, etc.
});
