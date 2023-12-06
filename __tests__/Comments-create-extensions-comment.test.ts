
import { createExtensionsComment } from '../src/comments/create-extensions-comment';

describe('createExtensionsComment', () => {
  it('should format comment correctly with both allowed and ignored extensions', () => {
    const allowedExtensions: string[] = ['.js', '.ts'];
    const ignoredExtensions: string[] = ['.test.js', '.spec.js'];

    const expectedOutput = 
      `/**
     * Allowed Extensions: .js, .ts
    * Ignored Extensions: .test.js, .spec.js
     */
    `;

    expect(createExtensionsComment(allowedExtensions, ignoredExtensions)).toBe(expectedOutput);
  });
  
  it('should handle empty arrays correctly', () => {
    const allowedExtensions: string[] = [];
    const ignoredExtensions: string[] = [];

    const expectedOutput = 
      `/**
     * Allowed Extensions: 
    * Ignored Extensions: 
     */
    `;

    expect(createExtensionsComment(allowedExtensions, ignoredExtensions)).toBe(expectedOutput);
  });

  it('should handle one empty array correctly', () => {
    const allowedExtensions: string[] = ['.js', '.ts'];
    const ignoredExtensions: string[] = [];

    const expectedOutput = 
      `/**
     * Allowed Extensions: .js, .ts
    * Ignored Extensions: 
     */
    `;

    expect(createExtensionsComment(allowedExtensions, ignoredExtensions)).toBe(expectedOutput);
  });

  // You can add more tests for other scenarios, like arrays with a single element, etc.
});
