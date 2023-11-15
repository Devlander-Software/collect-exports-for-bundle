
import { NativeTheme, WebTheme } from './base-theme-types';
import type { ColorsInterface } from './color.types';
import type { DeviceOnTheme } from './device-on-theme.type';
import type { FontsInterface } from './fonts.interface';

export interface ThemeConfig {
  colorPreferences?: Partial<ColorsInterface>;
  fontPreferences?: Partial<FontsInterface>;
  deviceOnTheme?: Partial<DeviceOnTheme>;
}

export interface CreateThemeFunc<T> {
  (config: ThemeConfig): T;
}

export type CreateThemeForNative = CreateThemeFunc<NativeTheme>;

export type CreateThemeForWeb = CreateThemeFunc<WebTheme>;