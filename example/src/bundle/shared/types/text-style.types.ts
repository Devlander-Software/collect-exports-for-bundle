import { OpaqueColorValue } from 'react-native';
import { ColorNameOrValueFromTheme } from './color.types';
import { FontProperty } from './font-type.enum';
import { FontTypeWeightEnum, FontWeightType } from './font-weight.enum';
import {
  ThemeColorAttributes,
  ThemeFontAttributes,
} from './style-attributes.interfaces';

export interface SharedTextProperties {
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none' | undefined;
  onDark?: boolean;
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  fontType?: FontProperty;

  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}

// This interface encapsulates all text style related attributes.
export interface UITextStylingAttributes<ExpectedValueType>
  extends ThemeFontAttributes,
    ThemeColorAttributes,
    SharedTextProperties {
  numberOfLines?: ExpectedValueType;
  paddingLeft?: ExpectedValueType;
  highlight?: boolean;
  paddingTop?: ExpectedValueType;
  marginTop?: ExpectedValueType;
  marginBottom?: ExpectedValueType;
  marginLeft?: ExpectedValueType;
  marginRight?: ExpectedValueType;

  width?: ExpectedValueType;
  lineHeight?: ExpectedValueType;
  fontSize?: ExpectedValueType;
  opacity?: ExpectedValueType;
  destructive?: boolean;
  flex?: ExpectedValueType;
  shadowOpacity?: ExpectedValueType;
  shadowColor?: string | OpaqueColorValue;
  shadowOffsetX?: ExpectedValueType;
  shadowOffsetY?: ExpectedValueType;
  shadowRadius?: ExpectedValueType;
  paddingRight?: ExpectedValueType;

  textDecorationColorFromTheme?: ColorNameOrValueFromTheme;
  colorFromTheme?: ColorNameOrValueFromTheme;
  textColorFromTheme?: ColorNameOrValueFromTheme;
  textColorNameOrValueFromTheme?: ColorNameOrValueFromTheme;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none' | undefined;
  onDark?: boolean;
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  fontType?: FontProperty;

  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}

// Wrapper for text style properties, which can be used to pass styling via props.
export interface TextStylingPropsWrapper<
  ExpectedValueType = number,
  StyleProps extends
    UITextStylingAttributes<ExpectedValueType> = UITextStylingAttributes<ExpectedValueType>,
> {
  style?: StyleProps;
}

// This interface is meant for theming text styles, extending the basic text styling props.
export interface ThemedTextStylingProps<Theme, ExpectedValueType = number>
  extends TextStylingPropsWrapper<ExpectedValueType>,
    SharedTextProperties {
  theme: Theme;
  shadowColor?: string | OpaqueColorValue;

  numberOfLines?: ExpectedValueType;
  paddingLeft?: ExpectedValueType;
  highlight?: boolean;
  paddingTop?: ExpectedValueType;
  marginTop?: ExpectedValueType;
  marginBottom?: ExpectedValueType;
  marginLeft?: ExpectedValueType;
  marginRight?: ExpectedValueType;
  width?: ExpectedValueType;
  lineHeight?: ExpectedValueType;
  fontSize?: ExpectedValueType;
  opacity?: ExpectedValueType;
  destructive?: boolean;
  flex?: ExpectedValueType;
  shadowOpacity?: ExpectedValueType;
  shadowOffsetX?: ExpectedValueType;
  shadowOffsetY?: ExpectedValueType;

  shadowRadius?: ExpectedValueType;
  paddingRight?: ExpectedValueType;
  textDecorationColorFromTheme?: ColorNameOrValueFromTheme;
  colorFromTheme?: ColorNameOrValueFromTheme;
  textColorFromTheme?: ColorNameOrValueFromTheme;
  textColorNameOrValueFromTheme?: ColorNameOrValueFromTheme;

  fontTypeWeight?: FontWeightType | FontTypeWeightEnum;
  focused?: boolean;
  maxFontSize?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none' | undefined;
  onDark?: boolean;
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  fontType?: FontProperty;

  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}

// This interface could be used where you want to specifically refer to themed text styles within props.
// It is an explicit declaration that can be useful for distinguishing between simple and themed text styles.
export interface ResolvedThemedTextStylingProps<T, U>
  extends ThemedTextStylingProps<T, U>,
    SharedTextProperties {
  // You could add more specific properties here if needed.
  theme: T;
}
