export interface ButtonAppearanceProps {
  color: string
  backgroundColor: string
  // Add more properties as needed
}

export interface ImageAppearanceProps {
  width: number
  height: number
  // Add more properties as needed
}

export interface OverallStyleProps {
  margin: string
  padding: string
  // Add more properties as needed
}

export interface ThemedTextStyleProps {
  fontSize: string
  fontWeight: string
  // Add more properties as needed
}

export interface DimensionProps {
  width: string
  height: string
  // Add more properties as needed
}

export interface ColorThemeProps {
  primary: string
  secondary: string
  // Add more properties as needed
}

export interface DeviceThemeProps {
  mobile: boolean
  desktop: boolean
  // Add more properties as needed
}

export interface ElevationProps {
  shadow: string
  depth: number
  // Add more properties as needed
}

export interface FontSizeProps {
  small: string
  medium: string
  large: string
  // Add more properties as needed
}

export interface TextWeightProps {
  normal: number
  bold: number
  // Add more properties as needed
}

export interface TypographyProps {
  fontFamily: string
  lineHeight: string
  // Add more properties as needed
}

export interface ColorTransform {
  lighten: (color: string, percentage: number) => string
  darken: (color: string, percentage: number) => string
  // Add more methods as needed
}

export interface FontSizeBounds {
  minSize: string
  maxSize: string
  // Add more properties as needed
}

export interface TypographyThemeProcessor<T> {
  (textFont: TypographyProps, textWeight: TextWeightProps, theme: T): string
}

export interface PaletteThemeProcessor<T> {
  (paletteColor: ColorThemeProps, opacity: number, theme: T): string
}

export interface PropsValueMapper<T, Value = string> {
  (props: T): Value
}

export interface ThemePropsValueMapper<
  ThemeProps,
  AdditionalProps = { [key: string]: string },
  OutputValue = string
> {
  (props: ThemeProps & AdditionalProps): OutputValue
}

export interface InvisibleStyleFactory<T> {
  (
    invisible: boolean,
    theme: T,
    primaryColor: string,
    secondaryColor: string
  ): string
}

export interface PaddingThemeProps {
  top: number
  bottom: number
  left: number
  right: number
}

export interface ShadowStyleFactory {
  (size: string, color: string): string
}

export type ThemedTypographyProcessor<T> = TypographyThemeProcessor<T>
export type ImageStyleFactory<T, InputType = number> = ThemePropsValueMapper<
  T,
  ImageAppearanceProps,
  string
>
export type ButtonStyleFactory<T, InputType = number> = ThemePropsValueMapper<
  T,
  ButtonAppearanceProps,
  string
>
export type TextStyleFactory<T, InputType = number> = ThemePropsValueMapper<
  T,
  ThemedTextStyleProps,
  string
>
export type LayoutStyleFactory<T, InputType = number> = ThemePropsValueMapper<
  T,
  OverallStyleProps,
  string
>

export interface BasicThemeFunctions<T, ExpectedNumOrString> {
  // Define additional theme functions and their signatures
}

export interface CoreTheme {
  primaryColor: string
  secondaryColor: string
  // Define additional core theme properties
}

export interface UnifiedTheme<ExpectedNumOrString>
  extends CoreTheme,
    BasicThemeFunctions<
      UnifiedTheme<ExpectedNumOrString>,
      ExpectedNumOrString
    > {
  // Extend with additional properties and methods if needed
}

export type MobileAppUnifiedTheme = UnifiedTheme<number>
export type WebAppUnifiedTheme = UnifiedTheme<string | number>
