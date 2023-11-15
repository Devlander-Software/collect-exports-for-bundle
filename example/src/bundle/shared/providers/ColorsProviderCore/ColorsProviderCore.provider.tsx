import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { darkColors } from '../../defaults/dark-colors.defaults';
import { defaultFonts } from '../../defaults/fonts.defaults';
import { lightColors } from '../../defaults/light-colors.defaults';
import type { NativeTheme, ThemeBase, WebTheme } from '../../types/base-theme-types';
import type { DeviceOnTheme } from '../../types/device-on-theme.type';
import type { FunctionProviderProps } from '../../types/function-provider.types';
import type { ThemeProviderOptions } from '../SharedThemeProviderCore/SharedThemeProviderCore.provider';

interface ColorsProviderCorePropsCore {
  children: React.ReactNode | React.ReactNode[];
  saveToStorage?: (key: string, value: boolean) => Promise<void>;
  getValueFromStorage?: (key: string) => Promise<boolean | undefined>;
  systemIsDark?: boolean;
  FunctionsProviderComponent?: React.ComponentType<FunctionProviderProps<WebTheme | NativeTheme>>;
  options?: ThemeProviderOptions;
}

interface ColorContextType {
  deviceOnTheme: DeviceOnTheme;
  setDeviceOnTheme: (value: DeviceOnTheme) => void;
  canToggleTheme: boolean;
  toggleLightDarkMode: () => void;
  setDarkThemeEnabled: (value: boolean) => void;
  darkThemeEnabled: boolean;
}

const DefaultColorsProviderCoreContext: ColorContextType = {
  darkThemeEnabled: false,
  canToggleTheme: false,
  setDarkThemeEnabled: () => {},
  toggleLightDarkMode: () => {},
  setDeviceOnTheme: () => {},
  deviceOnTheme: {
    screenWidth: 0,
    statusBarHeight: 0,
    screenHeight: 0,
    isTablet: false,
    hasNotch: false,
    hasDynamicIsland: false,
    platform: 'web',
  },
};

const ColorsProviderCoreContext = React.createContext<ColorContextType>(
  DefaultColorsProviderCoreContext
);

const ColorsProviderCore: React.FC<ColorsProviderCorePropsCore> = (props) => {
  const {
    children,
    saveToStorage,
    getValueFromStorage,
    systemIsDark = false,
    options = {},
    FunctionsProviderComponent,
  } = props;

  const {
    colorPreferences = { dark: darkColors, light: lightColors },
    fontPreferences = defaultFonts,
  } = options;

  const [deviceOnTheme, setDeviceOnTheme] = useState<DeviceOnTheme>(
    DefaultColorsProviderCoreContext.deviceOnTheme
  );
  const [darkThemeEnabled, setDarkThemeEnabled] =
    useState<boolean>(systemIsDark);

  const toggleLightDarkMode = useCallback(async () => {
    const newValue = !darkThemeEnabled;
    setDarkThemeEnabled(newValue);
    if (saveToStorage) await saveToStorage('darkThemeEnabled', newValue);
  }, [darkThemeEnabled, saveToStorage]);

  useEffect(() => {
    const initialize = async () => {
      const storedValue = await getValueFromStorage?.('darkThemeEnabled');
      setDarkThemeEnabled(storedValue ?? systemIsDark);
    };

    initialize();
  }, [getValueFromStorage, systemIsDark]);

  const colorsForTheme = useMemo(() => {
    return darkThemeEnabled
      ? { ...lightColors, ...colorPreferences.dark }
      : { ...lightColors, ...colorPreferences.light };
  }, [darkThemeEnabled, colorPreferences]);

  const fontsForTheme = useMemo(() => {
    return { ...defaultFonts, ...fontPreferences };
  }, [fontPreferences]);

  const baseThemeValue: ThemeBase = useMemo(
    () => ({
      darkThemeEnabled,
      deviceOnTheme,
      colors: colorsForTheme,
      fonts: fontsForTheme,
    }),
    [darkThemeEnabled, deviceOnTheme, colorsForTheme, fontsForTheme]
  );

  const valueForContext: ColorContextType = useMemo(
    () => ({
      darkThemeEnabled,
      canToggleTheme: Boolean(saveToStorage && getValueFromStorage),
      setDarkThemeEnabled,
      toggleLightDarkMode,
      deviceOnTheme,
      setDeviceOnTheme,
    }),
    [
      darkThemeEnabled,
      deviceOnTheme,
      saveToStorage,
      getValueFromStorage,
      toggleLightDarkMode,
    ]
  );

  return (
    <ColorsProviderCoreContext.Provider value={valueForContext}>
      {FunctionsProviderComponent ? (
        <FunctionsProviderComponent baseTheme={baseThemeValue}>
          {children}
        </FunctionsProviderComponent>
      ) : (
        <>{children}</>
      )}
    </ColorsProviderCoreContext.Provider>
  );
};

const useColorsContext = (): ColorContextType => {
  const context = useContext(ColorsProviderCoreContext);
  if (!context)
    throw new Error(
      'useColorsContext must be used within a ColorsProviderCore.'
    );
  return context;
};

export {
  ColorsProviderCore,
  ColorsProviderCoreContext,
  DefaultColorsProviderCoreContext,
  useColorsContext
};
export default ColorsProviderCore;
