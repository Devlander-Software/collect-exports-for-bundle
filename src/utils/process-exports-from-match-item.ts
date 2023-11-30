import { FuncItem, MatchItem } from '../export-related/create-export-matches'
import { extractDefaultExportVariable } from '../export-related/extract-default-export'
import { AutoExporterOptions } from '../types/module-exporter.types'

interface PartialConfig extends Partial<AutoExporterOptions> {
  primaryExportFile?: string | undefined
  debug?: boolean
  rootDir?: string
}
interface ProcessExportsFromMatchItemParams {
  matchItem: MatchItem
  withoutExtension: string
  fileContent: string
  config: PartialConfig
}

export function processExportsFromMatchItem(
  params: ProcessExportsFromMatchItemParams
): string[] {
  const { matchItem, withoutExtension, fileContent } = params
  const results: string[] = []

  if (matchItem) {
    matchItem.functionNames?.forEach((funcItem) => {
      if (funcItem.exportType === 'named') {
        results.push(`export { ${funcItem.name} } from '${withoutExtension}';`)
      } else if (funcItem.exportType === 'default') {
        const defaultExportName = extractDefaultExportVariable(fileContent)
        if (defaultExportName === funcItem.name) {
          results.push(
            `import ${defaultExportName} from '${withoutExtension}';`
          )
          results.push(`export default ${defaultExportName};`)
        }
      }
    })

    matchItem.functionTypes?.forEach((typeItem: FuncItem) => {
      results.push(
        `export type { ${typeItem.name} } from '${withoutExtension}';`
      )
    })
  }

  return results
}
