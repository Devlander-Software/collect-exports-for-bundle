import { createExtensions } from '../src/extensions/create-extensions';
import { getExtensions } from '../src/extensions/get-extensions';



// Mock the imported functions with correct typings
jest.mock('../src/utils/log-with-color', () => ({
  logColoredMessage: jest.fn(),
  logFailedMessage: jest.fn(),
}));

jest.mock('../src/extensions/create-extensions', () => ({
  createExtensions: jest.fn() as jest.Mock<typeof createExtensions>
}));

describe('extensionFeatures', () => {

describe('getExtensions', () => {
  const extensions = ['.js', '.ts', '.jsx', '.tsx', '.web.ts', '.web.tsx', '.native.ts', '.native.tsx', '.test.ts', '.test.tsx'];
  const nativeExtensions = ['.native.ts', '.native.tsx'];
  const webExtensions = ['.web.ts', '.web.tsx'];
  const testExtensions = ['.test.ts', '.test.tsx'];
  const extensionsFilteredByWords = ['.js', '.jsx'];
  const wordsToFilterBy = ['test', 'native', 'web'];

  it('filters out extensions that are included in the filter list', () => {
    const result = getExtensions(extensions, [...nativeExtensions, ...testExtensions]);
    const expected = ['.js', '.ts', '.jsx', '.tsx', '.web.ts', '.web.tsx']
    expect(result).toEqual(expected);
  });

  

  it('it can successfully filter out extensions by words', () => {
    const result = getExtensions(extensions, wordsToFilterBy)
    const expected = ['.js', '.ts', '.jsx', '.tsx']
    expect(result).toEqual(expected);
  });

 



  it('returns an empty array if all the extensions are filtered out', () => {
  

    const result = getExtensions(extensions, extensions);
    expect(result).toEqual([]);
  });

  // Add more tests as needed...
});


});

