/* eslint-disable import/order */
import type { ComponentType, ReactNode } from 'react';
import { NativeTheme, ThemeBase, WebTheme } from './base-theme-types';



export interface FunctionProviderProps<T> {
  baseTheme: ThemeBase;
  children?: ReactNode | ReactNode[];
  ThemeProviderComponent?: ComponentType<{
    theme?: T;
    children?: ReactNode | ReactNode[];
  }>;
}

export type NativeFunctionProvider = FunctionProviderProps<NativeTheme>;
export type WebFunctionProvider = FunctionProviderProps<WebTheme>;