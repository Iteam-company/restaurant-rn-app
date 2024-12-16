import { MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Primary colors - rich slate blue
    primary: '#7C8EBF', // Muted slate blue
    primaryContainer: '#3D4B6E',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#E8EBF4',

    // Secondary colors - deep slate
    secondary: '#94A3B8',
    secondaryContainer: '#475569',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#F8FAFC',

    // Background colors - deep rich dark
    background: '#0F1117', // Very deep slate
    onBackground: '#E2E8F0',
    surface: '#1A1D25', // Rich dark
    onSurface: '#F8FAFC',
    surfaceVariant: '#252832',
    onSurfaceVariant: '#E2E8F0',
    surfaceDisabled: '#252832',

    // Error states - muted red
    error: '#E16D7A',
    errorContainer: '#8B3A44',
    onError: '#FFFFFF',
    onErrorContainer: '#FFE8EA',

    // UI elements
    outline: '#3A4150',
    outlineVariant: '#252832',
    backdrop: 'rgba(0, 0, 0, 0.4)',
    elevation: {
      level0: 'transparent',
      level1: '#1A1D25',
      level2: '#1F222B',
      level3: '#252832',
      level4: '#2A2E38',
      level5: '#303541',
    },

    // Status colors - all muted
    success: '#7FB69E',
    warning: '#D4B37C',
    info: '#7C8EBF',

    // Text colors
    text: '#F1F5F9',
    textDisabled: '#64748B',
    placeholder: '#94A3B8',

    // Additional UI colors
    card: '#1A1D25',
    notification: '#E16D7A',
    shadow: '#000000',
    inverseOnSurface: '#0F1117',
    inversePrimary: '#7C8EBF',
    inverseSurface: '#F1F5F9',
    border: '#252832',
  },
  roundness: 8,
  dark: true,
};
