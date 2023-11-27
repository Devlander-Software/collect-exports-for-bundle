import { fileHasValidExtension } from "../src/extensions/has-valid-extension";
import { nativeExtensionPath, pathWithNoExtension, webExtensionPath } from "./shared.test";




describe.only('fileHasValidExtension', () => {

   
    it('should return false for an explicitly excluded file', () => {
        let result = fileHasValidExtension(nativeExtensionPath, {
       
            ignoredExtensions: ['.native.ts'],
            allowedExtensions: ['.web.ts']
        });
      expect(result).toBe(false);
    });
  
    it('should return true for an explicitly included file', () => {
        let result = fileHasValidExtension(webExtensionPath, {
                                                                                   
            ignoredExtensions: ['.native.ts'],
            allowedExtensions: ['.web.ts']
        });                 
    
      expect(result).toBe(true);
    });
  
 
  
    it('should return false for a file with no extension', () => {
        let result = fileHasValidExtension(pathWithNoExtension, {
            ignoredExtensions: ['.native.ts'],
            allowedExtensions: ['.web.ts']
        });
      expect(result).toBe(false);
    });
  });
  

