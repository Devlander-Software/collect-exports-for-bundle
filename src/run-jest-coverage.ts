import { Config } from '@jest/types'
import fs from 'fs'
import * as jest from 'jest'
import path from 'path'

// Define the Jest configuration options (if not already configured in jest.config.js)
const jestConfig: Config.InitialOptions = {
  collectCoverage: true,
  coverageReporters: ['json'],
  coverageDirectory: path.resolve(__dirname, '..', 'coverage'),
  collectCoverageFrom: ['dist/**/*.{js}'],
  // Handling ESM modules in node_modules
  transformIgnorePatterns: [
    // Update this regular expression to include any specific node modules that need to be transformed.
    'node_modules/(?!(inquirer)/)'
  ]

  // Add other Jest options as needed
}

// Initialize and run Jest with the specified configuration
async function runJest(): Promise<any> {
  const { results } = await jest.runCLI(jestConfig as any, [
    path.resolve(__dirname)
  ])
  return results
}

// Main function to run tests and generate coverage reports
async function main(): Promise<void> {
  try {
    const results = await runJest()
    console.log('Tests completed successfully.')

    // Process the JSON coverage object
    const coverageObject = results.coverageMap?.data || {}

    // Write the coverage object to a JSON file in the project's root
    const coverageJsonPath = path.resolve(__dirname, '..', 'coverage.json')
    fs.writeFileSync(coverageJsonPath, JSON.stringify(coverageObject, null, 2))

    console.log(`Coverage data has been saved to ${coverageJsonPath}`)
  } catch (error) {
    console.error('Error during tests:', error)
    process.exit(1)
  }
}

// Call the main function to run your tests and generate coverage reports
main()
