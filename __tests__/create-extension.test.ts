import { createExtension } from "../src/extensions/create-extension";

describe('createExtension', () => {

it('should correctly concatenate words and extensions with dots', () => {
    const result = createExtension('main', 'additional', 'ext');
    expect(result).toBe('.main.additional.ext');
  });
  

  it('should correctly concatenate words and extensions with dots', () => {
    const result = createExtension('main', 'additional', 'ext');
    expect(result).toBe('.main.additional.ext');
  });

  it('should handle an empty main word correctly', () => {
    const result = createExtension('', 'additional', 'ext');
    expect(result).toBe('.additional.ext');
  });
  it('should handle an empty main word correctly', () => {
    const result = createExtension('', 'additional', 'ext');
    expect(result).toBe('.additional.ext');
  });
  it('should handle an empty file extension correctly', () => {
    const result = createExtension('main', 'additional', '');
    expect(result).toBe('.main.additional');
  });
  it('should add leading dots if they are missing', () => {
    const result = createExtension('main', 'additional', 'ext');
    expect(result).toBe('.main.additional.ext');
  });
  it('should not add extra dots if they are already present', () => {
    const result = createExtension('.main', '.additional', '.ext');
    expect(result).toBe('.main.additional.ext');
  });
  
  it('should return an empty string if all parameters are empty', () => {
    const result = createExtension('', '', '');
    expect(result).toBe('');
  });
  it('should handle a mix of empty and non-empty parameters correctly', () => {
    const result = createExtension('main', '', '.ext');
    expect(result).toBe('.main.ext');
  });
    
});