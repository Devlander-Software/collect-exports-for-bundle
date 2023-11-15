import type { ColorAdjuster } from '../utils/adjust-color';
import type { FontSizeCap } from '../utils/cap-font-size';
import type { ButtonStyleFromProps } from './button-style-props.types';
import type { ColorNameOrValueFromTheme, ColorsInterface } from './color.types';
import type { DeviceOnTheme } from './device-on-theme.type';
import type { ElevationType } from './elevation.type';
import type { FontSizePropsHandler } from './font-size-handler.type';
import type { FontWeightType } from './font-weight.enum';
import type { FontType, FontsInterface } from './fonts.interface';
import type { ImageStyleFromProps } from './img-style-props';
import type { ComprehensiveStyleProps } from './style-attributes.interfaces';
import type { ResolvedThemedTextStylingProps } from './text-style.types';
import type { UnitPropsHandler } from './unit-props.types';

export interface FontThemeHandler<T> {
  (fontType: FontType, fontTypeWeight: FontWeightType, theme: T): string;
}

export interface ColorThemeHandler<T> {
  (color: ColorNameOrValueFromTheme, opacity: number, theme: T): string;
}

export interface PropsToValueMapper<T, Value = string> {
  (props: T): Value;
}

export interface ThemedPropsToValueMapper<
  ThemeProps,
  AdditionalProps = { [key: string]: string },
  OutputValue = string,
> {
  (props: ThemeProps & AdditionalProps): OutputValue;
}

export interface GhostStyleGenerator<T> {
  (
    ghost: boolean,
    disabled: boolean,
    theme: T,
    colorOne: ColorNameOrValueFromTheme,
    colorTwo: ColorNameOrValueFromTheme
  ): string;
}

export type PaddingOnThemeType = {
  paddingForScrollView: number;

  paddingForScrollViewTwo: number;
};

export interface BoxShadowHandler {
  (fontSize: string): string;
}

export type ThemedFontHandler<T> = FontThemeHandler<T>;
export type ImageStyleGenerator<
  T,
  InputType = number,
> = ThemedPropsToValueMapper<T, ImageStyleFromProps<T, InputType>, string>;
export type ButtonStyleGenerator<
  T,
  InputType = number,
> = ThemedPropsToValueMapper<T, ButtonStyleFromProps<T, InputType>, string>;
export type TextStyleGenerator<
  T,
  InputType = number,
> = ThemedPropsToValueMapper<
  T,
  ResolvedThemedTextStylingProps<T, InputType>,
  string
>;
export type LayoutStyleGenerator<
  T,
  InputType = number,
> = ThemedPropsToValueMapper<T, ComprehensiveStyleProps<T, InputType>, string>;

export interface BaseThemeFunctions<T, ExpectingNumOrString> {
  fontSizeCap: FontSizeCap;
  colorThemeHandler: ColorThemeHandler<T>;
  fontThemeHandler: FontThemeHandler<T>;
  fontSizePropsHandler: FontSizePropsHandler;
  imageStyleGenerator: ImageStyleGenerator<T, ExpectingNumOrString>;
  buttonStyleGenerator: ButtonStyleGenerator<T, ExpectingNumOrString>;
  ghostStyleGenerator: GhostStyleGenerator<T>;
  textStyleGenerator: TextStyleGenerator<T, ExpectingNumOrString>;
  boxShadowOne: BoxShadowHandler;
  boxShadowTwo?: BoxShadowHandler;
  boxShadowThree?: BoxShadowHandler;
  unitPropsHandler: UnitPropsHandler;
  layoutStyleGenerator: LayoutStyleGenerator<T, ExpectingNumOrString>;

  colorAdjuster: ColorAdjuster;
}

export interface ThemeBase {
  colors: ColorsInterface;
  fonts: FontsInterface;
  darkThemeEnabled?: boolean;
  padding?: PaddingOnThemeType;
  elevation?: ElevationType;
  deviceOnTheme: DeviceOnTheme;
}

export interface GenericTheme<ExpectingNumOrString>
  extends ThemeBase,
    BaseThemeFunctions<
      GenericTheme<ExpectingNumOrString>,
      ExpectingNumOrString
    > {}

export type NativeTheme = GenericTheme<number>;
export type WebTheme = GenericTheme<string | number>;
