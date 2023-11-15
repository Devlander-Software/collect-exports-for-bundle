import type { ReactNode } from 'react';
export interface OnVisibilityChangeProps {
  onVisibilityChange: (visible: boolean) => void;
  parentVisible?: boolean;
  children?: ReactNode;
  loading?: boolean;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  error?: boolean;
}
