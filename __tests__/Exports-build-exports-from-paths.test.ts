
import { BuildExportsFromPathParams, buildExportsFromPaths } from '../src/export-related/build-exports-from-paths';
import { removeExtensionAndMakeRelative } from '../src/extensions/remove-extension-and-make-relative';
import { getFileContent } from '../src/utils/get-file-content';
import { getFilenameFromPath } from '../src/utils/get-file-name-from-path';
import { pathToForTests, pathToIndexWithDefaultExport } from './shared.test';


describe('buildExportsFromPaths', () => {

it('should export TestComp as primary export since it is defined in config', () => {
    const usedFunctionNames: Set<string> = new Set()
    const usedFunctionTypes: Set<string> = new Set()
    const results: string[] = []
    const defaultExportString: string[] = []
    const rootDir = pathToForTests;
    console.log(rootDir)
    const filePath = pathToIndexWithDefaultExport;
    console.log(filePath)
    const fileName = getFilenameFromPath(pathToIndexWithDefaultExport);
    console.log(fileName)
    const withoutExtension = removeExtensionAndMakeRelative(
        pathToIndexWithDefaultExport,
        rootDir
      )
    

      const fileContent = getFileContent(pathToIndexWithDefaultExport);
    const params: BuildExportsFromPathParams = {
        fileName: fileName || 'index',
        fileContent: fileContent,
        results: results,
        usedFunctionTypes: usedFunctionTypes,
        withoutExtension,
        filepath: filePath,
        usedFunctionNames: usedFunctionNames,
        defaultExportString: defaultExportString,
        config: {
            rootDir: rootDir,
            allowedExtensions: ["ts", "tsx", "js", "jsx"],
            exportMode: 'named',
            outputFileName: 'index',
            outputFilenameExtension: '.ts',
            ignoredExtensions: [],
            primaryExportFile: 'TestComp.ts',
            specificFiles: [],
            excludeSpecificFiles: [],
            includeIndexes: true,
            excludedFolders: ["node_modules", ".github", ".storybook"],
            debug: true,
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

    console.log(params, 'params')
  
    let buildResult = buildExportsFromPaths(params);
    console.log(buildResult, 'buildResult')
    console.log(results)
  
    expect(results).toContain(`import TestComp from "${params.withoutExtension}";`);
    expect(results).toContain(`export default TestComp;`);
  });


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