
import { regexDefinitions } from "../src/constraints/regex-definitions";


describe.only('detectExports', () => {
    test('should test something in the group', () => {
      // Test code here
    });
    
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
        expect(regexDefinitions.matchesVarExport.test('export var myVar = `myValue`')).toBe(true);
          // Failing
    
        expect(regexDefinitions.matchesVarExport.test('var myVar')).toBe(false);
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