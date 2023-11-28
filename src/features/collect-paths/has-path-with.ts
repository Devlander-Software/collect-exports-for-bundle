import { isFilePath } from '../../constraints/is-file-path'
import { parseComplexExtensionFromFile } from '../../extensions/parse-complex-extension-from-file'
import { parseComplexExtensionFromPath } from '../../extensions/parse-complex-extension-from-path'
import { logMessageForFunction } from '../../utils/log-with-color'

export const hasPathWith = (
  paths: string[],
  listOfExtensionFilenameOrFolderToCheck: string | string[],
  debug?: boolean
): boolean => {
  let hasPath = false
  let reason = ''

  if (debug) {
    logMessageForFunction('hasPathWith - initial input', {
      paths,
      listOfExtensionFilenameOrFolderToCheck
    })
  }

  const checkMatch = (pathComponent: string): boolean => {
    const checks = Array.isArray(listOfExtensionFilenameOrFolderToCheck)
      ? listOfExtensionFilenameOrFolderToCheck
      : [listOfExtensionFilenameOrFolderToCheck]
    if (isFilePath(pathComponent)) {
      const parsedPath = parseComplexExtensionFromPath(pathComponent, debug)
      console.log(parsedPath, 'parsedPath')
      if (parsedPath && parsedPath.baseFileName) {
        console.log(parsedPath.baseFileName, 'parsedPath.baseFileName')
      }
      if (checks.includes(pathComponent)) {
        reason = `Path component ${pathComponent} is in the list of checks`
        return true
      }

      if (
        parsedPath &&
        parsedPath.folderName &&
        checks.includes(parsedPath.folderName)
      ) {
        reason = `Folder name ${parsedPath.folderName} is in the list of checks`
        return true
      }

      if (
        parsedPath &&
        parsedPath.fileName &&
        checks.includes(parsedPath.fileName)
      ) {
        reason = `File name ${parsedPath.fileName} is in the list of checks`
        return true
      }

      if (
        parsedPath &&
        parsedPath.extension &&
        checks.includes(parsedPath.extension)
      ) {
        reason = `Extension ${parsedPath.extension} is in the list of checks`
        return true
      }
    }
    const parsedFile = parseComplexExtensionFromFile(pathComponent, debug)
    if (
      parsedFile &&
      parsedFile.baseFileName &&
      checks.includes(parsedFile.baseFileName)
    ) {
      reason = `Base file name ${parsedFile.baseFileName} is in the list of checks`
      return true
    }

    if (
      parsedFile &&
      parsedFile.fileName &&
      checks.includes(parsedFile.fileName)
    ) {
      reason = `File name ${parsedFile.fileName} is in the list of checks`
      return true
    }

    if (
      parsedFile &&
      parsedFile.extension &&
      checks.includes(parsedFile.extension)
    ) {
      reason = `Extension ${parsedFile.extension} is in the list of checks`
      return true
    }

    if (
      parsedFile &&
      parsedFile.folderName &&
      checks.includes(parsedFile.folderName)
    ) {
      reason = `Folder name ${parsedFile.folderName} is in the list of checks`
      return true
    }

    reason = `No match found for ${pathComponent}`
    return false
  }

  for (const path of paths) {
    const pathParts = path.split('/')
    const parsedPath = parseComplexExtensionFromPath(path, debug)
    const extensions =
      parsedPath && parsedPath.extension ? [parsedPath.extension] : []

    for (const part of pathParts) {
      if (
        checkMatch(part) ||
        (extensions.length > 0 && checkMatch(extensions[0]))
      ) {
        hasPath = true
        break
      }
    }

    if (hasPath) {
      break
    }
  }

  if (debug) {
    logMessageForFunction('hasPathWith - final result', {
      hasPath,
      reason,
      listOfExtensionFilenameOrFolderToCheck
    })
  }

  return hasPath
}
