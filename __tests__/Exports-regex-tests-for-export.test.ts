
import { regexDefinitions } from "../src/constraints/regex-definitions";


describe('detectExports', () => { 
    
    
    test('matchesInterfaceExport', () => {
        expect(regexDefinitions.matchesInterfaceExport.test('export interface MyInterface {}')).toBe(true);
        expect(regexDefinitions.matchesInterfaceExport.test('interface MyInterface {}')).toBe(false);
      });
      
      test('matchesFunctionExport', () => {
        expect(regexDefinitions.matchesFunctionExport.test('export function myFunction() {}')).toBe(true);
        expect(regexDefinitions.matchesFunctionExport.test('function myFunction() {}')).toBe(false);
      });
    test('matchesConstExport', () => {
        expect(regexDefinitions.matchesConstExport.test('export const myConst = {}')).toBe(true);
        expect(regexDefinitions.matchesConstExport.test('const myConst = {}')).toBe(false);
      });
      
     
      
      test('matchesEnumExport', () => {
        expect(regexDefinitions.matchesEnumExport.test('export enum MyEnum {}')).toBe(true);
        expect(regexDefinitions.matchesEnumExport.test('enum MyEnum {}')).toBe(false);
      });
      
      test('matchesClassExport', () => {
        expect(regexDefinitions.matchesClassExport.test('export class MyClass {}')).toBe(true);
        expect(regexDefinitions.matchesClassExport.test('class MyClass {}')).toBe(false);
      });
    test('matchesLetExport', () => {
        // failing
        //   matchesLetExport: /export\s+let\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g,
    
        expect(regexDefinitions.matchesLetExport.test('export let myLet = "cool"')).toBe(true);
        // passing
        expect(regexDefinitions.matchesLetExport.test('let myLet')).toBe(false);
      });
      test('matchesVarExport', () => {
        let result = regexDefinitions.matchesVarExport.test('export var myVar = `myValue`')
        expect(result).toBe(true);

       
      });
    test('matchesDefaultExport', () => {
        expect(regexDefinitions.matchesDefaultExport.test('export default myFunction')).toBe(true);

        expect(regexDefinitions.matchesDefaultExport.test('export myFunction')).toBe(false);
      });

      test('matchesNamedExport', () => {
        expect(regexDefinitions.matchesNamedExport.test('export const myConst = {}')).toBe(true);
        expect(regexDefinitions.matchesNamedExport.test('const myConst = {}')).toBe(false);
      });
      
      test('matchesTypeExport', () => {
        expect(regexDefinitions.matchesTypeExport.test('export type MyType = {}')).toBe(true);
        expect(regexDefinitions.matchesTypeExport.test('type MyType = {}')).toBe(false);
      });
  });


describe('Export var regex tests', () => {

  it('should match export var statement with function assignment', () => {
    const code = 'export var myVarFunc = function (): string { return "Hello World" }';
    expect(code.match(regexDefinitions.matchesVarExport)).not.toBeNull();
  });

  it('should not match export const statement', () => {
    const code = 'export const myConstFunc = (): string => { return "Hello World" }';
    expect(code.match(regexDefinitions.matchesVarExport)).toBeNull();
  });

  it('should not match export function statement', () => {
    const code = 'export function myFuncFunc(): string { return "Hello World" }';
    expect(code.match(regexDefinitions.matchesVarExport)).toBeNull();
  });

  it('should handle different spacings and line breaks', () => {
    const code = 'export var   myVarFunc\n = \nfunction   (): string { return "Hello World" }';
    expect(code.match(regexDefinitions.matchesVarExport)).not.toBeNull();
  });

  // ...additional tests for other cases...
});


describe('Export interface regex tests', () => {

  it('should match a single-line export interface statement', () => {
    const code = 'export interface TestOptions { babelPresets: string[] }';
    expect(code.match(regexDefinitions.matchesInterfaceExport)).not.toBeNull();
  });

  it('should match a multi-line export interface statement', () => {
    const code = `export interface TestOptions {
      babelPresets: string[]
    }`;
    expect(code.match(regexDefinitions.matchesInterfaceExport)).not.toBeNull();
  });

  it('should not match an export class statement', () => {
    const code = 'export class TestOptions { constructor() {} }';
    expect(code.match(regexDefinitions.matchesInterfaceExport)).toBeNull();
  });

  it('should handle different spacings and line breaks in interface definition', () => {
    const code = `export interface   TestOptions 
    {
      babelPresets: string[]
    }`;
    expect(code.match(regexDefinitions.matchesInterfaceExport)).not.toBeNull();
  });

  // ...additional tests for other cases...
});


describe('Export enum regex tests', () => {

  it('should match a single-line export enum statement', () => {
    const code = 'export enum MyEnum { Option1, Option2 }';
    expect(code.match(regexDefinitions.matchesEnumExport)).not.toBeNull();
  });

  it('should match a multi-line export enum statement', () => {
    const code = `export enum MyEnum {
      Option1 = 'Value1',
      Option2 = 'Value2'
    }`;
    expect(code.match(regexDefinitions.matchesEnumExport)).not.toBeNull();
  });

  it('should not match an export class statement', () => {
    const code = 'export class MyClass { constructor() {} }';
    expect(code.match(regexDefinitions.matchesEnumExport)).toBeNull();
  });

  it('should handle different spacings and line breaks in enum definition', () => {
    const code = `export enum   MyEnum 
    {
      Option1 = 'Value1',
      Option2 = 'Value2'
    }`;
    expect(code.match(regexDefinitions.matchesEnumExport)).not.toBeNull();
  });

  // ...additional tests for other cases...
});


describe('Export type regex tests', () => {

  it('should match an export type alias statement', () => {
    const code = 'export type MyType = string | number;';
    expect(code.match(regexDefinitions.matchesTypeExport)).not.toBeNull();
  });

  it('should match an export type statement without immediate equals sign', () => {
    const code = 'export type TColorValue = keyof typeof TColor';
    expect(code.match(regexDefinitions.matchesTypeExport)).not.toBeNull();
  });

  it('should not match an export class statement', () => {
    const code = 'export class MyClass {}';
    expect(code.match(regexDefinitions.matchesTypeExport)).toBeNull();
  });

});


describe('Export named function as default regex', () => {
  it('should match a valid export default statement', () => {
    const validStatement = "export { TestComp as default } from './TestComp';";
    expect(regexDefinitions.matchesExportNamedAsDefault.test(validStatement)).toBeTruthy();
  });

  it('should not match when "as default" is missing', () => {
    const invalidStatement = "export { TestComp } from './TestComp';";
    expect(regexDefinitions.matchesExportNamedAsDefault.test(invalidStatement)).toBeFalsy();
  });
  
  it('should not match incorrect formatting', () => {
    const invalidStatement = "export TestComp as default from './TestComp';";
    expect(regexDefinitions.matchesExportNamedAsDefault.test(invalidStatement)).toBeFalsy();
  });
  
  it('should not match a different path format', () => {
    const invalidStatement = "export { TestComp as default } from './folder/TestComp';";
    expect(regexDefinitions.matchesExportNamedAsDefault.test(invalidStatement)).toBeFalsy();
  });
  it('should capture the component name and the path', () => {
    const statement = "export { TestComp as default } from './TestComp';";
    const match = regexDefinitions.matchesExportNamedAsDefault.exec(statement);
  
    expect(match).not.toBeNull();
    if(!match) return;
    expect(match[1]).toBe('TestComp'); // Component name
    expect(match[2]).toBe('./TestComp'); // Path
  });
  
});