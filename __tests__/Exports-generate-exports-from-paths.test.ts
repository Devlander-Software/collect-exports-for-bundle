import { createDurationComment } from '../src/comments/create-duration-comment';
import { createTitleComment } from '../src/comments/create-title-comment';
import { generateExportsFromPaths } from '../src/export-related/generator-exports-from-paths';
import { AutoExporterOptions } from '../src/types/module-exporter.types';
import { pathToFileWithDefaultExport, pathToForTests, pathToIndexWithDefaultExport, pathWithFunctionExport, pathWithTypesExtension } from "./shared.test";

describe('createExportMatches', () => {
    it('should generate exports from provided paths', () => {
        let rootDir = pathToForTests;

        const paths = [
            pathToFileWithDefaultExport,
            pathToIndexWithDefaultExport,
            pathWithFunctionExport,
            pathWithTypesExtension,

        ];
        const config: AutoExporterOptions = {
            rootDir: rootDir, debug: true, results: {
                startTime: Date.now(),
                title: '',
                description: '',
                includedFolders: [],
                includedFiles: [],
                excludedFolders: [],
                excludedFiles: [],
                includedExports: [],
                excludedExports: [],
                endTime: 0,
                duration: '',
                withParameters: {
                    ignoredExtensions: [],
                    allowedExtensions: [],
                    excludedFolders: [],
                    specificFiles: [],
                    rootDir: ''
                }
            },
            allowedExtensions: [".ts", ".tsx", ".js", ".jsx", ".type.ts", ".type.tsx", ".native.ts", ".native.tsx", ".web.ts", ".web.tsx"],
            exportMode: 'named',
            outputFileName: 'index',
            outputFilenameExtension: '.ts',
            ignoredExtensions: ["test.tsx", ".test.ts", ".stories.tsx", ".stories.ts", ".stories.tsx"],
            specificFiles: [],
            excludeSpecificFiles: [],
            includeIndexes: false,
            excludedFolders: ["node_modules", ".github", ".storybook"]
        };
      
        const result = generateExportsFromPaths(paths, config);
        console.log(result, 'this is result from generate exports from paths')
        const titleComment = createTitleComment(config.title)
        const durationComment = createDurationComment(config.results.startTime, config.results.endTime)

        let expected = [
            `export { default as TestComp } from './TestComp'`,
           
        ]


        expect(result).toContain(expected);
        // Additional assertions can be added based on expected behavior
      });

    })