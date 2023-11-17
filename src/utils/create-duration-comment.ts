import { getDuration } from './get-duration'

export function createDurationComment(
  startTime: number,
  endTime: number = Date.now()
): string {
  // Ensure start time is before end time
  if (startTime > endTime) {
    throw new Error('Start time must be before end time')
  }

  // Use getDuration to calculate and format the duration
  const formattedDuration = getDuration(startTime, endTime)

  // Format start and end times (optional)
  const formattedStartTime = new Date(startTime).toLocaleString()
  const formattedEndTime = new Date(endTime).toLocaleString()

  return `/**
   * Start Time: ${formattedStartTime}
   * End Time: ${formattedEndTime}
   * Duration: ${formattedDuration}
   */
  `
}
