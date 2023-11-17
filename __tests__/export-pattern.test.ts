import { testForExportPattern } from '../src/utils/export-patterns';

describe('testForExportPattern', () => {
  test('Positive match for a simple pattern', () => {
    const fileContent = "This file contains an export statement: export const myVar = 123;";
    const pattern = /export\s+const\s+\w+\s*=/;
    expect(testForExportPattern(fileContent, pattern)).toBe(true);
  });

  test('Negative match for a simple pattern', () => {
    const fileContent = "This file does not contain the specified pattern.";
    const pattern = /export\s+const\s+\w+\s*=/;
    expect(testForExportPattern(fileContent, pattern)).toBe(false);
  });

  test('Test with an empty string', () => {
    const fileContent = "";
    const pattern = /export\s+const\s+\w+\s*=/;
    expect(testForExportPattern(fileContent, pattern)).toBe(false);
  });

  test('Complex pattern match', () => {
    const fileContent = "export function myFunc() { return true; }";
    const pattern = /export\s+function\s+[a-zA-Z_$][0-9a-zA-Z_$]*\s*\(\s*\)/;
    expect(testForExportPattern(fileContent, pattern)).toBe(true);
  });

  test('Complex pattern no match', () => {
    const fileContent = "function myFunc() { return true; } // no export here";
    const pattern = /export\s+function\s+[a-zA-Z_$][0-9a-zA-Z_$]*\s*\(\s*\)/;
    expect(testForExportPattern(fileContent, pattern)).toBe(false);
  });

  test('Multiline string with match', () => {
    const fileContent = `function noExportFunc() {}\nexport const myVar = 123;\nexport function anotherFunc() {}`;
    const pattern = /export\s+const\s+\w+\s*=/;
    expect(testForExportPattern(fileContent, pattern)).toBe(true);
  });

  test('Multiline string without match', () => {
    const fileContent = `function noExportFunc() {}\nconst myVar = 123;\nfunction anotherFunc() {}`;
    const pattern = /export\s+const\s+\w+\s*=/;
    expect(testForExportPattern(fileContent, pattern)).toBe(false);
  });

  test('Pattern with special characters', () => {
    const fileContent = "export const $specialVar_123 = 'value';";
    const pattern = /export\s+const\s+\$[a-zA-Z_$][0-9a-zA-Z_$]*\s*=/;
    expect(testForExportPattern(fileContent, pattern)).toBe(true);
  });
});
