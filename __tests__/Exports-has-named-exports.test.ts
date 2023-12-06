import { hasNamedExports } from '../src/export-related/has-named-exports';
import { fileContentWithLetVariables } from './shared.test';
// Mock data and additional imports as needed.

describe('hasNamedExports', () => {
 
  it('should be able to detect let variables', () => {
    console.log('fileContentWithLetVariables', fileContentWithLetVariables)
    let result = hasNamedExports(fileContentWithLetVariables, true);
    console.log('result', result)
    
    expect(hasNamedExports(fileContentWithLetVariables)).toBeTruthy();
  });



  

});
