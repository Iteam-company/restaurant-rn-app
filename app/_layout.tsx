import { createNavigationContainerRef } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import { AuthTokenProvider } from "@/modules/common/hooks/useAuthToken";
import { store } from "@/modules/common/redux/store/store";
import { theme } from "@/modules/common/theme/theme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();
export const navigationRef = createNavigationContainerRef();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
        <AuthTokenProvider>
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: theme.colors.background }}
            >
              <Stack screenOptions={{ headerShown: false }} />
              <StatusBar style="light" />
              {/* </ThemeProvider> */}
            </SafeAreaView>
          </SafeAreaProvider>
        </AuthTokenProvider>
      </PaperProvider>
    </Provider>
  );
}
