/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)",
    "<rootDir>/example/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: './tsconfig.jest.json'
    }]
  },
  // Handling ESM modules in node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(inquirer)/)',
    'examples/(?!()/)',
    'example/packages/(?!()/)',
    '!src/for-tests/node_modules/',
  ],
  // Mocks for certain packages can be provided, especially if they are causing issues in the testing environment.
  moduleNameMapper: {
    // Use this section to specify mocks for certain node_modules, if necessary.
  },
  silent: false,
  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/*.test.ts"
  ],
  coverageThreshold: {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  }
}