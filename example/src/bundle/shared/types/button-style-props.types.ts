import { ColorNameOrValueFromTheme } from './color.types';

export interface ButtonStyleProps<ValueType = number> {
  paddingLeft?: ValueType;
  paddingRight?: ValueType;
  marginTop?: ValueType;
  marginBottom?: ValueType;
  height?: ValueType | string;
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  borderRadius?: ValueType;
  flex?: ValueType;
  width?: ValueType;
  maxWidth?: ValueType;
  alignSelf?: 'center' | 'flex-start' | 'flex-end';
  flexShrink?: ValueType;
  marginLeft?: ValueType;
  marginRight?: ValueType;
  paddingTop?: ValueType;
  padding?: ValueType;
  borderBottomWidth?: ValueType | string;
  paddingBottom?: ValueType | string;
  backgroundColorFromTheme?: ColorNameOrValueFromTheme;
}

export interface ButtonStylePropsWithThemeGeneric<
  Theme,
  CSSPropertyTypes = number,
> extends ButtonStyleProps<CSSPropertyTypes> {
  theme: Theme;
}

export interface ButtonStyleFromProps<T, U>
  extends ButtonStylePropsWithThemeGeneric<T, U> {}
