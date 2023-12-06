import { regexDefinitions } from "../src/constraints/regex-definitions";


describe('constraintFeatures', () => {

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
  
  
  
 

 

});



describe('regexDefinitions.containsSpecialChar', () => {
  it('matches strings with special characters', () => {
    let testAtSymbol = regexDefinitions.containsSpecialChar.test('2021@year');
    expect(regexDefinitions.containsSpecialChar.test('hello!')).toBe(true);
    expect(regexDefinitions.containsSpecialChar.test('goodbye#')).toBe(true);
    expect(testAtSymbol).toBe(true);
    
    expect(regexDefinitions.containsSpecialChar.test('%special%')).toBe(true);
  });

  it('does not match strings with only alphanumeric characters', () => {
    expect(regexDefinitions.containsSpecialChar.test('hello')).toBe(false);
    expect(regexDefinitions.containsSpecialChar.test('goodbye')).toBe(false);
    expect(regexDefinitions.containsSpecialChar.test('2021')).toBe(false);
    expect(regexDefinitions.containsSpecialChar.test('ABC123')).toBe(false);
  });

  it('matches strings with mixed alphanumeric and special characters', () => {
    expect(regexDefinitions.containsSpecialChar.test('h3ll0_World')).toBe(true);
    expect(regexDefinitions.containsSpecialChar.test('passw0rd$')).toBe(true);
   
  });

  it('matches strings with whitespace characters', () => {
    let result= regexDefinitions.containsSpecialChar.test('hello world')
    expect(result).toBe(true);

  });

  // Add more test cases if needed...
});



describe('regexDefinitions.containsDash', () => {
  it('matches strings with dash characters', () => {
    expect(regexDefinitions.containsDash.test('hello-world')).toBe(true);
    expect(regexDefinitions.containsDash.test('2021-year')).toBe(true);
    expect(regexDefinitions.containsDash.test('multi-word-string')).toBe(true);
  });

  it('does not match strings without dash characters', () => {
    expect(regexDefinitions.containsDash.test('helloworld')).toBe(false);
    expect(regexDefinitions.containsDash.test('2021')).toBe(false);
    expect(regexDefinitions.containsDash.test('multiwordstring')).toBe(false);
  });

  it('matches strings with multiple dash characters', () => {
    expect(regexDefinitions.containsDash.test('hello--world')).toBe(true);
    expect(regexDefinitions.containsDash.test('--')).toBe(true);
  });

  // Add more test cases if needed...
});

});

describe('collectPathsFeature', () => {
describe('regexDefinitions.containsDuplicateDriveLetters', () => {
  it('matches strings with duplicate drive letters', () => {
    expect(regexDefinitions.containsDuplicateDriveLetters.test('C:\\C:')).toBe(true);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('A:\\A:')).toBe(true);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('Z:\\Z:')).toBe(true);
  });

  it('does not match strings without duplicate drive letters', () => {
    expect(regexDefinitions.containsDuplicateDriveLetters.test('C:\\D:')).toBe(false);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('E:\\F:')).toBe(false);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('G:\\H:')).toBe(false);
  });

  it('does not match strings that are not in drive letter format', () => {
    expect(regexDefinitions.containsDuplicateDriveLetters.test('C:\\some\\path')).toBe(false);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('D:\\another\\path')).toBe(false);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('just-a-string')).toBe(false);
  });

  it('matches case-insensitively', () => {
    expect(regexDefinitions.containsDuplicateDriveLetters.test('c:\\c:')).toBe(true);
    expect(regexDefinitions.containsDuplicateDriveLetters.test('a:\\a:')).toBe(true);
  });

  // Add more test cases if needed...
});

});
describe('constraintFeatures', () => {

describe('regexDefinitions.isSnakeCase', () => {
  it('matches snake_case strings', () => {
    expect(regexDefinitions.isSnakeCase.test('snake_case')).toBe(true);
    expect(regexDefinitions.isSnakeCase.test('snake_case_string')).toBe(true);
    expect(regexDefinitions.isSnakeCase.test('snake1_case2_string3')).toBe(true);
  });

  it('does not match strings with uppercase characters', () => {
    expect(regexDefinitions.isSnakeCase.test('Snake_case')).toBe(false);
    expect(regexDefinitions.isSnakeCase.test('SNAKE_CASE')).toBe(false);
    expect(regexDefinitions.isSnakeCase.test('snake_Case')).toBe(false);
  });

  it('does not match strings with spaces or other characters', () => {
    expect(regexDefinitions.isSnakeCase.test('snake case')).toBe(false);
    expect(regexDefinitions.isSnakeCase.test('snake-case')).toBe(false);
    expect(regexDefinitions.isSnakeCase.test('snake_case!')).toBe(false);
  });

 

  it('matches single lowercase word without underscores', () => {
    expect(regexDefinitions.isSnakeCase.test('snake')).toBe(true);
  });
});
  // Add more test cases if needed...
});















