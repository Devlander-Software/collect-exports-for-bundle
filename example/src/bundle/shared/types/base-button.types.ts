import type { ColorFromTheme, ColorNameOrValueFromTheme } from './color.types';
import { LayoutStyleProps } from './style-attributes.interfaces';

// BaseButtonProps now has two generics, one for the value type (like number) and one for the style props (which extends LayoutStyleProps<Value>)
export interface BaseButtonProps<Value = number, StyleProps extends LayoutStyleProps<Value> = LayoutStyleProps<Value>> {
  onPress?: () => void;
  text?: string;
  renderLeft?: () => React.ReactElement;
  renderRight?: () => React.ReactElement;
  isSelected?: boolean;
  // Plus the extended style props
  style?: StyleProps;
}

// GhostBaseButton extends BaseButtonProps with specific color properties and uses ViewStyle & LayoutStyleProps<Value>
export interface BaseGhostButtonProps<Value = number, StyleProps = {}> extends BaseButtonProps<Value, StyleProps & LayoutStyleProps<Value>> {
  textColorNameOrValueFromTheme: ColorFromTheme;
  backgroundColorFromTheme: ColorNameOrValueFromTheme;
  // Other properties specific to GhostBaseButton
}

