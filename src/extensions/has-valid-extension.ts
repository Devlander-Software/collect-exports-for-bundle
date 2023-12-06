import { isFilePath } from '../constraints/is-file-path'
import { BundleExportAsFunctionParams } from '../features/bundle-export-as-function-old'
import { ConfigForCollectPathsFromDirectories } from '../features/collect-paths/collect-paths-from-directories'
import { AutoExporterOptions } from '../types/module-exporter.types'
import { getFilenameFromPath } from '../utils/get-file-name-from-path'
import { logMessageForFunction } from '../utils/log-with-color'
import { isValidExtension } from './is-valid-extension'
import { notValidExtension } from './not-valid-extension'

export function fileHasValidExtension(
  filePath: string,
  config:
    | AutoExporterOptions
    | BundleExportAsFunctionParams
    | ConfigForCollectPathsFromDirectories
): boolean {
  if ((filePath && isFilePath(filePath) === false) || filePath === '') {
    return false
  }
  // Early return for non-string file names
  const nameOfFile = getFilenameFromPath(filePath)
  if (typeof nameOfFile !== 'string') {
    return false
  }

  // Debugging utility function
  const debugLog = (
    message: string,
    variables: { [key: string]: string }
  ): void => {
    if (config.debug) {
      logMessageForFunction(
        'fileHasValidExtension',
        { variables },
        message,
        'yellow'
      )
    }
  }

  // Check if the file is explicitly excluded
  if (config.excludeSpecificFiles?.includes(nameOfFile)) {
    debugLog('Excluded file', { nameOfFile })

    return false
  }

  // Check if the file is explicitly included
  if (config.specificFiles?.includes(nameOfFile)) {
    debugLog(`Returning true`, { nameOfFile })
    return true
  }

  // Check for invalid extension
  if (
    notValidExtension(filePath, config.ignoredExtensions || [], config.debug)
  ) {
    debugLog(`File with invalid extension`, { nameOfFile })
    return false
  }

  // Check for valid extension
  if (
    isValidExtension(filePath, config.allowedExtensions || [], config.debug)
  ) {
    debugLog(`File with valid extension`, { nameOfFile })

    return true
  }

  // If none of the above conditions are met, the file is not valid
  return false
}
