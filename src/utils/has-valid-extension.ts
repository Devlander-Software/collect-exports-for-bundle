import { AutoExporterOptions } from '../types/module-exporter.types'
import { TColorValue } from '../types/t-color.types'
import { BundleExportAsFunctionParams } from './bundle-export-as-function'
import { ConfigForCollectPathsFromDirectories } from './collect-paths-from-directories'
import { getFilenameFromPath } from './get-file-name-from-path'
import { logColoredMessage } from './log-with-color'
import { parseComplexExtensionFromPath } from './parse-complex-extension-from-path'

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

function notValidExtension(
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

function isValidExtension(
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
  const nameOfFile = getFilenameFromPath(filePath)

  if (config.debug) {
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
      if (ignoredExtensions.some((ext) => allowedExtensions.includes(ext))) {
        logColoredMessage(
          `this is the ignoredExtensions: ${ignoredExtensions}`,
          'red'
        )
        logColoredMessage(
          `this is the allowedExtensions: ${allowedExtensions}`,
          'green'
        )
        throw new Error(
          `You cannot have an extension in both ignoredExtensions and allowedExtensions. `
        )
      }
    }
  }

  if (specificFiles.length > 0) {
    if (specificFiles.includes(nameOfFile)) {
      return true
    } else {
      return false
    }
  } else if (notValidExtension(nameOfFile, ignoredExtensions, config.debug)) {
    return false
  } else {
    return isValidExtension(nameOfFile, allowedExtensions, config.debug)
  }
}
