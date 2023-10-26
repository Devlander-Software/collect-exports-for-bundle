/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Handling ESM modules in node_modules
  transformIgnorePatterns: [
    // Update this regular expression to include any specific node modules that need to be transformed.
    'node_modules/(?!(inquirer)/)',
  ],

  // If you have issues with the TypeScript compilation through ts-jest, you can use the diagnostics option to investigate.
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001] // Ignore the message "Cannot compile modules into 'commonjs', 'amd', 'system', 'umd', 'es2015', 'esnext' or 'es2020' when targeting 'ESNext', found 'ESNext'."
      }
    }
  },

  // Mocks for certain packages can be provided, especially if they are causing issues in the testing environment.
  moduleNameMapper: {
    // Use this section to specify mocks for certain node_modules, if necessary.
  },

  // ... rest of your jest config.
};
