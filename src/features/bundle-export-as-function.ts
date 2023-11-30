import fs from 'fs'
import path from 'path'
import { createDurationComment } from '../comments/create-duration-comment'
import { createTitleComment } from '../comments/create-title-comment'

import { createExportMatches } from '../export-related/create-export-matches'
import { AutoExporterOptions, Results } from '../types/module-exporter.types'
import { getDuration } from '../utils/get-duration'
import {
  logColoredMessage,
  logMessageForFunction
} from '../utils/log-with-color'
import { collectPathsFromDirectories } from './collect-paths/collect-paths-from-directories'

export interface BundleExportAsFunctionParams
  extends Partial<AutoExporterOptions> {
  rootDir: string
  bundleAsObjectForDefaultExport?: string
  allowedExtensions: string[]
  ignoredExtensions: string[]
  results: Results
  excludedFolders: string[]
  outputFileName?: string

  debug: boolean
}

export const bundleExportAsFunction = async (
  options: BundleExportAsFunctionParams
): Promise<string | void> => {
  try {
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

    if (!options.bundleAsObjectForDefaultExport) return
    const usedTypeNames = new Set<string>()
    const usedFunctionNames = new Set<string>()
    const matches = createExportMatches(
      filteredPaths,
      usedFunctionNames,
      usedTypeNames
    )

    const combinedExports: string[] = []
    const variablesToExport: string[] = []

    // // handle imports for default export
    // matches.forEach((match) => {
    //   const relativePath = `./${path
    //     .relative(options.rootDir, match.path)
    //     .replace(/\\/g, '/')}`

    //   const hasDefaultExport = extractDefaultExportVariable(match.path) || ''
    //   const withoutExtension = relativePath.substring(
    //     0,
    //     relativePath.lastIndexOf('.')
    //   )
    //   if (
    //     hasDefaultExport &&
    //     typeof hasDefaultExport === 'string' &&
    //     hasDefaultExport.length > 0
    //   ) {
    //     const exportedFunctions =
    //       filteredFunctionNames.length > 0
    //         ? `, {${filteredFunctionNames.join(', ')}}`
    //         : ''

    //     if (options.exportMode === 'default' || options.exportMode === 'both') {
    //       combinedExports.push(
    //         `import ${hasDefaultExport}${exportedFunctions} from '${withoutExtension}'`
    //       )
    //     }
    //     variablesToExport.push(hasDefaultExport)
    //     if (filteredFunctionNames.length > 0) {
    //       filteredFunctionNames.forEach((name) => {
    //         if (!variablesToExport.includes(name)) {
    //           variablesToExport.push(name)
    //         }
    //       })
    //     }
    //   } else if (match.functionNames.length > 0) {
    //     const exportedFunctions =
    //       match.functionNames.length > 0
    //         ? `{${match.functionNames.join(', ')}}`
    //         : ''
    //     if (options.exportMode === 'default' || options.exportMode === 'both') {
    //       combinedExports.push(
    //         `import ${exportedFunctions} from '${withoutExtension}'`
    //       )
    //     }

    //     if (match.functionNames.length > 0) {
    //       match.functionNames.forEach((name) => {
    //         if (!variablesToExport.includes(name)) {
    //           variablesToExport.push(name)
    //         }
    //       })
    //     }
    //   }
    // })
    // if (options.exportMode === 'default' || options.exportMode === 'both') {
    //   combinedExports.push(
    //     `const ${
    //       options.bundleAsObjectForDefaultExport
    //     } = {\n  ${variablesToExport.join(',\n  ')}\n}`
    //   )
    // }
    // variablesToExport.forEach((name) => {
    //   const pathForFunctionName = matches.find((m) =>
    //     m.functionNames.includes(name)
    //   )
    //   if (!pathForFunctionName) return
    //   const relativePath = `./${path
    //     .relative(options.rootDir, pathForFunctionName.path)
    //     .replace(/\\/g, '/')}`
    //   const withoutExtension = relativePath.substring(
    //     0,
    //     relativePath.lastIndexOf('.')
    //   )
    //   if (options.exportMode === 'named' || options.exportMode === 'both') {
    //     combinedExports.push(`export {${name}} from '${withoutExtension}'`)
    //   }
    // })

    // if (options.exportMode === 'default' || options.exportMode === 'both') {
    //   combinedExports.push(
    //     `export default ${options.bundleAsObjectForDefaultExport}`
    //   )
    // }
    // if (options.exportMode === 'named' || options.exportMode === 'both') {
    //   typeMatches.forEach((match) => {
    //     const relativePath = `./${path
    //       .relative(options.rootDir, match.path)
    //       .replace(/\\/g, '/')}`

    //     const withoutExtension = relativePath.substring(
    //       0,
    //       relativePath.lastIndexOf('.')
    //     )
    //     if (match.functionNames.length > 0) {
    //       const exportedFunctions =
    //         match.functionNames.length > 0
    //           ? `{${match.functionNames.join(', ')}}`
    //           : ''

    //       combinedExports.push(
    //         `export type ${exportedFunctions} from '${withoutExtension}'`
    //       )
    //     }
    //   })
    // }

    if (options.title || options.description) {
      const commentForFile = createTitleComment(
        options.title || '',
        options.description || ''
      )
      combinedExports.push(commentForFile)
    }

    if (options.results && options.results.startTime) {
      const endedAt = Date.now()

      options.results.endTime = endedAt

      options.results.duration = getDuration(options.results.startTime, endedAt)

      const durationComment = createDurationComment(
        options.results.startTime,
        endedAt
      )

      combinedExports.push(durationComment)
    }
    const fileToRewrite = `${options.outputFileName}${options.outputFilenameExtension}`

    fs.unlinkSync(path.join(options.rootDir, fileToRewrite))

    if (options.rootDir && fileToRewrite) {
      fs.writeFileSync(
        path.join(options.rootDir, fileToRewrite),
        combinedExports.join('\n')
      )
    }

    if (options.debug) {
      logMessageForFunction('bundleExportAsFunction', combinedExports)
    }

    return combinedExports.join('\n')
  } catch (error) {
    console.error('An error occurred:', error)
    return ''
  }
}
