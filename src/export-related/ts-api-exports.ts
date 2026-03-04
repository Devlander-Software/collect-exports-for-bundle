/**
 * Extract exports from TypeScript/JavaScript files using the TypeScript Compiler API.
 * Produces compilable, accurate export detection (unlike regex which can miss edge cases).
 */

import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'

export interface ExtractedExport {
  name: string
  isTypeOnly: boolean
  isDefault: boolean
}

export interface FileExports {
  named: ExtractedExport[]
  defaultExport?: string
}

/**
 * Extract all exports from a file using the TypeScript Compiler API.
 * Handles: export function, export const, export class, export enum,
 * export interface, export type, export { A, B }, export { type T },
 * export default.
 */
export function extractExportsWithTsApi(
  filePath: string,
  content?: string
): FileExports {
  const source = content ?? readFileSafe(filePath)
  if (!source) {
    return { named: [] }
  }

  const ext = path.extname(filePath).toLowerCase()
  const isJs = ['.js', '.jsx', '.mjs', '.cjs'].includes(ext)
  const scriptKind =
    ext === '.tsx' || ext === '.jsx'
      ? ts.ScriptKind.TSX
      : ext === '.ts' || ext === '.mts' || ext === '.cts'
      ? ts.ScriptKind.TS
      : isJs
      ? ts.ScriptKind.JS
      : ts.ScriptKind.TS

  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  )

  const result: FileExports = { named: [] }

  function visit(node: ts.Node): void {
    if (ts.isExportDeclaration(node)) {
      const clause = node.exportClause
      if (clause && ts.isNamedExports(clause)) {
        for (const elem of clause.elements) {
          const name = elem.propertyName
            ? (elem.propertyName as ts.Identifier).text
            : (elem.name as ts.Identifier).text
          const isTypeOnly = node.isTypeOnly || elem.isTypeOnly
          result.named.push({
            name: elem.propertyName ? (elem.name as ts.Identifier).text : name,
            isTypeOnly: !!isTypeOnly,
            isDefault: false
          })
        }
      }
      return
    }

    if (ts.isExportAssignment(node)) {
      if (node.isExportEquals) return
      const expr = node.expression
      if (ts.isIdentifier(expr)) {
        result.defaultExport = expr.text
      }
      return
    }

    if (ts.isExportSpecifier(node)) {
      return
    }

    if (
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const defaultMod = node.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.DefaultKeyword
      )
      const name = node.name?.getText(sourceFile) ?? 'default'
      if (defaultMod) {
        result.defaultExport = name
      } else {
        result.named.push({ name, isTypeOnly: false, isDefault: false })
      }
      return
    }

    if (
      ts.isClassDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const defaultMod = node.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.DefaultKeyword
      )
      const name = node.name?.getText(sourceFile) ?? 'default'
      if (defaultMod) {
        result.defaultExport = name
      } else {
        result.named.push({ name, isTypeOnly: false, isDefault: false })
      }
      return
    }

    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          result.named.push({
            name: decl.name.text,
            isTypeOnly: false,
            isDefault: false
          })
        }
      }
      return
    }

    if (
      ts.isInterfaceDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      result.named.push({
        name: node.name.text,
        isTypeOnly: true,
        isDefault: false
      })
      return
    }

    if (
      ts.isTypeAliasDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      result.named.push({
        name: node.name.text,
        isTypeOnly: true,
        isDefault: false
      })
      return
    }

    if (
      ts.isEnumDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      result.named.push({
        name: node.name.text,
        isTypeOnly: false,
        isDefault: false
      })
      return
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return result
}

function readFileSafe(filePath: string): string | undefined {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8')
    }
  } catch {
    // ignore
  }
  return undefined
}
