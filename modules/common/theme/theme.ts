import { MD3DarkTheme, MD2DarkTheme } from 'react-native-paper';

export const theme: typeof MD2DarkTheme = {
  ...MD2DarkTheme,
  colors: {
    ...MD2DarkTheme.colors,
    primary: 'lightskyblue',
  },
};
