import { regexDefinitions } from "../src/utils/regex-definitions";

describe('regexDefinitions', () => {
  test('isCamelCase', () => {
    expect(regexDefinitions.isCamelCase.test('camelCaseString')).toBe(true);
    expect(regexDefinitions.isCamelCase.test('CamelCaseString')).toBe(false);
    expect(regexDefinitions.isCamelCase.test('camel_case_string')).toBe(false);
  });

  test('containsUnderscore', () => {
    expect(regexDefinitions.containsUnderscore.test('contains_underscore')).toBe(true);
    expect(regexDefinitions.containsUnderscore.test('noUnderscore')).toBe(false);
  });

  // ... continue with other regex patterns ...

  test('isPascalCase', () => {
    expect(regexDefinitions.isPascalCase.test('PascalCaseString')).toBe(true);
    expect(regexDefinitions.isPascalCase.test('pascalCaseString')).toBe(false);
    expect(regexDefinitions.isPascalCase.test('pascal_case_string')).toBe(false);
  });

  test('isConstantCase', () => {
    expect(regexDefinitions.isConstantCase.test('CONSTANT_CASE')).toBe(true);
    expect(regexDefinitions.isConstantCase.test('ConstantCase')).toBe(false);
    expect(regexDefinitions.isConstantCase.test('constant_case')).toBe(false);
  });

  test('containsNonWordChar', () => {
    expect(regexDefinitions.containsNonWordChar.test('contains@special')).toBe(true);
    expect(regexDefinitions.containsNonWordChar.test('NoSpecialChar')).toBe(false);
  });

  test('isDashCase', () => {
    expect(regexDefinitions.isDashCase.test('dash-case-string')).toBe(true);
    expect(regexDefinitions.isDashCase.test('dashCaseString')).toBe(false);
    expect(regexDefinitions.isDashCase.test('DashCaseString')).toBe(false);
  });
  
  test('containsSpecialChar', () => {
    expect(regexDefinitions.containsSpecialChar.test('special$char')).toBe(true);
    expect(regexDefinitions.containsSpecialChar.test('SpecialChar')).toBe(false);
  });
  
  test('isSnakeCase', () => {
    expect(regexDefinitions.isSnakeCase.test('snake_case_string')).toBe(true);
    expect(regexDefinitions.isSnakeCase.test('snakeCaseString')).toBe(false);
    expect(regexDefinitions.isSnakeCase.test('SnakeCaseString')).toBe(false);
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
  
  test('matchesLetExport', () => {
    expect(regexDefinitions.matchesLetExport.test('export let myLet')).toBe(true);
    expect(regexDefinitions.matchesLetExport.test('let myLet')).toBe(false);
  });
  
  test('matchesVarExport', () => {
    expect(regexDefinitions.matchesVarExport.test('export var myVar')).toBe(true);
    expect(regexDefinitions.matchesVarExport.test('var myVar')).toBe(false);
  });
  
  test('matchesEnumExport', () => {
    expect(regexDefinitions.matchesEnumExport.test('export enum MyEnum {}')).toBe(true);
    expect(regexDefinitions.matchesEnumExport.test('enum MyEnum {}')).toBe(false);
  });
  
  test('matchesClassExport', () => {
    expect(regexDefinitions.matchesClassExport.test('export class MyClass {}')).toBe(true);
    expect(regexDefinitions.matchesClassExport.test('class MyClass {}')).toBe(false);
  });

  // ... and so on for each regex pattern ...
});
