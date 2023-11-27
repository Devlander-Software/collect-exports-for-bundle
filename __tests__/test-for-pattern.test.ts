import { testForPattern } from "../src/constraints/test-for-pattern";

describe('testForPattern', () => {
  it('returns true when the pattern is found in the content', () => {
    const content = 'This is a sample text with the word "pattern".';
    const pattern = /pattern/;
    const result = testForPattern(content, pattern);
    expect(result).toBe(true);
  });

  it('returns false when the pattern is not found in the content', () => {
    const content = 'This text does not contain the searched word.';
    const pattern = /missingword/;
    const result = testForPattern(content, pattern);
    expect(result).toBe(false);
  });

  it('correctly identifies a pattern at the start of the content', () => {
    const content = 'pattern at the start of the text';
    const pattern = /^pattern/;
    const result = testForPattern(content, pattern);
    expect(result).toBe(true);
  });

  it('correctly identifies a pattern at the end of the content', () => {
    const content = 'text ending with a pattern';
    const pattern = /pattern$/;
    const result = testForPattern(content, pattern);
    expect(result).toBe(true);
  });

  it('returns false for a pattern that should only match at the start but is found elsewhere', () => {
    const content = 'The word is not a pattern at the start.';
    const pattern = /^pattern/;
    const result = testForPattern(content, pattern);
    expect(result).toBe(false);
  });

  // Add more tests for different regex patterns and edge cases as needed...
});
