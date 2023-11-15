export type PlatformOSType =
  | 'ios'
  | 'android'
  | 'macos'
  | 'windows'
  | 'web'
  | 'native';
export type DeviceOnTheme = {
  screenWidth: number;
  statusBarHeight: number;
  screenHeight: number;
  isTablet: boolean;
  hasNotch: boolean;
  hasDynamicIsland: boolean;
  platform: PlatformOSType;
};
