import { notValidExtension } from "../src/extensions/not-valid-extension";
import * as parseComplexExtensionModule from "../src/extensions/parse-complex-extension-from-path";

// Mock the entire parseComplexExtensionFromPath module
jest.mock('../src/extensions/parse-complex-extension-from-path');


describe.only('extensionFeatures', () => {

describe('notValidExtension', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    // Here we cast the mocked function to jest.Mock to access mockReset
    (parseComplexExtensionModule.parseComplexExtensionFromPath as jest.Mock).mockReset();
  });

  it('should return true for a file with an ignored extension', () => {
    (parseComplexExtensionModule.parseComplexExtensionFromPath as jest.Mock).mockReturnValue({ extension: '.ignored.ts', fileName: 'example' });
    expect(notValidExtension('example.ignored.ts', ['.ignored.ts'])).toBe(true);
  });

  it('should return false for a file with a non-ignored extension', () => {
    (parseComplexExtensionModule.parseComplexExtensionFromPath as jest.Mock).mockReturnValue({ extension: '.allowed.ts', fileName: 'example' });
    expect(notValidExtension('example.allowed.ts', ['.ignored'])).toBe(false);
  });

  it('should return false for a file with no extension', () => {
    (parseComplexExtensionModule.parseComplexExtensionFromPath as jest.Mock).mockReturnValue({ extension: '.ts', fileName: 'example' });
    expect(notValidExtension('example.ts', ['.ignored.ts'])).toBe(false);
  });

  it('should return false for an empty string as file path', () => {
    (parseComplexExtensionModule.parseComplexExtensionFromPath as jest.Mock).mockReturnValue({ extension: '', fileName: '' });
    expect(notValidExtension('', ['.ignored.ts'])).toBe(false);
  });
});


})