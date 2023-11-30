import { createExportMatches } from '../src/export-related/create-export-matches'
import {
    pathToIndexWithDefaultExport,
    pathWithFunctionExport,
    pathWithInterfaceInFile,
    pathWithJSFile,
    pathWithNoExports
} from './shared.test'

describe('createExportMatches', () => {
  it('should create correct match items from file paths', () => {
    // Setup mock return values
    let usedFunctionNames: Set<string> = new Set()
    let usedFunctionTypes: Set<string> = new Set()

    const result = createExportMatches(
      [
        pathWithFunctionExport,
        pathWithInterfaceInFile,
        pathWithJSFile,
        pathWithNoExports,
        pathWithFunctionExport,
        pathToIndexWithDefaultExport
      ],
      usedFunctionNames,
      usedFunctionTypes
    )
    console.log(result, 'this is result for createExportMatches')
    let expected = [
        {
          functionNames: [{ exportType: 'named', name: 'getDuration' }],
          functionTypes: [],
          path: pathWithFunctionExport
        },
        {
          functionNames: [],
          functionTypes: [{ exportType: 'named', name: 'TestOptions' }],
          path: pathWithInterfaceInFile
        },
        {
          functionNames: [{ exportType: 'named', name: 'myVarInJS' }],
          functionTypes: [],
          path: pathWithJSFile
        },
        {
          functionNames: [],
          functionTypes: [],
          path: pathWithNoExports
        },
        {
          functionNames: [],
          functionTypes: [],
          path: pathWithFunctionExport
        },
        {
          functionNames: [{ exportType: 'default', name: 'TestComp' }],
          functionTypes: [],
          path: pathToIndexWithDefaultExport
        }
      ]
    expect(result).toEqual(expected)
  })
})


