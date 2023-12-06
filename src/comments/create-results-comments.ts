import { ResultItem, Results } from '../types/module-exporter.types'

interface ResultCommentParams extends Partial<Results> {
  includedFolders?: ResultItem[]
  includedFiles?: ResultItem[]
  excludedFolders?: ResultItem[]
  excludedFiles?: ResultItem[]
  includedExports?: ResultItem[]
  excludedExports?: ResultItem[]
}

export const createResultsComments = (
  parameters?: ResultCommentParams
): string => {
  // Define a helper function to format results
  const formatResults = (
    results: ResultItem[] | undefined,
    title: string
  ): string => {
    if (!results || results.length === 0) {
      return `\n\n`
    }
    return (
      `// ${title}\n` +
      results
        .map(
          ({ nameOrPath, reason }) =>
            `//     Name or Path: \n//     ${nameOrPath}\n\n//     Reasons:\n${reason
              .map((r) => `//       - ${r}`)
              .join('\n')}\n`
        )
        .join('\n') +
      '\n'
    )
  }

  // Use the helper function for each category, providing default empty arrays for undefined values
  const includedFolders = formatResults(
    parameters?.includedFolders || [],
    'INCLUDED FOLDERS'
  )
  const includedFiles = formatResults(
    parameters?.includedFiles || [],
    'INCLUDED FILES'
  )
  const excludedFolders = formatResults(
    parameters?.excludedFolders || [],
    'EXCLUDED FOLDERS'
  )
  const excludedFiles = formatResults(
    parameters?.excludedFiles || [],
    'EXCLUDED FILES'
  )
  const includedExports = formatResults(
    parameters?.includedExports || [],
    'INCLUDED EXPORTS'
  )
  const excludedExports = formatResults(
    parameters?.excludedExports || [],
    'EXCLUDED EXPORTS'
  )

  // Concatenate all formatted results
  return [
    includedFolders,
    includedFiles,
    excludedFolders,
    excludedFiles,
    includedExports,
    excludedExports
  ]
    .join('')
    .trim()
}
