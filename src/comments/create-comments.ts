import { ResultItem, Results } from '../types/module-exporter.types'
import { createDurationComment } from './create-duration-comment'
import { createExtensionsComment } from './create-extensions-comment'
import { createResultsComments } from './create-results-comments'
import { createTitleComment } from './create-title-comment'

interface CommentParams extends Partial<Results> {
  startTime: number
  endTime: number
  allowedExtensions: string[]
  ignoredExtensions: string[]
  title: string
  description: string
  showResults?: boolean
  includedFolders?: ResultItem[]
  includedFiles?: ResultItem[]
  excludedFolders?: ResultItem[]
  excludedFiles?: ResultItem[]
  includedExports?: ResultItem[]
  excludedExports?: ResultItem[]
}

export const createComments = (params: CommentParams): string => {
  const comments = []

  const title = createTitleComment(params.title, params.description)
  comments.push(title)
  const duration = createDurationComment(params.startTime, params.endTime)
  comments.push(duration)

  const extensions = createExtensionsComment(
    params.allowedExtensions,
    params.ignoredExtensions
  )
  comments.push(extensions)
  const results = createResultsComments({
    includedFolders: params.includedFolders,
    includedFiles: params.includedFiles,
    excludedFolders: params.excludedFolders,
    excludedFiles: params.excludedFiles,
    includedExports: params.includedExports,
    excludedExports: params.excludedExports
  })
  if (params.showResults) {
    comments.push(results)
  }

  return comments.join('\n')
}
