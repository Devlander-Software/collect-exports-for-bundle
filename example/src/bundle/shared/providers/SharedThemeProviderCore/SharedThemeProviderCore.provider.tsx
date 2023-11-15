import React from 'react';
import type { ColorsInterface } from '../../types/color.types';
import type { FontsInterface } from '../../types/fonts.interface';
import ColorsProviderCore from '../ColorsProviderCore';
export interface ThemeColorPreferences {
  dark?: ColorsInterface;
  light?: ColorsInterface;
}

export interface ThemeProviderOptions {
  colorPreferences?: ThemeColorPreferences;
  fontPreferences?: Partial<FontsInterface>;
  ThemeProviderComponent?: React.ComponentType<any>;
}

// if systemIsDark is true use dark theme by default
// if systemIsDark is false it will use  light theme by default
// saveToStorage and getValueFromStorage are optional, however if you want to use the toggleLightDarkMode function you must provide both
// saveToStorage is a function that will save a boolean value to storage
// if theme is defined, it will override the default theme
export interface ThemeProviderPropsShared {
  systemIsDark?: boolean; 
  getValueFromStorage?: (key: string) => Promise<boolean>;
  saveToStorage?: (key: string, value:  boolean) => Promise<void>;
  children: React.ReactNode | React.ReactNode[];
  options?: ThemeProviderOptions;
}

export const ThemeProvider: React.FC<ThemeProviderPropsShared> = (props) => {
  const {
    children,
    saveToStorage,
    systemIsDark,
    options,
    getValueFromStorage,
  } = props;

  return (
    <ColorsProviderCore
      saveToStorage={saveToStorage}
      getValueFromStorage={getValueFromStorage}
      systemIsDark={systemIsDark}
      options={options}
    >
      {children}
    </ColorsProviderCore>
  );
};
