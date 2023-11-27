import { dashToCamelCase } from '../src/conversions/dash-to-camel-case';
// Import the dashToCamelCase function if it's in a separate module
// const dashToCamelCase = require('./path-to-your-function');


describe('convertToFeatures', () => {

describe('dashToCamelCase', () => {
    
  
    it('should convert basic dash-case to camelCase', () => {
      let result = dashToCamelCase('dash-case');
      expect(result).toBe('dashCase');
    
    });
  
    it('should handle multiple dashes correctly', () => {
      let result = dashToCamelCase('hello-world-my-name-is-eminem');
      expect(result).toBe('helloWorldMyNameIsEminem');
    });
  
    it('should return an empty string if the input is an empty string', () => {
      expect(dashToCamelCase('')).toBe('');
    });
  
    it('should handle strings with leading and/or trailing dashes', () => {
      let result = dashToCamelCase('-hello-world');
      expect(result).toBe('helloWorld');
      
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
  

} )