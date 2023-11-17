import { AutoExporterOptions } from '../types/module-exporter.types'
import { TColorValue } from '../types/t-color.types'
import { BundleExportAsFunctionParams } from './bundle-export-as-function'
import { ConfigForCollectPathsFromDirectories } from './collect-paths-from-directories'
import { getFilenameFromPath } from './get-file-name-from-path'
import { logColoredMessage } from './log-with-color'
import { parseComplexExtensionFromPath } from './parse-complex-extension-from-path'
import { ResultItemType, pushToResults } from './push-to-results'

const hasFileLogger = (
  fileName: string,
  ext: string,
  color: TColorValue
): void => {
  logColoredMessage(
    `${
      color === 'red' ? 'Excluding' : 'Including'
    } file: ${fileName} with fileExtension: ${ext}`,
    color
  )
  console.log('\n')
  return
}

export function notValidExtension(
  filePath: string,
  ignoredExtensions: string[],
  debug?: boolean
): boolean {
  const extension = parseComplexExtensionFromPath(filePath)
  const filePathHasIgnoredExtension =
    filePath.includes(extension) && ignoredExtensions.includes(extension)

  if (debug) {
    console.log(ignoredExtensions, 'ignoredExtensions')
    console.log(filePath, 'filePath')
    console.log(extension, 'extension from filePath')
    console.log('isThisIgnoredExtension?', filePathHasIgnoredExtension)
  }

  if (filePathHasIgnoredExtension) {
    if (debug) {
      hasFileLogger(filePath, extension, 'red')
    }
    return true
  }

  return false
}

export function isValidExtension(
  filePath: string,
  allowedExtensions: string[],
  debug?: boolean
): boolean {
  const extension = parseComplexExtensionFromPath(filePath)
  const filePathHasCorrectExtension =
    filePath.includes(extension) && allowedExtensions.includes(extension)

  if (debug) {
    console.log(allowedExtensions, 'ignoredExtensions')
    console.log(filePath, 'filePath')
    console.log(extension, 'extension from filePath')
    console.log('isThisCorrectExtension?', filePathHasCorrectExtension)
  }

  if (filePathHasCorrectExtension) {
    if (debug) {
      hasFileLogger(filePath, extension, 'green')
    }
    return true
  }

  return false
}

export function fileHasValidExtension(
  filePath: string,
  config:
    | AutoExporterOptions
    | BundleExportAsFunctionParams
    | ConfigForCollectPathsFromDirectories
): boolean {
  const ignoredExtensions = config.ignoredExtensions || []
  const allowedExtensions = config.allowedExtensions || []
  const specificFiles = config.specificFiles || []
  const excludeSpecificFiles = config.excludeSpecificFiles || []

  console.log(filePath, 'filePath')

  const nameOfFile = getFilenameFromPath(filePath)
  const nameOfFileIsString = typeof nameOfFile === 'string'
  console.log(nameOfFile, 'nameOfFile')

  if (nameOfFileIsString && excludeSpecificFiles.includes(nameOfFile)) {
    return false
  }

  if (config.debug && nameOfFileIsString) {
    if (
      ignoredExtensions &&
      ignoredExtensions.length > 0 &&
      allowedExtensions &&
      allowedExtensions.length > 0
    ) {
      // this should never happen
      // because we filter out the ignoredExtensions
      // from the allowedExtensions in modifyConfig
      // but just in case, we'll throw an error
      const commonExtensions = ignoredExtensions.filter((ext) =>
        allowedExtensions.includes(ext)
      )

      if (commonExtensions.length > 0) {
        logColoredMessage(
          `this is the ignoredExtensions: ${ignoredExtensions}`,
          'red'
        )
        logColoredMessage(
          `this is the allowedExtensions: ${allowedExtensions}`,
          'green'
        )
        throw new Error(
          `You cannot have an extension in both ignoredExtensions and allowedExtensions. Common extensions: ${commonExtensions.join(
            ', '
          )}`
        )
      }
    }
  }

  if (config.debug && nameOfFileIsString) {
    logColoredMessage(
      `these are files to exclude ${JSON.stringify(
        excludeSpecificFiles,
        null,
        2
      )}`,
      'magenta'
    )
  }

  if (excludeSpecificFiles.length > 0 && nameOfFileIsString) {
    if (nameOfFileIsString && excludeSpecificFiles.includes(nameOfFile)) {
      if (config.results) {
        config.results = pushToResults(
          config.results,
          ResultItemType.ExcludedFile,
          {
            nameOrPath: nameOfFile,
            reason: [`it is in the excludeSpecificFiles array`]
          }
        )
      }
      return false
    }
  } else if (specificFiles.length > 0 && nameOfFileIsString) {
    if (specificFiles.includes(nameOfFile)) {
      return true
    } else {
      return false
    }
  }

  if (
    nameOfFileIsString &&
    notValidExtension(nameOfFile, ignoredExtensions, config.debug)
  ) {
    return false
  } else if (nameOfFileIsString) {
    return isValidExtension(nameOfFile, allowedExtensions, config.debug)
  } else {
    return false
  }
}
