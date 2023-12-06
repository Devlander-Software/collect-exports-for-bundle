import { typescriptTypeRegexDefinitions } from "../src/constraints/regex-definitions";

describe('TypeScript Type Regex Definitions Tests', () => {

  // Tests for Named Exports
  test('Basic Types Named Export', () => {
    const string = 'export let age: number;';
    expect(typescriptTypeRegexDefinitions.basicTypesNamedExport.test(string)).toBeTruthy();
  });

  test('Array Type Named Export', () => {
    const string = 'export let numbers: number[];';
    expect(typescriptTypeRegexDefinitions.arrayTypeNamedExport.test(string)).toBeTruthy();
  });


  // Tests for Default Exports
  test('Basic Types Default Export', () => {
    const string = 'export default const name: string;';
    expect(typescriptTypeRegexDefinitions.basicTypesDefaultExport.test(string)).toBeTruthy();
  });




    // Tests for Named Exports
    test('Basic Types Named Export', () => {
      const string = 'export let age: number;';
      expect(typescriptTypeRegexDefinitions.basicTypesNamedExport.test(string)).toBeTruthy();
    });
  
    test('Array Type Named Export', () => {
      const string = 'export let numbers: number[];';
      expect(typescriptTypeRegexDefinitions.arrayTypeNamedExport.test(string)).toBeTruthy();
    });
  
    test('Tuple Type Named Export', () => {
      const string = 'export let person: [string, number];';
      expect(typescriptTypeRegexDefinitions.tupleTypeNamedExport.test(string)).toBeTruthy();
    });
  
    test('Enum Type Named Export', () => {
      const string = 'export enum Color { Red, Green, Blue }';
      expect(typescriptTypeRegexDefinitions.enumTypeNamedExport.test(string)).toBeTruthy();
    });
  
    test('Any Type Named Export', () => {
      const string = 'export let anything: any;';
      expect(typescriptTypeRegexDefinitions.anyTypeNamedExport.test(string)).toBeTruthy();
    });
  
  
    // Tests for Default Exports
   
   
  
  
  
  
  
  // More Tests for Named Exports
  test('Void Type Named Export', () => {
    const string = 'export function logMessage(): void {}';
    expect(typescriptTypeRegexDefinitions.voidTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Never Type Named Export', () => {
    const string = 'export function throwError(): never { throw new Error(); }';
    expect(typescriptTypeRegexDefinitions.neverTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Unknown Type Named Export', () => {
    const string = 'export let uncertain: unknown;';
    expect(typescriptTypeRegexDefinitions.unknownTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Object Type Named Export', () => {
    const string = 'export let obj: object;';
    expect(typescriptTypeRegexDefinitions.objectTypeNamedExport.test(string)).toBeTruthy();
  });
  
 
  
  test('Intersection Type Named Export', () => {
    const string = 'export let combined: Draggable & Resizable;';
    expect(typescriptTypeRegexDefinitions.intersectionTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Literal Type Named Export', () => {
    const string = 'export let exact: "yes" | "no";';
    expect(typescriptTypeRegexDefinitions.literalTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Type Alias Named Export', () => {
    const string = 'export type StringOrNumber = string | number;';
    expect(typescriptTypeRegexDefinitions.typeAliasNamedExport.test(string)).toBeTruthy();
  });
  
  test('Function Type Named Export', () => {
    const string = 'export type GreetFunction = (name: string) => string;';
    expect(typescriptTypeRegexDefinitions.functionTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Generic Type Named Export', () => {
    const string = 'export type ArrayType<T> = Array<T>;';
    expect(typescriptTypeRegexDefinitions.genericTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Index Signature Named Export', () => {
    const string = 'export interface StringArray { [index: number]: string; }';
    expect(typescriptTypeRegexDefinitions.indexSignatureNamedExport.test(string)).toBeTruthy();
  });
  
  test('Mapped Type Named Export', () => {
    const string = 'export type Readonly<T> = { readonly [P in keyof T]: T[P]; };';
    expect(typescriptTypeRegexDefinitions.mappedTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Conditional Type Named Export', () => {
    const string = 'export type Check<T> = T extends string ? "String" : "Not a string";';
    expect(typescriptTypeRegexDefinitions.conditionalTypeNamedExport.test(string)).toBeTruthy();
  });
  
  test('Utility Type Named Export', () => {
    const string = 'export type PartialPoint = Partial<Point>;';
    expect(typescriptTypeRegexDefinitions.utilityTypeNamedExport.test(string)).toBeTruthy();
  });
  
  // More Tests for Default Exports
  test('Void Type Default Export', () => {
    const string = 'export default function logMessage(): void {}';
    expect(typescriptTypeRegexDefinitions.voidTypeDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Never Type Default Export', () => {
    const string = 'export default function throwError(): never { throw new Error(); }';
    expect(typescriptTypeRegexDefinitions.neverTypeDefaultExport.test(string)).toBeTruthy();
  });
  
  
 
  
 
  
  
  
  
  

  
  test('Index Signature Default Export', () => {
    const string = 'export default interface StringArray { [index: number]: string; }';
    expect(typescriptTypeRegexDefinitions.indexSignatureDefaultExport.test(string)).toBeTruthy();
  });
  
  
  

 
  });
  