/* eslint-disable simple-import-sort/imports */

import { extractKeysAndValuesFromColorsInterface } from './extract-values-from-colors-interface';
import type {
  ColorNameOrValueFromTheme,
  ColorsInterface,
} from '../types/color.types';

export enum ColorNameOrValueEnum {
  ColorName = 'colorName',
  ColorValue = 'colorValue',
}

interface PartialThemeForIsColorNameOrValue {
  colors: ColorsInterface;
  [key: string]: any;
}

interface IsColorNameOrValueParameters {
  (
    nameOrValue: ColorNameOrValueFromTheme,
    theme: PartialThemeForIsColorNameOrValue
  ): ColorNameOrValueEnum | false;
}

export const isColorNameOrValue: IsColorNameOrValueParameters = (
  nameOrValue: ColorNameOrValueFromTheme,
  theme: PartialThemeForIsColorNameOrValue
): ColorNameOrValueEnum | false => {
  const [keys, values] = extractKeysAndValuesFromColorsInterface(theme.colors);

  if (keys.includes(nameOrValue as string)) {
    return ColorNameOrValueEnum.ColorName;
  }

  if (values.includes(nameOrValue as string)) {
    return ColorNameOrValueEnum.ColorValue;
  }

  return false;
};
