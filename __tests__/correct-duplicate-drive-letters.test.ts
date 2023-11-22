import { correctDuplicateDriveLetters } from '../src/conversions/correct-duplicate-drive-letters';


describe.only('collectPathsFeature', () => {
describe('correctDuplicateDriveLetters', () => {


  it('removes duplicated drive letters', () => {
    const path = "C:\\C:\\Users\\example";
    expect(correctDuplicateDriveLetters(path)).toBe("C:\\Users\\example");
  });

  it('does not alter a path with a single drive letter', () => {
    const path = "C:\\Users\\example";
    expect(correctDuplicateDriveLetters(path)).toBe("C:\\Users\\example");
  });

  it('does not alter a path without drive letters', () => {
    const path = "/Users/example";
    expect(correctDuplicateDriveLetters(path)).toBe("/Users/example");
  });

  it('handles lowercase drive letters', () => {
    const path = "c:\\c:\\Users\\example";
    expect(correctDuplicateDriveLetters(path)).toBe("c:\\Users\\example");
  });

  // Additional tests can be added for other scenarios and edge cases
});


} )