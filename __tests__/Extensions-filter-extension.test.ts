import { filterExtension } from '../src/extensions/filter-extension';




describe('filterExtension', () => {
  
  it('It should work fine with basic extensions filterFromExtensionsOrWords', () => {
    const filteredExtensions = ['.js', '.ts', '.jsx', '.tsx', '.web.ts', '.web.tsx']
    let result = filterExtension('.js', filteredExtensions)
    expect(result).toBeNull();

    let resultFromComplexExtension = filterExtension('.js', [".ts"])
    expect(resultFromComplexExtension).toBe(".js");
  });

 
  

  it('It should work fine with complex extensions filterFromExtensionsOrWords', () => {
    let result = filterExtension('.js', ['.web.js'])
    expect(result).toBe(".js");


    let resultTwo = filterExtension('.web.js', ['.js', '.native.js'])
    expect(resultTwo).toBeNull();
  });

  it('it should be able to work with words', () => {
    let result = filterExtension('.web.js', ['web'])
    expect(result).toBeNull();

    let resultTwo = filterExtension('.web.js', ['native'])
    expect(resultTwo).toBe(".web.js");
    
  });


  it('it should be able to work with multiple words and extensions', () => {
    let result = filterExtension('.test.js', ['native', 'web', '.test.js', '.test.ts', '.js'])
    expect(result).toBeNull();
    let resultTwo = filterExtension('.web.js', ['native', 'web', '.test.js', '.test.ts', '.js'])
    expect(resultTwo).toBeNull();
    let resultThree = filterExtension('.ts', ['native', 'web', '.test.js', '.test.ts', '.js', '.web.ts'])
    expect(resultThree).toBe(".ts");
  });
  // Add more tests as needed...
});



