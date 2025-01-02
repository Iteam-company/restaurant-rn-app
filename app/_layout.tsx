import {
  createNavigationContainerRef,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';

import { theme } from '@/modules/common/theme/theme';
import 'react-native-reanimated';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/modules/common/redux/store/store';

SplashScreen.preventAutoHideAsync();
export const navigationRef = createNavigationContainerRef();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="auth/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="dashboard/(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="restaurant/create"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          {/* </ThemeProvider> */}
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}
