import OfflineScreen from "@/modules/common/components/Offline/OfflineScreen";
import ToastInit from "@/modules/common/components/Toast/ToastInit";
import { AuthTokenProvider } from "@/modules/common/hooks/useAuthToken";
import { useIsOnline } from "@/modules/common/hooks/useIsOnline";
import { store } from "@/modules/common/redux/store/store";
import { theme } from "@/modules/common/theme/theme";
import { createNavigationContainerRef } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
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
              <NetworkGate />
              <StatusBar style="light" />
              {/* </ThemeProvider> */}
              <ToastInit />
            </SafeAreaView>
          </SafeAreaProvider>
        </AuthTokenProvider>
      </PaperProvider>
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
