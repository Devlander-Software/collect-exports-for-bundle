import type { BaseTextInputProps } from '../types/base-input-props.types';
import type { IconNames } from '../types/icons/icon-names.enum';
import type { SecureInputProps } from '../types/secure-input-props';

export const formInputGroupDefaultProps: BaseTextInputProps<
  any,
  (e: any) => void,
  (e: any) => void,
  any,
  any
> = {
  label: 'Label',
  underlineColor: '#000',
  backgroundColor: 'transparent',

  editable: true,
  onChangeText: (e: string) => console.log(`this is onChangeText prop ${e}`),
  disabled: false,
  error: false,
  errorText: null,
  secureTextEntry: false,
  onSubmitEditing: (e) => console.log(`this is onSubmitEditing prop ${e}`),
};

export const secureInputDefaultProps: SecureInputProps = {
  securePressOnChange: () => console.log('this is secure'),
  secureTextOffIcon: 'eye-off-outline' as IconNames,
  secureTextOnIcon: 'eye-outline' as IconNames,
  ...formInputGroupDefaultProps,
};
