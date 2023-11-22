import { BundleExportAsFunctionParams, bundleExportAsFunction } from '../src/features/bundle-export-as-function';
import { nodeModulesPath, pathToForTests } from './shared.test';


describe.only('detectExportsFeature', () => {
describe('bundleExportAsFunction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle file bundling correctly', async () => {
    // Mock data and functions
    const mockFilePaths = ['/path/to/module1.js', '/path/to/module2.js'];
    const mockFunctionNames = ['func1', 'func2'];
    const mockTypeDeclarations = ['Type1', 'Type2'];
    const mockDefaultExport = 'defaultExport';

   
    // Mock fs and path as necessary
    // Example: fs.writeFileSync.mockImplementation(() => {});

    // Call the function with mocked options
    const options: BundleExportAsFunctionParams = {
        // Mock options
        rootDir: pathToForTests,
        outputFileName: 'mockOutputFile',
        outputFilenameExtension: '.ts',
        exportMode: 'default',
        allowedExtensions: [".ts", ".tsx", ".component.tsx", ".component.ts"],
        ignoredExtensions: [".test.tsx", ".stories.tsx", ".test.ts", ".stories.ts"],
        specificFiles: [],
        excludedFolders: [nodeModulesPath, "typings"],
        debug: false,
        results: {
            title: 'Mock Title',
            description: '',
            includedFolders: [],
            includedFiles: [],
            excludedFolders: [],
            excludedFiles: [],
            includedExports: [],
            excludedExports: [],
            startTime: 0,
            endTime: 0,
            duration: '',
            withParameters: {
                ignoredExtensions: [],
                allowedExtensions: [],
                excludedFolders: [],
                specificFiles: [],
                rootDir: ''
            }
        }
          
    };

    const result = await bundleExportAsFunction(options);
    console.log(result);
    // Assertions
    expect(result).toBeDefined();
    // Add more assertions to verify the correct behavior
  });

  // Additional tests to handle edge cases, error handling, etc.
});
})