import { stripSpecialCharacters } from '../src/conversions/stripe-special-characters';
describe.only('conversionFeatures', () => {

describe('stripSpecialCharacters', () => {
  it('removes special characters from a string', () => {
    const result = stripSpecialCharacters('Hello! @World# $2021%');
    expect(result).toBe('HelloWorld2021');
  });

  it('leaves alphanumeric characters untouched', () => {
    const result = stripSpecialCharacters('A1B2C3');
    expect(result).toBe('A1B2C3');
  });

  it('removes spaces', () => {
    const result = stripSpecialCharacters('He llo Wo rld');
    expect(result).toBe('HelloWorld');
  });

  it('removes all types of special characters', () => {
    const result = stripSpecialCharacters('He#llo$%^&*()-_=+[]{};:\'",.<>/?\\|`~');
    expect(result).toBe('Hello');
  });

  it('returns an empty string if all characters are special', () => {
    const result = stripSpecialCharacters('!@#$%^&*()');
    expect(result).toBe('');
  });

  it('handles an empty string', () => {
    const result = stripSpecialCharacters('');
    expect(result).toBe('');
  });

  it('handles a string with only spaces', () => {
    const result = stripSpecialCharacters('    ');
    expect(result).toBe('');
  });

  // Add more tests if there are more specific scenarios you want to cover
});


})