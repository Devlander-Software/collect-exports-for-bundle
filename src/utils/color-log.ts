import { blue, green, red } from 'picocolors'
import { TColor } from '../types/types'

const colorSwitch = (color: TColor, message: string) => {
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
    default:
      console.log(message)
  }
}

export const colorLog = (message: string, color: TColor) => {
  return colorSwitch(color, message)
}
