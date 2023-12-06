import { MatchItem } from './create-export-matches'

/**
 * Processes a MatchItem object to generate an array of export statements.
 * This function is particularly useful for creating exports from file paths,
 * handling both named and type exports. It assumes that the provided file path
 * does not include the file extension, which is common in TypeScript projects
 * where the source files are in TypeScript but the compiled output is in JavaScript.
 *
 * @param matchItem - The MatchItem object containing information about the exports.
 *                    It includes function names and types to be exported.
 * @param pathWithoutExtension - The file path without the extension. This is used
 *                               as the source path in the export statements.
 *                               Example paths might be './src/moduleName' or
 *                               './src/directory/subdirectory/moduleName'.
 *                               The function checks if the path corresponds to an
 *                               'index' file to handle the exports accordingly.
 *
 * @returns An array of string export statements. Each string represents an export
 *          statement, formatted according to the exports found in the MatchItem.
 *          For example, named exports are formatted as
 *          `export {exportName} from 'path';`, and type exports as
 *          `export type {typeName} from 'path';`.
 */

// {
//     path: '/Users/landonjohnson/Documents/dev/gists/export-and-build-script/src/for-tests/TestComp/index.ts',
//     functionNames: [ { name: 'TestComp', exportType: 'default' } ],
//     functionTypes: []
//   } matchItem this is match item

export function processMatchItem(
  matchItem: MatchItem,
  pathWithoutExtension: string,
  primaryExportFile?: string
): string[] {
  console.log(pathWithoutExtension, 'withoutExtension')
  const results = []
  console.log(matchItem, 'matchItem this is match item')
  // break apart the path, check the last item
  // if it's index, then mark isFromIndex as true
  const isFromIndex = matchItem.path.split('/').pop()?.includes('index')
    ? true
    : false

  if (isFromIndex && pathWithoutExtension.includes('index')) {
    pathWithoutExtension = pathWithoutExtension.replace('/index', '')
  }

  if (matchItem) {
    const defaultExports = matchItem.functionNames
      ?.filter(({ exportType }) => exportType === 'default')
      .map(({ name }) => name)

    const namedExports = matchItem.functionNames
      ?.filter(({ exportType }) => exportType === 'named')
      .map(({ name }) => name)

    if (defaultExports && defaultExports.length > 0) {
      const exportedFunctions =
        namedExports && namedExports.length > 0
          ? `, {${namedExports.join(', ')}}`
          : ''

      const allFunctionsExports =
        defaultExports && defaultExports.length === 1
          ? `{${defaultExports.join(', ')}${
              namedExports && namedExports.length
                ? `, ${namedExports.join(', ')}`
                : ''
            }}`
          : ''

      console.log(allFunctionsExports, 'allFunctionsExports')

      const defaultFunction = defaultExports[0]
      results.push(
        `import ${defaultFunction}${exportedFunctions} from '${pathWithoutExtension}';`
      )
      results.push(`export ${allFunctionsExports};`)
    } else {
      if (namedExports && namedExports.length > 0) {
        results.push(
          `export {${namedExports.join(', ')}} from '${pathWithoutExtension}';`
        )
      }

      const typeExports = matchItem.functionTypes
        ?.filter(({ exportType }) => exportType === 'named')
        .map(({ name }) => name)

      if (typeExports && typeExports.length > 0) {
        results.push(
          `export type {${typeExports.join(
            ', '
          )}} from '${pathWithoutExtension}';`
        )
      }
    }
  }

  return results
}
