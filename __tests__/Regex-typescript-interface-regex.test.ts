import { typescriptInterfaceRegexDefinitions } from "../src/constraints/regex-definitions";

describe('TypeScript Interface Export Regex Tests', () => {

    test('Basic Named Interface Export', () => {
      const string = 'export interface User { id: number; name: string; }';
      expect(typescriptInterfaceRegexDefinitions.basicNamedInterfaceExport.test(string)).toBeTruthy();
    });
  
    test('Basic Default Interface Export', () => {
      const string = 'export default interface User { id: number; name: string; }';
      expect(typescriptInterfaceRegexDefinitions.basicDefaultInterfaceExport.test(string)).toBeTruthy();
    });
  
    // Repeat for each definition in your object
    // Example:
  
    test('Interface with Optional Properties Named Export', () => {
      const string = 'export interface User { id: number; name?: string; }';
      expect(typescriptInterfaceRegexDefinitions.interfaceWithOptionalPropertiesNamedExport.test(string)).toBeTruthy();
    });
  
    test('Interface with Optional Properties Default Export', () => {
      const string = 'export default interface User { id: number; name?: string; }';
      expect(typescriptInterfaceRegexDefinitions.interfaceWithOptionalPropertiesDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Interface with Readonly Properties Named Export', () => {
      const string = 'export interface User { readonly id: number; name: string; }';
      expect(typescriptInterfaceRegexDefinitions.interfaceWithReadonlyPropertiesNamedExport.test(string)).toBeTruthy();
    });
  
  
    test('Interface with Readonly Properties Default Export', () => {
      const string = 'export default interface User { readonly id: number; name: string; }';
      expect(typescriptInterfaceRegexDefinitions.interfaceWithReadonlyPropertiesDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Function Type Interface Named Export', () => {
      const string = 'export interface SearchFunc { (source: string, subString: string): boolean; }';
      expect(typescriptInterfaceRegexDefinitions.functionTypeInterfaceNamedExport.test(string)).toBeTruthy();
    });
  
    test('Function Type Interface Default Export', () => {
      const string = 'export default interface SearchFunc { (source: string, subString: string): boolean; }';
      expect(typescriptInterfaceRegexDefinitions.functionTypeInterfaceDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Indexable Types Named Export', () => {
      const string = 'export interface StringArray { [index: number]: string; }';
      expect(typescriptInterfaceRegexDefinitions.indexableTypesNamedExport.test(string)).toBeTruthy();
    });
  
    test('Indexable Types Default Export', () => {
      const string = 'export default interface StringArray { [index: number]: string; }';
      expect(typescriptInterfaceRegexDefinitions.indexableTypesDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Class Type Interface Named Export', () => {
      const string = 'export interface ClockInterface { currentTime: Date; setTime(d: Date): void; }';
      expect(typescriptInterfaceRegexDefinitions.classTypeInterfaceNamedExport.test(string)).toBeTruthy();
    });
  
    test('Class Type Interface Default Export', () => {
      const string = 'export default interface ClockInterface { currentTime: Date; setTime(d: Date): void; }';
      expect(typescriptInterfaceRegexDefinitions.classTypeInterfaceDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Extending Interfaces Named Export', () => {
      const string = 'export interface Square extends Shape { sideLength: number; }';
      expect(typescriptInterfaceRegexDefinitions.extendingInterfacesNamedExport.test(string)).toBeTruthy();
    });
  
    test('Extending Interfaces Default Export', () => {
      const string = 'export default interface Square extends Shape { sideLength: number; }';
      expect(typescriptInterfaceRegexDefinitions.extendingInterfacesDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Hybrid Types Named Export', () => {
      const string = 'export interface Counter { (start: number): string; interval: number; reset(): void; }';
      expect(typescriptInterfaceRegexDefinitions.hybridTypesNamedExport.test(string)).toBeTruthy();
    });
  
    test('Hybrid Types Default Export', () => {
      const string = 'export default interface Counter { (start: number): string; interval: number; reset(): void; }';
      expect(typescriptInterfaceRegexDefinitions.hybridTypesDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Generic Interface Named Export', () => {
      const string = 'export interface GenericInterface<T> { value: T; getValue(): T; }';
      expect(typescriptInterfaceRegexDefinitions.genericInterfaceNamedExport.test(string)).toBeTruthy();
    });
  
    test('Generic Interface Default Export', () => {
      const string = 'export default interface GenericInterface<T> { value: T; getValue(): T; }';
      expect(typescriptInterfaceRegexDefinitions.genericInterfaceDefaultExport.test(string)).toBeTruthy();
    });
  
    test('Interface for Dictionary Pattern Named Export', () => {
      const string = 'export interface Map<T> { [key: string]: T; }';
      expect(typescriptInterfaceRegexDefinitions.interfaceForDictionaryPatternNamedExport.test(string)).toBeTruthy();
    });
  
  
  });
  