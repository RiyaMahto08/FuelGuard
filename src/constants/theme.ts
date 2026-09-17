import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  // Brand Colors
  primary: '#0B192C',        // Deep Industrial Navy
  primaryLight: '#1E3E62',   // Slate Navy
  brandBlue: '#1D4ED8',      // Rich Professional Blue
  brandBlueLight: '#EFF6FF', // Light Blue Surface
  brandBlueBorder: '#BFDBFE',
  
  // Accents & Statuses
  accentTeal: '#0D9488',     // High-tech Teal
  accentGreen: '#10B981',    // Compliance Success Green
  accentGreenDark: '#047857',
  accentGreenLight: '#ECFDF5',
  
  accentAmber: '#F59E0B',    // Pending / In-progress Amber
  accentAmberLight: '#FFFBEB',
  accentAmberDark: '#B45309',
  
  accentRed: '#EF4444',      // Non-compliant / Rejected Red
  accentRedLight: '#FEF2F2',
  
  accentPurple: '#6366F1',   // Inspection / Special
  accentPurpleLight: '#EEF2FF',

  // Surfaces & Backgrounds
  background: '#F8FAFC',     // Clean slate light background
  surface: '#FFFFFF',        // Pure White card surface
  surfaceMuted: '#F1F5F9',   // Light muted grey
  surfaceSubtle: '#F8FAFC',
  
  // Text Colors
  textPrimary: '#0F172A',    // Pitch slate text
  textSecondary: '#475569',  // Medium slate
  textMuted: '#94A3B8',      // Light muted text
  textInverse: '#FFFFFF',    // White text
  
  // Borders & Dividers
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  borderFocus: '#2563EB',

  // Light / Dark themes for backwards compatibility
  light: {
    text: '#0F172A',
    textSecondary: '#475569',
    background: '#F8FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EFF6FF',
    tint: '#1D4ED8',
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    background: '#0B192C',
    backgroundElement: '#152238',
    backgroundSelected: '#1E293B',
    tint: '#38BDF8',
  }
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display, system-ui)',
    serif: 'var(--font-serif, serif)',
    rounded: 'var(--font-rounded, normal)',
    mono: 'var(--font-mono, monospace)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0B192C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  glowGreen: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  glowBlue: {
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  }
} as const;
