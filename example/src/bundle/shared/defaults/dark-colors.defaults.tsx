import { generateColorsFrom } from '../setup/generate-colors-from';
import type {
  BackgroundColors,
  BrandColors,
  ColorsInterface,
  ElementColors,
  FeedbackColors,
  GrayScaleColors,
  InteractionColors,
} from '../types/color.types';
import { lightColors } from './light-colors.defaults';

export const defaultDarkGrayScaleColors: GrayScaleColors = generateColorsFrom(
  lightColors,
  'dark'
);

export const defaultDarkBrandColors: BrandColors = generateColorsFrom(
  lightColors,
  'dark'
);

export const defaultDarkBackgroundColors: BackgroundColors = generateColorsFrom(
  lightColors,
  'dark'
);

export const defaultDarkElementColors: ElementColors = generateColorsFrom(
  lightColors,
  'dark'
);

export const defaultDarkFeedbackColors: FeedbackColors = generateColorsFrom(
  lightColors,
  'dark'
);

export const defaultDarkInteractionColors: InteractionColors =
  generateColorsFrom(lightColors, 'dark');

export const darkColors: ColorsInterface = {
  ...defaultDarkBrandColors,
  ...defaultDarkBackgroundColors,
  ...defaultDarkElementColors,
  ...defaultDarkFeedbackColors,
  ...defaultDarkInteractionColors,
  ...defaultDarkGrayScaleColors,
};
