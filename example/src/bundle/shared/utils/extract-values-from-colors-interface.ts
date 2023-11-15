import type { ColorsInterface } from '../types/color.types';

export function extractKeysAndValuesFromColorsInterface(
  colors: ColorsInterface
): [string[], string[]] {
  const keys = Object.keys(colors);
  const values = Object.values(colors);

  return [keys, values];
}
