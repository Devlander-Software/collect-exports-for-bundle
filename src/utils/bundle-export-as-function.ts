import fs from 'fs'
import path from 'path'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { collectPathsFromDirectories } from './collect-paths-from-directories'
import { discoverFunctionTypes } from './discover-function-types'
import { extractDefaultExportVariable } from './extract-default-export'
import { getExportedFunctionNames } from './get-exported-function-names'
import { getExportedTypeDeclarations } from './get-exported-type-declarations'
import { logColoredMessage } from './log-with-color'

export interface MatchItem {
  path: string
  functionNames: string[]
}

export interface BundleExportAsFunctionParams
  extends Partial<AutoExporterOptions> {
  rootDir: string
  bundleAsFunctionForDefaultExportAs?: string
  allowedExtensions: string[]
  ignoredExtensions: string[]
  excludedFolders: string[]
  outputFileName: string

  debug: boolean
}

export const bundleExportAsFunction = async (
  options: BundleExportAsFunctionParams
): Promise<string | void> => {
  try {
    console.log(options.exportMode)
    const filteredPaths = await collectPathsFromDirectories(
      options.rootDir,
      options
    )
    if (options.debug) {
      logColoredMessage(
        `Starting to bundle modules into ${options.outputFileName}${options.outputFilenameExtension}`,
        'blue'
      )
    }

    if (!options.bundleAsFunctionForDefaultExportAs) return

    const usedFunctionNames: string[] = []
    const usedFunctionTypes: string[] = []

    const matches: MatchItem[] = []
    const typeMatches: MatchItem[] = []
    const functionTypes = await discoverFunctionTypes(options)

    console.log('functionTypes', functionTypes)

    for (const filePath of filteredPaths) {
      const functionNamesForPath = getExportedFunctionNames(filePath)
      const typeDeclarationsForPath = getExportedTypeDeclarations(filePath)

      if (!functionNamesForPath && !typeDeclarationsForPath) continue
      if (functionNamesForPath && functionNamesForPath.length > 0) {
        functionNamesForPath.forEach((name) => {
          if (usedFunctionNames.includes(name)) {
            logColoredMessage(
              `Duplicate function name: ${name} \n skipping... ${name} \n \n`,
              'red'
            )
            // TO DO
            // check if it has the same type signature
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

      if (typeDeclarationsForPath && typeDeclarationsForPath.length > 0) {
        typeDeclarationsForPath.forEach((name) => {
          if (usedFunctionTypes.includes(name)) {
            logColoredMessage(
              `Duplicate type name: ${name} \n skipping... ${name} \n \n`,
              'red'
            )
          } else {
            usedFunctionTypes.push(name)
            const existingMatch = typeMatches.find((m) => m.path === filePath)
            if (existingMatch) {
              existingMatch.functionNames.push(name)
            } else {
              typeMatches.push({ path: filePath, functionNames: [name] })
            }
          }
        })
      }
    }

    const combinedExports: string[] = []
    const variablesToExport: string[] = []
    // handle imports for default export
    matches.forEach((match) => {
      const relativePath = `./${path
        .relative(options.rootDir, match.path)
        .replace(/\\/g, '/')}`

      const hasDefaultExport = extractDefaultExportVariable(match.path) || ''
      const withoutExtension = relativePath.substring(
        0,
        relativePath.lastIndexOf('.')
      )
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

        if (options.exportMode === 'default' || options.exportMode === 'both') {
          combinedExports.push(
            `import ${hasDefaultExport}${exportedFunctions} from '${withoutExtension}'`
          )
        }
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
        if (options.exportMode === 'default' || options.exportMode === 'both') {
          combinedExports.push(
            `import ${exportedFunctions} from '${withoutExtension}'`
          )
        }

        if (match.functionNames.length > 0) {
          match.functionNames.forEach((name) => {
            if (!variablesToExport.includes(name)) {
              variablesToExport.push(name)
            }
          })
        }
      }
    })
    if (options.exportMode === 'default' || options.exportMode === 'both') {
      combinedExports.push(
        `const ${
          options.bundleAsFunctionForDefaultExportAs
        } = {\n  ${variablesToExport.join(',\n  ')}\n}`
      )
    }
    variablesToExport.forEach((name) => {
      const pathForFunctionName = matches.find((m) =>
        m.functionNames.includes(name)
      )
      if (!pathForFunctionName) return
      const relativePath = `./${path
        .relative(options.rootDir, pathForFunctionName.path)
        .replace(/\\/g, '/')}`
      const withoutExtension = relativePath.substring(
        0,
        relativePath.lastIndexOf('.')
      )
      if (options.exportMode === 'named' || options.exportMode === 'both') {
        combinedExports.push(`export {${name}} from '${withoutExtension}'`)
      }
    })

    if (options.exportMode === 'default' || options.exportMode === 'both') {
      combinedExports.push(
        `export default ${options.bundleAsFunctionForDefaultExportAs}`
      )
    }
    if (options.exportMode === 'named' || options.exportMode === 'both') {
      typeMatches.forEach((match) => {
        const relativePath = `./${path
          .relative(options.rootDir, match.path)
          .replace(/\\/g, '/')}`

        const withoutExtension = relativePath.substring(
          0,
          relativePath.lastIndexOf('.')
        )
        if (match.functionNames.length > 0) {
          const exportedFunctions =
            match.functionNames.length > 0
              ? `{${match.functionNames.join(', ')}}`
              : ''

          combinedExports.push(
            `export type ${exportedFunctions} from '${withoutExtension}'`
          )
        }
      })
    }
    const fileToRewrite = `${options.outputFileName}${options.outputFilenameExtension}`

    fs.unlinkSync(path.join(options.rootDir, fileToRewrite))

    fs.writeFileSync(
      path.join(options.rootDir, fileToRewrite),
      combinedExports.join('\n')
    )
    console.log(options.exportMode)
    console.log(options.exportMode)

    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)
    console.log(options.exportMode)

    return combinedExports.join('\n')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
