export function getDuration(
  startTime: number,
  endTime: number = Date.now()
): string {
  if (startTime > endTime) {
    throw new Error('Start time must be before end time')
  }

  const durationMs = endTime - startTime
  const hours = Math.floor(durationMs / 3600000)
  const minutes = Math.floor((durationMs % 3600000) / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)
  const milliseconds = durationMs % 1000

  return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`
}
