import { dashToCamelCase } from '../src/utils/dash-to-camel-case';
// Import the dashToCamelCase function if it's in a separate module
// const dashToCamelCase = require('./path-to-your-function');

describe('dashToCamelCase', () => {
    it('should convert a single word without dashes to camelCase', () => {
      expect(dashToCamelCase('word')).toBe('word');
    });
  
    it('should convert basic dash-case to camelCase', () => {
      expect(dashToCamelCase('hello-world')).toBe('helloWorld');
    });
  
    it('should handle multiple dashes correctly', () => {
      expect(dashToCamelCase('hello-world-again')).toBe('helloWorldAgain');
    });
  
    it('should return an empty string if the input is an empty string', () => {
      expect(dashToCamelCase('')).toBe('');
    });
  
    it('should handle strings with leading and/or trailing dashes', () => {
      expect(dashToCamelCase('-hello-world-')).toBe('HelloWorld');
    });
  
    it('should handle strings with consecutive dashes', () => {
      expect(dashToCamelCase('hello--world')).toBe('helloWorld');
    });
  
    it('should handle uppercase characters appropriately', () => {
      expect(dashToCamelCase('Hello-World')).toBe('helloWorld');
    });
  
    // Additional tests could include handling of non-alphabetic characters,
    // numbers, or other edge cases depending on the function's intended behavior.
  });
  