import { ColorNameOrValueFromTheme } from "./color.types";
import { FontProperty } from "./font-type.enum";
import { FontTypeWeightEnum, FontWeightType } from "./font-weight.enum";

/**
 * Attributes for specifying theme-based color styles in a component.
 */
export interface ThemeColorAttributes {
  borderColorFromTheme?: ColorNameOrValueFromTheme;
  backgroundColorFromTheme?: ColorNameOrValueFromTheme;
  boxShadowColorFromTheme?: ColorNameOrValueFromTheme;
  textDecorationColorFromTheme?: ColorNameOrValueFromTheme;
  colorFromTheme?: ColorNameOrValueFromTheme;
  textColorFromTheme?: ColorNameOrValueFromTheme;
  textColorNameOrValueFromTheme?: ColorNameOrValueFromTheme;
}

/**
 * Attributes for specifying theme-based font styles in a component.
 * maxFontSize is used to limit the font size for a component.
 */
export interface ThemeFontAttributes {
  fontType?: FontProperty;
  fontTypeWeight?: FontWeightType | FontTypeWeightEnum;
  highlight?: boolean;
  onDark?: boolean;
  focused?: boolean;
  maxFontSize?: number;

}

/**
 * Combines both theme color and font attributes.
 */
export interface ThematicStyleAttributes extends ThemeColorAttributes, ThemeFontAttributes {
  ghost?: boolean;
  destructive?: boolean;
  submitting?: boolean;
}

/**
 * Represents the basic style properties that can be applied to a component based on the theme.
 */
export interface ThematicStyleProps extends ThematicStyleAttributes {}

/**
 * Style properties related to layout and spacing for a container component.
 * ExpectedValueType is the type of value expected for the style property.
 * For example, a style property of type number would expect a number value.
 * A style property of type string would expect a string value.
 */
export interface LayoutStyleProperties<ExpectedValueType = number> extends ThemeColorAttributes {
  paddingLeft?: ExpectedValueType
  paddingRight?: ExpectedValueType
  marginTop?: ExpectedValueType
  marginBottom?: ExpectedValueType
  opacity?: ExpectedValueType
  flex?: ExpectedValueType
  width?: ExpectedValueType
  paddingTop?: ExpectedValueType
  marginLeft?: ExpectedValueType
  marginRight?: ExpectedValueType
  paddingBottom?: ExpectedValueType
  height?: ExpectedValueType
  maxWidth?: ExpectedValueType
  maxHeight?: ExpectedValueType
  minHeight?: ExpectedValueType
  margin?: ExpectedValueType
  borderWidth?: ExpectedValueType
}

export interface LayoutStyleProps<ExpectedValueType = number, StyleProps extends  LayoutStyleProperties<ExpectedValueType> = LayoutStyleProperties<ExpectedValueType>> extends  ThemeColorAttributes {
 
  // Plus the extended style props
  position?: "absolute" | "relative" | "fixed" | "sticky" | string;
  paddingLeft?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  paddingRight?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  marginTop?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  marginBottom?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  opacity?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  flex?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  width?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  paddingTop?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  marginLeft?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  marginRight?: ExpectedValueType | ((props: StyleProps) => ExpectedValueType)
  paddingBottom?: ExpectedValueType
  height?: ExpectedValueType
  maxWidth?: ExpectedValueType
  maxHeight?: ExpectedValueType
  minHeight?: ExpectedValueType
  margin?: ExpectedValueType
  borderWidth?: ExpectedValueType
  style?: StyleProps
}
/**
 * Extends the layout style properties with theming capabilities.
 */
export interface ThemedLayoutStyleProps<Theme, CSSPropertyTypes = number> extends LayoutStyleProps<CSSPropertyTypes>, ThematicStyleProps {
  theme: Theme;
}

/**
 * Comprehensive style properties derived from the theme and layout attributes.
 */
export interface ComprehensiveStyleProps<T, U> extends ThemedLayoutStyleProps<T, U> {}
