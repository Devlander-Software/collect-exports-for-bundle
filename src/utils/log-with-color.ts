import { blue, green, magenta, red, yellow } from 'picocolors'
import { TColor, TColorValue } from '../types/t-color.types'

const logWithColor = (color: TColor | TColorValue, message: string): void => {
  if (color === TColor.green) {
    console.log(green(message))
  } else if (color === TColor.red) {
    console.log(red(message))
  } else if (color === TColor.blue) {
    console.log(blue(message))
  } else if (color === TColor.magenta) {
    console.log(magenta(message))
  } else if (color === TColor.yellow) {
    console.log(yellow(message))
  } else {
    console.log(message)
  }
}

export const logColoredMessage = (
  message: string,
  color: TColorValue
): void => {
  logWithColor(color, message)
}

export const logMessageBasedOnCondition = (
  message: string,
  condition: boolean
): void => {
  const color: TColor = condition ? TColor.green : TColor.red
  logWithColor(color, message)
}

export const logFailedMessage = (
  functionName: string,
  error: string | object | any
): void => {
  if (typeof error !== 'string') {
    error = error.toString()
  }
  logColoredMessage(`Failed at: ${functionName}: ${error}`, TColor.red)
}
