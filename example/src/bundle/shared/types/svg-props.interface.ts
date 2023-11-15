import type { ColorNameOrValueEnum } from '../utils/is-color-name-or-value';

export interface SVGPropsInterface {
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  backgroundColorFromTheme?: ColorNameOrValueEnum;
}
