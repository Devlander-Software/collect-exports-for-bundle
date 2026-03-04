import * as path from 'path'
import { BuildExportsFromPathParams, buildExportsFromPaths } from '../src/export-related/build-exports-from-paths';
import { removeExtensionAndMakeRelative } from '../src/extensions/remove-extension-and-make-relative';
import { getFileContent } from '../src/utils/get-file-content';
import { getFilenameFromPath } from '../src/utils/get-file-name-from-path';
import {
  pathToForTests,
  pathToFileWithDefaultExport,
  pathWithFunctionExport,
  pathWithTypesExtension
} from './shared.test'


describe('buildExportsFromPaths', () => {

it('should export default as primary export when primaryExportFile matches', () => {
    const usedFunctionNames = new Set<string>()
    const usedFunctionTypes = new Set<string>()
    const results: string[] = []
    const defaultExportString: string[] = []
    const rootDir = pathToForTests
    const filePath = pathToFileWithDefaultExport
    const fileName = getFilenameFromPath(filePath) || 'default-export-variable'
    const withoutExtension = removeExtensionAndMakeRelative(filePath, rootDir)
    const fileContent = getFileContent(filePath)
    const params: BuildExportsFromPathParams = {
        fileName,
        fileContent,
        results,
        usedFunctionTypes,
        withoutExtension,
        filepath: filePath,
        usedFunctionNames,
        defaultExportString,
        config: {
            rootDir,
            allowedExtensions: ['.ts', '.tsx'],
            exportMode: 'named',
            outputFileName: 'index',
            outputFilenameExtension: '.ts',
            ignoredExtensions: [],
            primaryExportFile: 'default-export-variable',
            specificFiles: [],
            excludeSpecificFiles: [],
            includeIndexes: true,
            excludedFolders: ['node_modules', '.github', '.storybook'],
            debug: false,
            results: {
                excludedFiles: [],
                excludedFolders: [],
                includedFiles: [],
                includedFolders: [],
                title: '',
                description: '',
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
        }
    };

    buildExportsFromPaths(params)

    expect(defaultExportString).toContain(
      `import MyExampleFunc from "${params.withoutExtension}";`
    )
    expect(defaultExportString).toContain('export default MyExampleFunc;')
  });


  it('uses inline type keyword when useTypeScriptAPI is true', () => {
    const rootDir = path.resolve(__dirname, '../src')
    const filePath = pathWithTypesExtension
    const fileContent = getFileContent(filePath)
    const withoutExtension = removeExtensionAndMakeRelative(filePath, rootDir)
    const results: string[] = []
    const usedFunctionNames = new Set<string>()
    const usedFunctionTypes = new Set<string>()

    buildExportsFromPaths({
      fileName: getFilenameFromPath(filePath) || 't-color.types',
      fileContent,
      results,
      usedFunctionTypes,
      withoutExtension,
      filepath: filePath,
      usedFunctionNames,
      defaultExportString: [],
      config: {
        rootDir,
        allowedExtensions: ['.ts', '.tsx', '.types.ts'],
        exportMode: 'named',
        outputFileName: 'index',
        outputFilenameExtension: '.ts',
        ignoredExtensions: [],
        excludedFolders: [],
        useTypeScriptAPI: true,
        debug: false,
        specificFiles: [],
        excludeSpecificFiles: [],
        includeIndexes: false,
        results: {
          excludedFiles: [],
          excludedFolders: [],
          includedFiles: [],
          includedFolders: [],
          title: '',
          description: '',
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
      }
    })

    const hasInlineType = results.some(
      (r) => r.includes('type ') && r.includes("} from '")
    )
    expect(hasInlineType).toBe(true)
  })

  it('uses separate export and export type when useTypeScriptAPI is false', () => {
    const rootDir = path.resolve(__dirname, '../src')
    const filePath = pathWithTypesExtension
    const fileContent = getFileContent(filePath)
    const withoutExtension = removeExtensionAndMakeRelative(filePath, rootDir)
    const results: string[] = []
    const usedFunctionNames = new Set<string>()
    const usedFunctionTypes = new Set<string>()

    buildExportsFromPaths({
      fileName: getFilenameFromPath(filePath) || 't-color.types',
      fileContent,
      results,
      usedFunctionTypes,
      withoutExtension,
      filepath: filePath,
      usedFunctionNames,
      defaultExportString: [],
      config: {
        rootDir,
        allowedExtensions: ['.ts', '.tsx', '.types.ts'],
        exportMode: 'named',
        outputFileName: 'index',
        outputFilenameExtension: '.ts',
        ignoredExtensions: [],
        excludedFolders: [],
        useTypeScriptAPI: false,
        debug: false,
        specificFiles: [],
        excludeSpecificFiles: [],
        includeIndexes: false,
        results: {
          excludedFiles: [],
          excludedFolders: [],
          includedFiles: [],
          includedFolders: [],
          title: '',
          description: '',
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
      }
    })

    const hasExportType = results.some((r) => r.startsWith('export type {'))
    expect(hasExportType).toBe(true)
  })

  it('skips file with @collect-exports-exclude directive', () => {
    const rootDir = path.resolve(__dirname, '../src')
    const filePath = pathWithFunctionExport
    const fileContent = `/** @collect-exports-exclude */
export function getDuration() {}`
    const withoutExtension = removeExtensionAndMakeRelative(filePath, rootDir)
    const results: string[] = []
    const usedFunctionNames = new Set<string>()
    const usedFunctionTypes = new Set<string>()

    buildExportsFromPaths({
      fileName: 'get-duration',
      fileContent,
      results,
      usedFunctionTypes,
      withoutExtension,
      filepath: filePath,
      usedFunctionNames,
      defaultExportString: [],
      config: {
        rootDir,
        allowedExtensions: ['.ts', '.tsx', '.types.ts'],
        exportMode: 'named',
        outputFileName: 'index',
        outputFilenameExtension: '.ts',
        ignoredExtensions: [],
        excludedFolders: [],
        debug: false,
        specificFiles: [],
        excludeSpecificFiles: [],
        includeIndexes: false,
        results: {
          excludedFiles: [],
          excludedFolders: [],
          includedFiles: [],
          includedFolders: [],
          title: '',
          description: '',
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
      }
    })

    expect(results.length).toBe(0)
  })

//   it('should process file with valid extension and export matches', () => {
//     const params: BuildExportsFromPathParams = {
//         fileName: '',
//         fileContent: fileContentWithFunction,
//         results: [],
//         usedFunctionTypes: new Set(),
//         withoutExtension: '',
//         filepath: '',
//         componentName: '',
//         usedFunctionNames: new Set(),
//         defaultExportString: [],
//         config: {
//             rootDir: '',
//             allowedExtensions: [],
//             exportMode: 'named',
//             outputFileName: '',
//             outputFilenameExtension: '.ts',
//             ignoredExtensions: [],
//             specificFiles: [],
//             excludeSpecificFiles: [],
//             includeIndexes: false,
//             excludedFolders: [],
//             debug: false,
//             results: {
//                 excludedFiles: [],
//                 excludedFolders: [],
//                 includedFiles: [],
//                 includedFolders: [],
//                 title: '',
//                 description: '',
//                 includedExports: [],
//                 excludedExports: [],
//                 startTime: 0,
//                 endTime: 0,
//                 duration: '',
//                 withParameters: {
//                     ignoredExtensions: [],
//                     allowedExtensions: [],
//                     excludedFolders: [],
//                     specificFiles: [],
//                     rootDir: ''
//                 }
//             } 
//         }
//     };
 
  
//     const result = buildExportsFromPaths(params);
  
//     expect(result).toContain(`export {getDuration} from '${params.withoutExtension}'`);
//   });

});