import { logColoredMessage } from './log-with-color'

/**
 * Simulate a custom progress bar.
 * @param {string} message - The message to display while progressing.
 * @param {number} total - The total number of steps.
 * @param {number} current - The current step.
 */
export const simulateProgressBar = (
  message: string,
  total: number,
  current: number
) => {
  const percentage = ((current / total) * 100).toFixed(2)
  const progressBar = `[${'='.repeat(current)}${' '.repeat(
    total - current
  )}] ${percentage}%`
  logColoredMessage(`${message} ${progressBar}`, 'blue')
}
