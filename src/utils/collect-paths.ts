import * as fs from 'fs'
import path from 'path'
import { ModuleExportOptions } from '../types/types'

/**
 * Recursively collects paths of files from the specified directory.
 * If the `files` key in the config is not empty, only the files that match
 * the file names in the array will be collected.
 *
 * @param {string} startPath - The path to the directory from which files need to be collected.
 * @param {AutoExporterOptions} config - Configuration options which may include folders to exclude and specific files to include.
 * @returns {string[]} An array of paths for the files inside the `startPath` based on the provided configuration.
 *
 * @example
 *
 * const paths = collectPaths('./src', { excludeFolders: ['test'], files: ['file1.js', 'file2.js'] });
 * console.log(paths);  // ['/src/file1.js', '/src/file2.js']
 */
export function collectPaths(
  startPath: string,
  config: ModuleExportOptions
): string[] {
  let paths: string[] = []

  if (!fs.existsSync(startPath)) {
    console.log('Directory does not exist:', startPath)
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
      // Recursively collect paths for subdirectories
      paths = paths.concat(collectPaths(filename, config))
    } else {
      // Skip if the file is named 'index.ts' or 'index.tsx'
      if (['index.ts', 'index.tsx'].includes(file)) {
        console.log(`Excluding file: ${file}`)
        continue
      }
      // If the files array in config is not empty, only consider those files
      if (
        config.specificFiles &&
        config.specificFiles.length &&
        !config.specificFiles.includes(file)
      ) {
        continue
      }
      paths.push(filename)
    }
  }
  return paths
}
