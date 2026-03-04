/**
 * Parse eslint-style inline directives for excluding files and exports.
 * Supports:
 * - /** @collect-exports-exclude * / - exclude entire file
 * - // @collect-exports-exclude-next - exclude the next export only
 */

import * as fs from 'fs'

const FILE_EXCLUDE_PATTERN = /@collect-exports-exclude(?!-next)/

/**
 * Check if a file has the @collect-exports-exclude directive (excludes entire file).
 */
export function isFileExcludedByDirective(
  filePath: string,
  content?: string
): boolean {
  const source = content ?? readFileSafe(filePath)
  if (!source) return false

  const lines = source.split('\n')
  const headerEnd = findHeaderEnd(lines)

  for (let i = 0; i < headerEnd; i++) {
    if (FILE_EXCLUDE_PATTERN.test(lines[i])) {
      return true
    }
  }
  return false
}

/**
 * Get the 0-based line numbers of exports that should be excluded due to @collect-exports-exclude-next.
 * Returns a Set of line numbers (1-based in terms of "next line after the comment").
 */
export function getExcludeNextLineNumbers(
  filePath: string,
  content?: string
): Set<number> {
  const source = content ?? readFileSafe(filePath)
  if (!source) return new Set()

  const lines = source.split('\n')
  const excluded = new Set<number>()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/@collect-exports-exclude-next/.test(line)) {
      const nextLine = i + 1
      if (nextLine < lines.length) {
        excluded.add(nextLine)
      }
    }
  }

  return excluded
}

/**
 * Check if an export at the given line (1-based) should be excluded by @collect-exports-exclude-next.
 */
export function isExportExcludedByDirective(
  filePath: string,
  exportLineNumber: number,
  content?: string
): boolean {
  const excludedLines = getExcludeNextLineNumbers(filePath, content)
  return excludedLines.has(exportLineNumber)
}

function findHeaderEnd(lines: string[]): number {
  let inBlockComment = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (inBlockComment) {
      if (trimmed.includes('*/')) return i + 1
      continue
    }

    if (trimmed.startsWith('/*')) {
      inBlockComment = true
      if (trimmed.includes('*/')) return i + 1
      continue
    }

    if (trimmed.startsWith('//')) continue
    if (trimmed === '') continue

    return i
  }
  return lines.length
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
