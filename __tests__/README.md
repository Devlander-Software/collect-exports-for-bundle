# @devlander/collect-exports-for-bundle - Test Suite

This directory contains comprehensive tests for the `@devlander/collect-exports-for-bundle` package, ensuring high quality, reliability, and compatibility across different environments.

## Test Categories

### 1. Configuration Validation Tests (`configuration-validation.test.ts`)
Tests for validating configuration options and handling various input scenarios.

**Coverage:**
- Required fields validation
- Optional fields handling with defaults
- File extensions validation
- Export mode validation
- Bundle configuration validation
- Specific files validation
- Debug and test options
- Title and description handling

**Requirements:**
- 95% line coverage
- 95% function coverage
- 90% branch coverage

### 2. Path Resolution Tests (`path-resolution.test.ts`)
Tests for path resolution functionality and cross-platform compatibility.

**Coverage:**
- Relative path resolution
- Absolute path resolution
- Extension handling for Rollup compatibility
- Nested directory resolution
- File name extraction
- Cross-platform path handling
- Edge cases and error handling
- Module resolution strategy

**Requirements:**
- 100% path resolution coverage
- Cross-platform compatibility
- Rollup integration support

### 3. Export Generation Tests (`export-generation.test.ts`)
Tests for export statement generation and various export modes.

**Coverage:**
- Wildcard exports
- Named exports
- Default exports
- Export sorting (alphabetical)
- Explicit exports
- Export statement generation
- Export matches creation
- Directory export generation
- Mixed export modes
- Bundle export as function
- File extension handling
- Error handling

**Requirements:**
- 100% export generation coverage
- All export modes supported
- Tree shaking compatibility

### 4. Rollup Compatibility Tests (`rollup-compatibility.test.ts`)
Tests ensuring full compatibility with Rollup bundler.

**Coverage:**
- Rollup-compatible path generation
- Module resolution strategy
- Plugin integration (@rollup/plugin-node-resolve, @rollup/plugin-typescript, etc.)
- ESM vs CommonJS compatibility
- Path normalization
- Extension handling
- Bundle output compatibility
- Tree shaking compatibility
- Source map compatibility
- Performance considerations

**Requirements:**
- 100% Rollup integration coverage
- Full plugin compatibility
- Performance optimization

### 5. Backwards Compatibility Tests (`backwards-compatibility.test.ts`)
Tests for maintaining compatibility with previous versions.

**Coverage:**
- Auto-migration of old configurations
- Legacy behavior preservation
- Missing new options handling
- Legacy file format support
- Legacy export mode support
- Legacy path handling
- Legacy bundle configuration
- Legacy target version support
- Legacy debug and test options
- Legacy output configuration
- Legacy include/exclude patterns
- Legacy title and description
- Legacy error handling
- Legacy configuration validation
- Legacy file system compatibility

**Requirements:**
- 100% backwards compatibility
- Graceful degradation
- Migration warnings

### 6. Integration Tests (`integration.test.ts`)
Tests for real-world project integration scenarios.

**Coverage:**
- Typical React project structure
- TypeScript project integration
- Mixed JS/TS project support
- Complex directory structures
- Bundler integration (Rollup, Webpack, Vite)
- Path collection integration

**Requirements:**
- 90% real project scenario coverage
- 100% bundler integration coverage

### 7. Performance Tests (`performance.test.ts`)
Tests for performance and scalability.

**Coverage:**
- Large project performance (1000+ files)
- Deep directory nesting efficiency
- Large export lists handling
- Memory usage optimization
- Concurrent processing
- Scalability testing

**Requirements:**
- Performance benchmarks
- Memory usage monitoring
- Scalability validation

### 8. Error Handling Tests (`error-handling.test.ts`)
Tests for robust error handling and graceful degradation.

**Coverage:**
- File system errors
- Configuration errors
- Data type errors
- Memory and resource errors
- Network and external dependencies
- Recovery and graceful degradation

**Requirements:**
- 100% error handling coverage
- Graceful degradation
- Meaningful error messages

### 9. Cross-Platform Tests (`cross-platform.test.ts`)
Tests for cross-platform compatibility.

**Coverage:**
- Windows path handling
- Unix path handling
- macOS-specific features
- File system operations
- Character encoding
- File system limits
- Auto exporter cross-platform

**Requirements:**
- Full cross-platform support
- Platform-specific optimizations

### 10. Migration Tests (`migration.test.ts`)
Tests for configuration migration and version compatibility.

**Coverage:**
- Configuration migration
- Legacy configuration support
- Backward compatibility
- Migration validation
- Feature migration
- Configuration transformation
- Migration notifications
- Version compatibility

**Requirements:**
- 100% migration coverage
- Version compatibility
- Migration guidance

## Test Coverage Requirements

### Minimum Coverage Thresholds
- **Lines**: 95%
- **Functions**: 95%
- **Branches**: 90%
- **Statements**: 95%

### Critical Path Coverage
- **Path Resolution**: 100%
- **Export Generation**: 100%
- **Configuration Validation**: 100%
- **Error Handling**: 100%

### Integration Test Coverage
- **Rollup Integration**: 100%
- **TypeScript Integration**: 100%
- **Real Project Scenarios**: 90%

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Categories
```bash
# Configuration validation tests
npm test -- --testNamePattern="Configuration Validation"

# Path resolution tests
npm test -- --testNamePattern="Path Resolution"

# Export generation tests
npm test -- --testNamePattern="Export Generation"

# Rollup compatibility tests
npm test -- --testNamePattern="Rollup Compatibility"

# Performance tests
npm test -- --testNamePattern="Performance"

# Error handling tests
npm test -- --testNamePattern="Error Handling"
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Verbose Output
```bash
npm test -- --verbose
```

## Test Environment Setup

### Required Dependencies
- Node.js >= 16.0.0
- TypeScript >= 4.5.0
- Jest >= 29.0.0
- ts-jest >= 29.1.1

### Test Configuration
- **Jest Config**: `jest.config.js`
- **TypeScript Config**: `tsconfig.json`
- **Test Setup**: `__tests__/setup.ts`

### Test Utilities
The test suite includes global utilities for common operations:
- `testUtils.createTestFile(path, content)`
- `testUtils.removeTestFile(path)`
- `testUtils.createTestDirectory(path)`
- `testUtils.removeTestDirectory(path)`

## Continuous Integration

### GitHub Actions
The test suite is configured to run on:
- **Node.js Versions**: 16.x, 18.x, 20.x
- **Operating Systems**: Ubuntu, macOS, Windows
- **Triggers**: Push, Pull Request

### Coverage Reporting
- **Text Report**: Console output
- **HTML Report**: `coverage/lcov-report/index.html`
- **LCOV Report**: `coverage/lcov.info`
- **JSON Report**: `coverage/coverage-final.json`

## Performance Benchmarks

### Large Project Performance
- **1000+ files**: < 5 seconds collection, < 1 second build
- **Deep nesting (20 levels)**: < 3 seconds collection, < 1 second build
- **2000+ export list**: < 4 seconds collection, < 2 seconds build

### Memory Usage
- **Heap increase**: < 50MB for 500 files
- **Total heap increase**: < 100MB
- **External memory**: < 10MB

### Scalability
- **Linear scaling**: < 6x slower for 5x more files
- **Concurrent processing**: < 5 seconds for 5 concurrent operations

## Error Handling

### Graceful Degradation
- Missing directories: Return empty results
- Permission errors: Handle gracefully
- Invalid paths: Provide meaningful errors
- Circular dependencies: Detect and handle
- Configuration errors: Validate and provide defaults

### Recovery Mechanisms
- Partial failures: Continue with valid files
- Memory issues: Handle large files gracefully
- Disk space issues: Handle many files efficiently
- Network issues: Handle network paths gracefully

## Cross-Platform Support

### Operating Systems
- **Windows**: Full support with path normalization
- **macOS**: Full support with platform-specific features
- **Linux**: Full support with Unix path handling

### File Systems
- **Case sensitivity**: Handle appropriately per platform
- **Line endings**: Support both Unix and Windows
- **Character encoding**: UTF-8 support
- **Path limits**: Handle platform-specific limits

## Migration Support

### Version Compatibility
- **v1.x**: Full backward compatibility
- **v2.x**: New features with migration support
- **Mixed versions**: Handle gracefully

### Migration Features
- **Auto-migration**: Automatic configuration updates
- **Preservation**: User customizations maintained
- **Warnings**: Deprecated option notifications
- **Guidance**: Migration path recommendations

## Contributing

### Adding New Tests
1. Follow the existing test structure
2. Use descriptive test names
3. Include edge cases and error scenarios
4. Maintain coverage requirements
5. Add performance benchmarks if applicable

### Test Guidelines
- Use `describe` blocks for test organization
- Use `test` or `it` for individual test cases
- Include setup and teardown with `beforeAll`/`afterAll`
- Clean up test files and directories
- Mock external dependencies appropriately
- Use meaningful assertions and error messages

### Code Quality
- Follow TypeScript best practices
- Use proper type annotations
- Include JSDoc comments for complex tests
- Maintain consistent code style
- Handle async operations properly
