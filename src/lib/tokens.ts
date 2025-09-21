export const ICON_SIZES = { 
  xs: 16, 
  sm: 20, 
  md: 24, 
  lg: 32, 
  xl: 40 
} as const;

export type IconSizeKey = keyof typeof ICON_SIZES;

// Icon size mappings for Tailwind classes
export const ICON_SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
} as const;
