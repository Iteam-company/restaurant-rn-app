import * as Network from "expo-network";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export function useIsOnline(pollIntervalMs: number = 5000) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const checkStatus = useCallback(async () => {
    try {
      const state = await Network.getNetworkStateAsync();
      const connected =
        Boolean(state.isConnected) && state.isInternetReachable !== false;
      setIsOnline(connected);
    } catch {
      setIsOnline(false);
    }
  }, []);

  const manualRefresh = useCallback(() => {
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    checkStatus();

    if (pollIntervalMs > 0) {
      intervalRef.current = setInterval(
        checkStatus,
        pollIntervalMs
      ) as unknown as NodeJS.Timeout;
    }

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        checkStatus();
      }
      appStateRef.current = nextState;
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      subscription.remove();
    };
  }, [checkStatus, pollIntervalMs]);

  return { isOnline, refresh: manualRefresh };
}
