import { ResultItem, Results } from '../types/module-exporter.types'

export enum ResultItemType {
  IncludedFolder = 'includedFolders',
  IncludedFile = 'includedFiles',
  ExcludedFolder = 'excludedFolders',
  ExcludedFile = 'excludedFiles',
  IncludedExport = 'includedExports',
  ExcludedExport = 'excludedExports'
}

export const pushToResults = (
  results: Results,
  itemType: ResultItemType,
  result: ResultItem
): Results => {
  const tempResults: Results = { ...results } // Clone to avoid direct mutation

  // Function to check if an item with the same name or path already exists
  const findExistingItem = (items: ResultItem[]): ResultItem | undefined => {
    return items.find((item) => item.nameOrPath === result.nameOrPath)
  }

  let existingItem: ResultItem | undefined
  const resultCategory: ResultItem[] = tempResults[itemType]

  switch (itemType) {
    case ResultItemType.IncludedFolder:
    case ResultItemType.IncludedFile:
    case ResultItemType.ExcludedFolder:
    case ResultItemType.ExcludedFile:
    case ResultItemType.IncludedExport:
    case ResultItemType.ExcludedExport:
      existingItem = findExistingItem(resultCategory)
      if (existingItem) {
        existingItem.reason.push(result.reason[0])
      } else {
        resultCategory.push(result)
      }
      break
    default:
      // Optional: handle the default case if necessary
      break
  }

  return tempResults
}
