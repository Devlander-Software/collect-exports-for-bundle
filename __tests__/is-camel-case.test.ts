import { isCamelCase } from '../src/constraints/is-camel-case';

describe('constraintFeatures', () => {

describe('isCamelCase', () => {
  it('returns true for a camelCase string', () => {
    expect(isCamelCase('camelCase')).toBe(true);
  });

  it('returns false for strings containing underscores', () => {
    expect(isCamelCase('camel_Case')).toBe(false);
  });

  it('returns false for strings containing dashes', () => {
    expect(isCamelCase('camel-Case')).toBe(false);
  });

  it('returns false for PascalCase strings', () => {
    expect(isCamelCase('PascalCase')).toBe(false);
  });

  it('returns false for strings containing special characters', () => {
    expect(isCamelCase('camelCase!')).toBe(false);
  });

  it('returns false for strings starting with a number', () => {
    expect(isCamelCase('1camelCase')).toBe(false);
  });

  it('returns false for uppercase strings', () => {
    expect(isCamelCase('CAMELCASE')).toBe(false);
  });

  it('returns false for lowercase strings', () => {
    expect(isCamelCase('camelcase')).toBe(false); // Lowercase is considered camelCase in many styles
  });



  // Add more tests as needed...
})

})
