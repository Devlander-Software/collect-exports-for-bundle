import {
  bgBlack,
  bgBlue,
  bgGreen,
  bgRed,
  blue,
  bold,
  green,
  magenta,
  red,
  white,
  yellow
} from 'picocolors'
import { TColor, TColorValue } from '../types/t-color.types'

/**
 * Logs a message with a specified color.
 *
 * @param color - The color to use for the message, either a predefined TColor or a TColorValue.
 * @param message - The message to log.
 */
const logWithColor = (color: TColor | TColorValue, message: string): void => {
  switch (color) {
    case TColor.green:
      console.log(green(message))
      break
    case TColor.red:
      console.log(red(message))
      break
    case TColor.blue:
      console.log(blue(message))
      break
    case TColor.magenta:
      console.log(magenta(message))
      break
    case TColor.yellow:
      console.log(yellow(message))
      break
    case TColor.bgBlue:
      console.log(bgBlue(white(bold(message))))
      break
    case TColor.bgGreen:
      console.log(bgGreen(white(bold(message))))
      break
    case TColor.bgRed:
      console.log(bgRed(white(bold(message))))
      break
    default:
      console.log(message)
  }
}

/**
 * Logs a message with a specified color.
 *
 * @param message - The message to log.
 * @param color - The color value to use for the message.
 */
export const logColoredMessage = (
  message: string,
  color: TColorValue
): void => {
  logWithColor(color, message)
}

/**
 * Logs a message based on a condition, using green for true and red for false.
 *
 * @param message - The message to log.
 * @param condition - The condition to determine the color of the message.
 */
export const logMessageBasedOnCondition = (
  message: string,
  condition: boolean
): void => {
  const color: TColor = condition ? TColor.green : TColor.red
  logWithColor(color, message)
}

/**
 * Logs a failure message, typically used in catch blocks.
 *
 * @param functionName - The name of the function where the error occurred.
 * @param error - The error message or object to log.
 */
export const logFailedMessage = (
  functionName: string,
  error: string | object | any
): void => {
  if (typeof error !== 'string') {
    error = error.toString()
  }
  logColoredMessage(`Failed @: ${functionName}: ${error}`, TColor.red)
}

/**
 * Logs a message about a function's execution with additional information about variables.
 *
 * @param functionName - The name of the function being logged.
 * @param message - The message to log.
 * @param variables - A key-value pair object containing variables to log with the message.
 */
export const logMessageForFunction = (
  functionName: string,
  variables: { [key: string]: any },
  message?: string,
  color?: TColorValue
): void => {
  if (!color) color = TColor.bgBlue

  logColoredMessage(
    `${bgBlack(white(bold(` @: ${functionName} `)))} ${
      message ? `${message} -- ` : ''
    }${JSON.stringify(variables)}`,
    color
  )
}
