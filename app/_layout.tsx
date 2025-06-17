import {
  createNavigationContainerRef,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationIndependentTree,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { PaperProvider, Surface, Text, useTheme } from 'react-native-paper';
import { useColorScheme, View } from 'react-native';

import { theme } from '@/modules/common/theme/theme';
import 'react-native-reanimated';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/modules/common/redux/store/store';
import {
  SafeAreaContext,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();
export const navigationRef = createNavigationContainerRef();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}
          >
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="light" />
            {/* </ThemeProvider> */}
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
