import autoExporter from '@devlander/collect-exports-for-bundle';
import * as fs from 'fs';
jest.mock('fs');






describe('autoExporter', () => {
  
  beforeAll(() => {
    jest.resetModules();
    jest.mock('fs');
  }
  );
  it('it creates index.ts file with default export ', () => {
    const config = {
        rootDir: ".",
        primaryExportFile: 'mainExport.ts',
        allowedExtensions: ['.ts', '.tsx', '.component.tsx', '.component.ts'],
        ignoredExtensions: ['.test.tsx', '.stories.tsx', '.test.ts', '.stories.ts'],
        excludedFolders: ['node_modules'],
    }



    // Define the configuration for autoExporter
   

    // Execute the autoExporter
     autoExporter(config);
     const expectedOutput = fs.readFileSync('index.ts', 'utf8');

    // Check something about the output
    expect(expectedOutput).toContain('export default');
});
  it('creates index.ts config file without junk folder using excludedFolders', () => {
    try {
        const {runAutoExporter} = require('../src/testing-auto-exporter');

      // Define the configuration for autoExporter
      const config = {
        primaryExportFile: '.',
        targetVersion: 'es6',
        allowedExtensions: ['.ts', '.tsx'],
        ignoredExtensions: ['.test.ts', '.test.tsx'],
        excludedFolders: ['junk'],
      };

      // Execute the autoExporter
      runAutoExporter(config);
      const expectedOutput = fs.readFileSync('index.ts', 'utf8').toString()
      let isValidOutput  = (output: string) => {
        if(output.includes('junk') || output.includes('junk')){
          return false
        }
      } 

      let isValid = isValidOutput(expectedOutput)

      // Check something about the output
      expect(isValid).toBeTruthy();

    } catch (error: any) {
      throw new Error(`Test failed. Error: ${error.message}`);
    }
  });

  // ... More tests for other functionalities.
});
