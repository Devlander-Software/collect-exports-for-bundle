import { functionRegexDefinitions } from "../src/constraints/regex-definitions";

describe('Function Regex Definitions Tests', () => {

    test('Function Declaration Named Export', () => {
      const string = 'export function myFunction(a: number, b: number): number { return a + b; }';
      expect(functionRegexDefinitions.functionDeclarationNamedExport.test(string)).toBeTruthy();
    });
  
    test('Function Declaration Default Export', () => {
      const string = 'export default function myFunction(a: number, b: number): number { return a + b; }';
      expect(functionRegexDefinitions.functionDeclarationDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Function Expression Named Export', () => {
      const string = 'const myFunction: (a: number, b: number) => number = function(a, b) { return a + b; }; export default myFunction;';
      expect(functionRegexDefinitions.functionExpressionNamedExport.test(string)).toBeTruthy();
    });
  
    test('Function Expression Default Export', () => {
      const string = 'export default const myFunction: (a: number, b: number) => number = function(a, b) { return a + b; };';
      expect(functionRegexDefinitions.functionExpressionDefaultExport.test(string)).toBeTruthy();
    });
  
  
    test('Arrow Function Named Export', () => {
      const string = 'const myFunction: (a: number, b: number) => number = (a, b) => a + b; export default myFunction;';
      expect(functionRegexDefinitions.arrowFunctionNamedExport.test(string)).toBeTruthy();
    });
  
    test('Arrow Function Default Export', () => {
      const string = 'export default (a: number, b: number): number => a + b;';
      expect(functionRegexDefinitions.arrowFunctionDefaultExport.test(string)).toBeTruthy();
    });
  
  
  test('IIFE Default Export', () => {
    const string = 'export default (function(): string { return "This runs right away!"; })();';
    expect(functionRegexDefinitions.iifeDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Generator Function Named Export', () => {
    const string = 'export function* myGenerator(): Generator<number> { yield 1; yield 2; }';
    expect(functionRegexDefinitions.generatorFunctionNamedExport.test(string)).toBeTruthy();
  });
  
  test('Generator Function Default Export', () => {
    const string = 'export default function* myGenerator(): Generator<number> { yield 1; yield 2; }';
    expect(functionRegexDefinitions.generatorFunctionDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Async Function Named Export', () => {
    const string = 'export async function fetchData(): Promise<DataType> { let data = await someAsyncOperation(); return data; }';
    expect(functionRegexDefinitions.asyncFunctionNamedExport.test(string)).toBeTruthy();
  });
  
  test('Async Function Default Export', () => {
    const string = 'export default async function fetchData(): Promise<DataType> { let data = await someAsyncOperation(); return data; }';
    expect(functionRegexDefinitions.asyncFunctionDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Constructor Function Named Export', () => {
    const string = 'class Person { constructor(name: string) { this.name = name; } } export default Person;';
    expect(functionRegexDefinitions.constructorFunctionNamedExport.test(string)).toBeTruthy();
  });
  
  test('Constructor Function Default Export', () => {
    const string = 'export default class Person { constructor(name: string) { this.name = name; } }';
    expect(functionRegexDefinitions.constructorFunctionDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Method in Object Literal Named Export', () => {
    const string = 'const myObject = { myMethod(a: number, b: number): number { return a + b; } }; export default myObject;';
    expect(functionRegexDefinitions.methodInObjectLiteralNamedExport.test(string)).toBeTruthy();
  });
  
  test('Method in Object Literal Default Export', () => {
    const string = 'export default { myMethod(a: number, b: number): number { return a + b; } };';
    expect(functionRegexDefinitions.methodInObjectLiteralDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Static Method in Class Named Export', () => {
    const string = 'class MyClass { static myStaticMethod(): string { return "static method"; } } export default MyClass;';
    expect(functionRegexDefinitions.staticMethodInClassNamedExport.test(string)).toBeTruthy();
  });
  
  test('Static Method in Class Default Export', () => {
    const string = 'export default class MyClass { static myStaticMethod(): string { return "static method"; } }';
    expect(functionRegexDefinitions.staticMethodInClassDefaultExport.test(string)).toBeTruthy();
  });
  
  test('Class Method Named Export', () => {
    const string = 'class MyClass { myMethod(): string { return "instance method"; } } export default MyClass;';
    expect(functionRegexDefinitions.classMethodNamedExport.test(string)).toBeTruthy();
  });
  
  
  });