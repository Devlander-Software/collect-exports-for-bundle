import { toCamelCase } from '../src/conversions/to-camel-case';

describe('conversionFeatures', () => {

describe('toCamelCase', () => {
  it('should return the string as is if it is already in camelCase', () => {
    const input = 'alreadyCamelCase';
    expect(toCamelCase(input)).toBe('alreadyCamelCase');
  });

  it('should convert kebab-case to camelCase', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
  });

  it('should convert snake_case to camelCase', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
  });

  it('should handle strings with spaces', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  it('should return an empty string if the input is an empty string', () => {
    expect(toCamelCase('')).toBe('');
  });

  it('should remove non-alphanumeric characters', () => {
    expect(toCamelCase('hello!$world')).toBe('helloWorld');
  });

  it('should handle mixed cases and characters', () => {
    expect(toCamelCase('XML-Http_Request')).toBe('xmlHttpRequest');
  });

  // More tests can be added for other scenarios and edge cases
})

})
