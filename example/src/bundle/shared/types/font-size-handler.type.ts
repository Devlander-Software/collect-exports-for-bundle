export enum ResponsiveByPercentOrValue {
  Percent = 'percent',
  Value = 'value',
}

export type ResponsiveBy = 'percent' | 'value';

export interface FontSizePropsHandler {
  (
    fontSize?: string | number,
    maxFontSize?: string | number,
    standardScreenHeight?: string | number,
    responsiveBy?: ResponsiveByPercentOrValue | ResponsiveBy
  ): string;
}
