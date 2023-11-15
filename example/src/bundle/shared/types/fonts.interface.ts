import type { FontTypeWeight } from './font-weight.enum';

export interface FontsInterface {
  Font2: FontTypeWeight;
  CondensedFont: FontTypeWeight;
  Font1: FontTypeWeight;
  Font3: FontTypeWeight;
}

export type FontType = keyof FontsInterface;
