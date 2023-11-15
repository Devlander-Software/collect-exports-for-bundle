import { AutoCapitalizeEnum } from './auto-capatlize.enum';
import { KeyBoardTypeEnum } from './keyboard-type.enum';
import type { BaseTextInputProps } from './base-input-props.types';
import type { IconNames } from './icons/icon-names.enum';

export interface SecureInputProps<
  ContainerStyleProps = {},
  OnChangeText = (text: string) => void,
  OnSubmitEditing = (e: any) => void,
  KeyboardType = KeyBoardTypeEnum,
  AutoCapitalize = AutoCapitalizeEnum,
> extends BaseTextInputProps<
    ContainerStyleProps,
    OnChangeText,
    OnSubmitEditing,
    KeyboardType,
    AutoCapitalize
  > {
  secureTextOnIcon?: IconNames;
  secureTextOffIcon?: IconNames;
  securePressOnChange: () => void;
}
