import { hasNamedTypedExports } from '../src/export-related/has-named-typed-exports';
import { defaultDeclarationTypeTypes } from '../src/types/variable-function-declaration.types';
// Mock data and additional imports as needed.

describe('hasNamedTypedExports', () => {
 
  it('should detect default interface exports', () => {
    const fileContent = 'export default interface Example {};';
    expect(hasNamedTypedExports(fileContent, ['interface'])).toBeTruthy();
  });

  it('should return false if no matching patterns are found', () => {
    const fileContent = 'const example = 123;';
    expect(hasNamedTypedExports(fileContent, defaultDeclarationTypeTypes)).toBeFalsy();
  });


  it('should return false for empty file content', () => {
    const fileContent = '';
    expect(hasNamedTypedExports(fileContent, defaultDeclarationTypeTypes)).toBeFalsy();
  });

});
