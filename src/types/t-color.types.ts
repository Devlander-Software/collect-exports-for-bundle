/**
 * Represents color options.
 *
 * @typedef TColor
 * @type {'green' | 'red' | 'blue' | 'yellow'}
 */
export enum TColor {
  green = 'green',
  red = 'red',
  blue = 'blue',
  yellow = 'yellow',
  bold = 'bold',
  magenta = 'magenta'
}

export type TColorValue = keyof typeof TColor
