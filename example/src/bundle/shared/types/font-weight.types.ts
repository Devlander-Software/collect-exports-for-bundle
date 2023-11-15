export enum TextFontWeightTypesEnum {
  normal = 'normal',
  bold = 'bold',
  oneHundred = '100',
  twoHundred = '200',
  threeHundred = '300',
  fourHundred = '400',
  fiveHundred = '500',
  sixHundred = '600',
  sevenHundred = '700',
  eightHundred = '800',
  nineHundred = '900',
  light = 'light',
}

export const textFontWeightTypes = [
  ...Object.values(TextFontWeightTypesEnum),
  undefined,
];

export type TextFontWeightType = typeof textFontWeightTypes;
