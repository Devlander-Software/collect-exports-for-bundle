/* eslint-disable no-undef */
import type { TColorValue } from '../../types/log-color.types';
import { TColor } from '../../types/log-color.types';
const { blue, green, red, yellow } = require('picocolors');

const logWithColor = (color: TColor | TColorValue, message: string) => {
  if (color === TColor.green) {
    console.log(green(message));
  } else if (color === TColor.red) {
    console.log(red(message));
  } else if (color === TColor.blue) {
    console.log(blue(message));
  } else if (color === TColor.yellow) {
    console.log(yellow(message));
  } else {
    console.log(message);
  }
};

export const logColoredMessage = (message: string, color: TColorValue) => {
  logWithColor(color, message);
};

export const logError = (message: string) => {
  logColoredMessage(message, TColor.red);
};

export const logMessageBasedOnCondition = (
  message: string,
  condition: boolean
) => {
  const color: TColor = condition ? TColor.green : TColor.red;
  logWithColor(color, message);
};
