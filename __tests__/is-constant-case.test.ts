import { isConstantCase } from '../src/constraints/is-constant-case';

describe('constraintFeatures', () => {

describe('isConstantCase', () => {
  it('returns true for a CONSTANT_CASE string', () => {
    expect(isConstantCase('THIS_IS_CONSTANT_CASE')).toBe(true);
  });

  it('returns false for a non-constant case string', () => {
    expect(isConstantCase('notConstantCase')).toBe(false);
  });

  it('returns false for a string with lowercase letters', () => {
    expect(isConstantCase('constant_case')).toBe(false);
  });

  it('returns false for a string with spaces', () => {
    expect(isConstantCase('CONSTANT CASE')).toBe(false);
  });

  it('returns false for a string with numbers at the start', () => {
    expect(isConstantCase('123_CONSTANT_CASE')).toBe(false);
  });

  it('returns false for a string with special characters', () => {
    expect(isConstantCase('CONSTANT_CASE!')).toBe(false);
  });

 

 

  // Additional tests can be written to cover more edge cases
});
})