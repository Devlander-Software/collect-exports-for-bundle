import * as fs from 'fs'
import path from 'path'
import { ModuleExportOptions } from '../types/types'
import { logColoredMessage } from './log-with-color'
const readDirectory = (directoryPath: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err)
        return // ensure that the function ends here in case of an error
      }
      resolve(files)
    })
  })

function directoryExists(directoryPath: string) {
  // Check if the path exists
  if (fs.existsSync(directoryPath)) {
    // Check if the path points to a directory
    return fs.statSync(directoryPath).isDirectory()
  }
  return false
}

async function checkDirectory(directoryPath: string): Promise<true | false> {
  try {
    const files = await readDirectory(directoryPath)
    if (files.length > 0) {
      return true
    } else {
      return false
    }
  } catch (err: any) {
    logColoredMessage(
      `An error occurred while reading directory: ${err.message}`,
      'red'
    )
    return false
  }
}

export function collectPaths(
  startPath: string,
  config: ModuleExportOptions
): string[] {
  let paths: string[] = []

  const hasFilesInDirectory = checkDirectory(startPath)
  console.log(`hasFilesInDirectory: ${hasFilesInDirectory}`)
  // Check if starting directory exists
  if (directoryExists(startPath)) {
    console.error('Directory does not exist:', startPath)
    return paths
  }

  const files = fs.readdirSync(startPath)

  for (const file of files) {
    const filename = path.join(startPath, file)
    const stat = fs.lstatSync(filename)

    if (stat.isDirectory()) {
      // Skip if the directory is in the excludeFolders list
      if (config.excludedFolders && config.excludedFolders.includes(file)) {
        console.log(`Excluding folder: ${file}`)
        continue
      }
      // Recursively collect paths from subdirectories
      paths = paths.concat(collectPaths(filename, config))
    } else {
      // Skip 'index.ts' or 'index.tsx' files
      if (['index.ts', 'index.tsx'].includes(file)) {
        console.log(`Excluding index file: ${file}`)
        continue
      }
      // Check against specific files if any
      if (
        config.specificFiles &&
        config.specificFiles.length &&
        !config.specificFiles.includes(file)
      ) {
        console.log(`Excluding non-specified file: ${file}`)
        continue
      }
      // Add the file if it passes all conditions
      paths.push(filename)
    }
  }

  // Log the collected paths for verification
  console.log(`Collected paths:`, paths)
  return paths
}
