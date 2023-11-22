import * as fs from 'fs'
import * as ts from 'typescript'
import { BundleExportAsFunctionParams } from '../features/bundle-export-as-function'
import { collectPathsFromDirectories } from '../features/collect-paths/collect-paths-from-directories'
import {
  logColoredMessage,
  logMessageBasedOnCondition
} from '../utils/log-with-color'

interface FunItem {
  functionName: string
  functionType: string
}

interface DiscoverFunctionTypes {
  (config: BundleExportAsFunctionParams): Promise<FunItem[] | undefined>
}

export const discoverFunctionTypes: DiscoverFunctionTypes = async (
  config: BundleExportAsFunctionParams
): Promise<FunItem[] | undefined> => {
  try {
    const items: FunItem[] = []
    if (config.debug === true) {
      logColoredMessage(`Starting to discover function types...`, 'green')
    }
    // Moved inside discoverFunctionTypes to make it a single function
    const filePaths = await collectPathsFromDirectories(
      config.rootDir,
      config,
      'Discovering function types...'
    )

    const program = ts.createProgram(filePaths, {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS
    })

    filePaths.forEach((file) => {
      logMessageBasedOnCondition(
        `Discovering function types from ${file}`,
        config.debug
      )
      const fileToTarget = fs.readFileSync(file).toString()
      if (config.debug) {
        logColoredMessage(`file: ${fileToTarget}`, 'yellow')
      }
      const sourceFile = ts.createSourceFile(
        file,
        fs.readFileSync(file).toString(),
        ts.ScriptTarget.Latest,
        true // set parent pointers in nodes, necessary for navigating up the tree
      )

      const checker = program.getTypeChecker()

      ts.forEachChild(sourceFile, (node: any) => {
        // console.log('node', node)
        if (ts.isFunctionDeclaration(node) && node.name && node.type) {
          const functionName = node.name.text
          const signature = checker.getSignatureFromDeclaration(node)
          const functionType = signature
            ? checker.signatureToString(signature)
            : ''

          items.push({ functionName, functionType })
        }
      })
    })

    return items
  } catch (error: any) {
    const message = `Error discovering function types: ${error.toString()}`
    logColoredMessage(message, 'red')
  }
}
