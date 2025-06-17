import { IconSymbol } from '@/modules/common/components/ui/IconSymbol';
import { TabBackground } from '@/modules/common/components/ui/TabBarBackground';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function AuthTabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveBackgroundColor: colors.background,
        tabBarBackground: TabBackground,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: colors.background,
            position: 'absolute',
          },
          default: {},
        }),
      }}
      safeAreaInsets={{ bottom: 0, top: 0 }}
    >
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Sign up',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
