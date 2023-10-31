import fs from 'fs'
import path from 'path'
import { ModuleExportOptions } from '../types/module-exporter.types'
import { collectPathsFromDirectories } from './collect-paths-from-directories'
import { extractDefaultExportVariable } from './extract-default-export'
import { getExportedFunctionNames } from './get-exported-function-names'
import { logColoredMessage } from './log-with-color'
interface MatchItem {
  path: string
  functionNames: string[]
}

interface BundleExportAsFunctionParams extends Partial<ModuleExportOptions> {
  rootDir: string
}

export const bundleExportAsFunction = async (
  options: BundleExportAsFunctionParams
) => {
  try {
    const filteredPaths = await collectPathsFromDirectories(
      options.rootDir,
      options
    )

    logColoredMessage(
      `Starting to bundle modules into ${options.outputFileName}${options.outputFilenameExtension}`,
      'blue'
    )

    if (!options.bundleAsFunctionForDefaultExportAs) return

    const usedFunctionNames: string[] = []

    const matches: MatchItem[] = []

    for (const filePath of filteredPaths) {
      const functionNamesForPath = getExportedFunctionNames(filePath)
      console.log(functionNamesForPath, 'functionNamesForPath')

      if (!functionNamesForPath) continue
      functionNamesForPath.forEach((name) => {
        if (usedFunctionNames.includes(name)) {
          logColoredMessage(
            `Duplicate function name: ${name} \n skipping... ${name} \n \n`,
            'red'
          )
        } else {
          usedFunctionNames.push(name)
          const existingMatch = matches.find((m) => m.path === filePath)
          if (existingMatch) {
            existingMatch.functionNames.push(name)
          } else {
            matches.push({ path: filePath, functionNames: [name] })
          }
        }
      })
    }
    logColoredMessage(`${JSON.stringify(matches)}`, 'blue')

    const combinedExports: string[] = []
    const variablesToExport: string[] = []

    matches.forEach((match) => {
      const relativePath = `./${path
        .relative(options.rootDir, match.path)
        .replace(/\\/g, '/')}`

      console.log(relativePath, 'relativePath')
      const hasDefaultExport = extractDefaultExportVariable(match.path) || ''
      const withoutExtension = relativePath.substring(
        0,
        relativePath.lastIndexOf('.')
      )
      console.log(withoutExtension, 'hasDefaultExport')
      if (
        hasDefaultExport &&
        typeof hasDefaultExport === 'string' &&
        hasDefaultExport.length > 0
      ) {
        const filteredFunctionNames = match.functionNames.filter(
          (word) => word !== hasDefaultExport
        )
        const exportedFunctions =
          filteredFunctionNames.length > 0
            ? `, {${filteredFunctionNames.join(', ')}}`
            : ''
        combinedExports.push(
          `import ${hasDefaultExport}${exportedFunctions} from '${withoutExtension}'`
        )
        variablesToExport.push(hasDefaultExport)
        if (filteredFunctionNames.length > 0) {
          filteredFunctionNames.forEach((name) => {
            if (!variablesToExport.includes(name)) {
              variablesToExport.push(name)
            }
          })
        }
      } else if (match.functionNames.length > 0) {
        const exportedFunctions =
          match.functionNames.length > 0
            ? `{${match.functionNames.join(', ')}}`
            : ''
        combinedExports.push(
          `import ${exportedFunctions} from '${withoutExtension}'`
        )
        if (match.functionNames.length > 0) {
          match.functionNames.forEach((name) => {
            if (!variablesToExport.includes(name)) {
              variablesToExport.push(name)
            }
          })
        }
      }
    })

    console.log(combinedExports, 'combinedExports')

    combinedExports.push(
      `const ${
        options.bundleAsFunctionForDefaultExportAs
      } = {\n  ${variablesToExport.join(',\n  ')}\n}`
    )
    combinedExports.push(
      `export default ${options.bundleAsFunctionForDefaultExportAs}`
    )

    const fileToRewrite = `${options.outputFileName}${options.outputFilenameExtension}`

    fs.unlinkSync(path.join(options.rootDir, fileToRewrite))

    fs.writeFileSync(
      path.join(options.rootDir, fileToRewrite),
      combinedExports.join('\n')
    )

    // return combinedExports.join('\n')
    console.log(filteredPaths, 'filteredPaths')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
