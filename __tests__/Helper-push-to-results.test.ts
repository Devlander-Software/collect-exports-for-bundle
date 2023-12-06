import { ResultItemType, pushToResults } from '../src/utils/push-to-results';
describe('pushToResults', () => {
    it('should add a new IncludedFile item to Results', () => {
      const results = {
        title: 'Test Results',
        description: 'Initial test',
        includedFolders: [],
        includedFiles: [],
        excludedFolders: [],
        excludedFiles: [],
        includedExports: [],
        excludedExports: [],
        startTime: Date.now(),
        endTime: Date.now(),
        duration: '0ms',
        withParameters: {
          ignoredExtensions: [],
          allowedExtensions: [],
          excludedFolders: [],
          specificFiles: [],
          rootDir: ''
        }
      };
      const newItem = { nameOrPath: 'file1.js', reason: ['Initial commit'] };
      const expectedResults = {
        ...results,
        includedFiles: [newItem],
      };
  
      const updatedResults = pushToResults(results, ResultItemType.IncludedFile, newItem);
  
      expect(updatedResults).toEqual(expectedResults);
    });
  
    // Additional test cases...
  });
  