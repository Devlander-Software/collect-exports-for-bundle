/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      // Your ts-jest configuration goes here
      // Example:
      tsconfig: 'path/to/your/tsconfig.json'
    }]
  },
  // Handling ESM modules in node_modules
  transformIgnorePatterns: [
    // Update this regular expression to include any specific node modules that need to be transformed.
    'node_modules/(?!(inquirer)/)',
    'examples/(?!()/)',
  ],
  testMatch: [
    "<rootDir>/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)",
    "<rootDir>/example/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"
  ],


  // Mocks for certain packages can be provided, especially if they are causing issues in the testing environment.
  moduleNameMapper: {
    // Use this section to specify mocks for certain node_modules, if necessary.
  },

  // ... rest of your jest config.
}