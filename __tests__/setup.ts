// Test setup file for Jest
import { jest, beforeAll, afterAll } from '@jest/globals'

// Global test configuration
beforeAll(() => {
  // Set up any global test configuration
  console.log('Setting up test environment...')
})

afterAll(() => {
  // Clean up any global test configuration
  console.log('Cleaning up test environment...')
})

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Global test utilities
global.testUtils = {
  createTestFile: (path: string, content: string) => {
    const fs = require('fs')
    const dir = require('path').dirname(path)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(path, content)
  },
  
  removeTestFile: (path: string) => {
    const fs = require('fs')
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
  },
  
  createTestDirectory: (path: string) => {
    const fs = require('fs')
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }
  },
  
  removeTestDirectory: (path: string) => {
    const fs = require('fs')
    if (fs.existsSync(path)) {
      fs.rmSync(path, { recursive: true, force: true })
    }
  }
}

// Extend global types
declare global {
  var testUtils: {
    createTestFile: (path: string, content: string) => void
    removeTestFile: (path: string) => void
    createTestDirectory: (path: string) => void
    removeTestDirectory: (path: string) => void
  }
}
