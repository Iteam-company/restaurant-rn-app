import OfflineScreen from "@/components/OfflineScreen";
import ToastInit from "@/components/Toast/ToastInit";
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
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "@/lib/theme";

import "../global.css";
import { useColorScheme } from "react-native";
import { UserValidationProvider } from "@/lib/hook/useValidateUser.tsx";
import { AuthTokenProvider } from "@/hooks/useAuthToken";
import { useIsOnline } from "@/hooks/useIsOnline";

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
      <AuthTokenProvider>
        <SafeAreaProvider>
          <ThemeProvider value={NAV_THEME[colorScheme || "light"]}>
            <UserValidationProvider>
              <NetworkGate />
              <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
              <PortalHost />
              <ToastInit />
            </UserValidationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthTokenProvider>
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
