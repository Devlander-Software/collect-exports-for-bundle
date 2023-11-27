import { parseComplexExtensions } from '../src/extensions/parse-complex-extensions';


describe('extensionFeatures', () => {

describe('parseComplexExtensions', () => {
  it('correctly parses extensions with single words', () => {
    const result = parseComplexExtensions(['.web.ts']);
    expect(result.words).toEqual(['web']);
    expect(result.extensions).toEqual(['.ts']);
  });

  it('handles multiple words in extensions', () => {
    const result = parseComplexExtensions(['.web.component.tsx']);
    expect(result.words).toEqual(['web', 'component']);
    expect(result.extensions).toEqual(['.tsx']);
  });

  it('ignores empty strings or malformed extensions', () => {
    const result = parseComplexExtensions(['..', '']);
    expect(result.words).toEqual([]);
    expect(result.extensions).toEqual([]);
  });

  it('ensures uniqueness of words and extensions', () => {
    const result = parseComplexExtensions(['.web.ts', '.web.ts']);
    expect(result.words).toEqual(['web']);
    expect(result.extensions).toEqual(['.ts']);
  });
});

});