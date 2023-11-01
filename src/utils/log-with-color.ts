import { blue, green, red, yellow } from 'picocolors'
import { TColor, TColorValue } from '../types/t-color.types'

const logWithColor = (color: TColor | TColorValue, message: string) => {
  if (color === TColor.green) {
    console.log(green(message))
  } else if (color === TColor.red) {
    console.log(red(message))
  } else if (color === TColor.blue) {
    console.log(blue(message))
  } else if (color === TColor.yellow) {
    console.log(yellow(message))
  } else {
    console.log(message)
  }
}

export const logColoredMessage = (message: string, color: TColorValue) => {
  logWithColor(color, message)
}

export const logMessageBasedOnCondition = (
  message: string,
  condition: boolean
) => {
  const color: TColor = condition ? TColor.green : TColor.red
  logWithColor(color, message)
}
