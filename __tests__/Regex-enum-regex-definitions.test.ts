import { enumRegexDefinitions } from "../src/constraints/regex-definitions";

describe('enumRegexDefinitions', () => {
    describe('namedNumericEnum', () => {
      it('matches a named numeric enum', () => {
        const enumString = 'export enum Direction { Up, Down, Left, Right }';
        expect(enumRegexDefinitions.namedNumericEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a non-enum string', () => {
        const nonEnumString = 'export class Direction { Up, Down, Left, Right }';
        expect(enumRegexDefinitions.namedNumericEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
  
    // ...
  
    // namedInitializedNumericEnum
    describe('namedInitializedNumericEnum', () => {
      it('matches a named initialized numeric enum', () => {
        const enumString = 'export enum StatusCode { Success = 200, NotFound = 404 }';
        expect(enumRegexDefinitions.namedInitializedNumericEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a non-initialized enum', () => {
        const nonEnumString = 'export enum StatusCode { Success, NotFound }';
        expect(enumRegexDefinitions.namedInitializedNumericEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
   
  
    // namedFullyInitializedNumericEnum
    describe('namedFullyInitializedNumericEnum', () => {
      it('matches a named fully initialized numeric enum', () => {
        const enumString = 'export enum StatusCode { Success = 200, Error = 500, NotFound = 404 }';
        expect(enumRegexDefinitions.namedFullyInitializedNumericEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match partially initialized enum', () => {
        const nonEnumString = 'export enum StatusCode { Success = 200, Error, NotFound }';
        expect(enumRegexDefinitions.namedFullyInitializedNumericEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
   
  
    // ...
  
    // namedStringEnum
    describe('namedStringEnum', () => {
      it('matches a named string enum', () => {
        const enumString = 'export enum Colors { Red = "RED", Blue = "BLUE" }';
        expect(enumRegexDefinitions.namedStringEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a numeric enum', () => {
        const nonEnumString = 'export enum Colors { Red, Blue }';
        expect(enumRegexDefinitions.namedStringEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
  
  
    // namedHeterogeneousEnum
    describe('namedHeterogeneousEnum', () => {
      it('matches a named heterogeneous enum', () => {
        const enumString = 'export enum Mixed { Num = 1, Str = "String" }';
        expect(enumRegexDefinitions.namedHeterogeneousEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a single-type enum', () => {
        const nonEnumString = 'export enum Mixed { Num = 1, AnotherNum = 2 }';
        expect(enumRegexDefinitions.namedHeterogeneousEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
  
    // namedConstEnum
    describe('namedConstEnum', () => {
      it('matches a named const enum', () => {
        const enumString = 'export const enum Directions { North, East, South, West }';
        expect(enumRegexDefinitions.namedConstEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a non-const enum', () => {
        const nonEnumString = 'export enum Directions { North, East, South, West }';
        expect(enumRegexDefinitions.namedConstEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
   
  
    // namedRuntimeEnum
    describe('namedRuntimeEnum', () => {
      it('matches a named runtime enum', () => {
        const enumString = 'export enum Runtime { Start, Stop }';
        expect(enumRegexDefinitions.namedRuntimeEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a non-runtime enum', () => {
        const nonEnumString = 'const Runtime = { Start: 0, Stop: 1 }';
        expect(enumRegexDefinitions.namedRuntimeEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
   
  
    // namedCompileTimeEnum
    describe('namedCompileTimeEnum', () => {
      it('matches a named compile-time enum', () => {
        const enumString = 'export enum CompileTime { ValueA, ValueB }';
        expect(enumRegexDefinitions.namedCompileTimeEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a non-compile-time enum', () => {
        const nonEnumString = 'const CompileTime = { ValueA: 0, ValueB: 1 }';
        expect(enumRegexDefinitions.namedCompileTimeEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
   
  
    // namedReverseMappingEnum
    describe('namedReverseMappingEnum', () => {
      it('matches a named reverse mapping enum', () => {
        const enumString = 'export enum ReverseMapping { A, B }';
        expect(enumRegexDefinitions.namedReverseMappingEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a non-reverse mapping enum', () => {
        const nonEnumString = 'const ReverseMapping = { A: 0, B: 1 }';
        expect(enumRegexDefinitions.namedReverseMappingEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
   
  
    // namedOpenEndedEnum
    describe('namedOpenEndedEnum', () => {
      it('matches a named open-ended enum', () => {
        const enumString = 'export enum OpenEnded { FirstPart } enum OpenEnded { SecondPart }';
        expect(enumRegexDefinitions.namedOpenEndedEnum.test(enumString)).toBeTruthy();
      });
  
      it('does not match a closed enum', () => {
        const nonEnumString = 'export enum Closed { FirstPart, SecondPart }';
        expect(enumRegexDefinitions.namedOpenEndedEnum.test(nonEnumString)).toBeFalsy();
      });
    });
  
  
  
    // and so on for the remaining keys...
  
  
  
    // More tests for each key in enumRegexDefinitions...
  });