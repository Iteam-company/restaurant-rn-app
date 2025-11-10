import OfflineScreen from "@/modules/common/components/Offline/OfflineScreen";
import ToastInit from "@/modules/common/components/Toast/ToastInit";
import { AuthTokenProvider } from "@/modules/common/hooks/useAuthToken";
import { useIsOnline } from "@/modules/common/hooks/useIsOnline";
import { store } from "@/lib/redux/store/store";
import {
  createNavigationContainerRef,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "@/lib/theme";

import "../global.css";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();
export const navigationRef = createNavigationContainerRef();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const colorScheme = useColorScheme();

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
      <ThemeProvider value={NAV_THEME[colorScheme || "light"]}>
        <AuthTokenProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <NetworkGate />
              <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
              <PortalHost />
              <ToastInit />
            </SafeAreaView>
          </SafeAreaProvider>
        </AuthTokenProvider>
      </ThemeProvider>
    </Provider>
  );
}

function NetworkGate() {
  const { isOnline, refresh } = useIsOnline(5000);
  if (!isOnline) {
    return <OfflineScreen onRetry={refresh} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
