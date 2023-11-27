import { getExportedTypeDeclarationsByFilePath } from '../src/export-related/get-exported-type-declarations-by-filepath';
import { pathToFileWithDefaultExport, pathWithInterfaceInFile, pathWithTypesExtension } from './shared.test';



describe('getExportedTypeDeclarationsByFilePath', () => {
  // Setup for regex definitions and other constants if necessary

  

  it('should extract type from fileContent if exists', () => {
    
 

    const result = getExportedTypeDeclarationsByFilePath(pathWithTypesExtension, ['type']);
    expect(result).toEqual(['TColorValue']);
  });

  it('should not return the type if looking for only interfaces and interface does not exist', () => {
    
 

    const result = getExportedTypeDeclarationsByFilePath(pathWithInterfaceInFile, ['interface']);
    
    expect(result).toEqual(["TestOptions"]);
  }
    );


  it('should extract interface from fileContent if exists', () => {
    
 

    const result = getExportedTypeDeclarationsByFilePath(pathWithInterfaceInFile, ['interface']);
    expect(result).toEqual(['TestOptions']);
  });

    it('should not return the interface if looking for only types and type does not exist', () => {
        
     
    
        const result = getExportedTypeDeclarationsByFilePath(pathWithInterfaceInFile, ['type']);
        expect(result).toEqual([]);
    }
        );

  it('should return null if there are no exported types or interfaces', () => {
    
    const result = getExportedTypeDeclarationsByFilePath(pathToFileWithDefaultExport, ['type']);
    expect(result).toEqual([]);
  });

  // More tests can be added to cover different scenarios
});
