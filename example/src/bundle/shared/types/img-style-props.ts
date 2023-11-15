import { ColorNameOrValueFromTheme } from './color.types';

// do not include the theme in the interface
export interface ImageStyle<ValueType = number> {
  backgroundColorFromTheme: ColorNameOrValueFromTheme;
  maxWidth: ValueType;
  borderBottomRightRadius: ValueType;
  borderColorFromTheme: ColorNameOrValueFromTheme;
  borderTopRightRadius: ValueType;
  maxHeight: ValueType;
  height: ValueType;
  width: ValueType;
  borderRadius: ValueType;
  borderWidth: ValueType;
  borderBottomLeftRadius: ValueType;
  borderTopLeftRadius: ValueType;
}

export interface ImageStyleWithThemeGeneric<Theme, CSSPropertyTypes = number>
  extends ImageStyle<CSSPropertyTypes> {
  theme: Theme;
}

export interface ImageStyleFromProps<T, U>
  extends ImageStyleWithThemeGeneric<T, U> {}
