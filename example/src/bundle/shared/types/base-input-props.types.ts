export interface BaseTextInputProps<
  ContainerStyleProps,
  OnChangeText,
  OnSubmitEditing,
  KeyboardType,
  AutoCapitalize,
> {
  renderBottom?: () => JSX.Element | null;
  onChangeText: OnChangeText;
  secureTextEntry?: boolean;
  disabled?: boolean;
  errorText?: string | null | boolean | undefined;
  error?: boolean;
  containerStyleProps?: ContainerStyleProps;
  keyboardType?: KeyboardType;
  autoCapitalize?: AutoCapitalize;
  label?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  underlineColor?: string;
  onSubmitEditing?: OnSubmitEditing;
  editable?: boolean;
  backgroundColor?: string;
  submitting?: boolean;
}
