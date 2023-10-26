import { blue, green, red, yellow } from 'picocolors'
import { TColor } from '../types/types'

const logWithColor = (color: TColor, message: string) => {
  switch (color) {
    case 'green':
      console.log(green(message))
      break
    case 'red':
      console.log(red(message))
      break
    case 'blue':
      console.log(blue(message))
      break
    case 'yellow':
      console.log(yellow(message))
      break
    default:
      console.log(message)
  }
}

export const logColoredMessage = (message: string, color: TColor) => {
  logWithColor(color, message)
}

export const logMessageBasedOnCondition = (
  message: string,
  condition: boolean
) => {
  const color = condition ? 'green' : 'red'
  logWithColor(color, message)
}
