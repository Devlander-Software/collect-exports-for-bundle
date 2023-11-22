import { isDashCase } from '../src/constraints/is-dash-case';

describe.only('constraintFeatures', () => {

describe('isDashCase', () => {
  it('returns true for a dash-case string', () => {
    expect(isDashCase('this-is-dash-case')).toBe(true);
  });

  it('returns false for strings not in dash-case', () => {
    expect(isDashCase('notDashCase')).toBe(false);
  });

  it('returns false for strings with uppercase letters', () => {
    expect(isDashCase('Not-Dash-Case')).toBe(false);
  });

  it('returns false for strings with spaces', () => {
    expect(isDashCase('not dash case')).toBe(false);
  });

  it('returns false for strings with special characters', () => {
    expect(isDashCase('dash-case!')).toBe(false);
  });

  it('returns false for strings starting with a dash', () => {
    expect(isDashCase('-dash-case')).toBe(false);
  });

  it('returns false for strings ending with a dash', () => {
    expect(isDashCase('dash-case-')).toBe(false);
  });

  

  // Additional tests can be written to cover more edge cases and different inputs
});

})
