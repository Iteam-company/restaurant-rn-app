import { IconSymbol } from '@/modules/common/components/ui/IconSymbol';
import TabBarBackground from '@/modules/common/components/ui/TabBarBackground';
import { authApi } from '@/modules/common/redux/slices/auth-api';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function AuthTabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <ApiProvider api={authApi}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="signin"
          options={{
            title: 'Sign In',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="signup"
          options={{
            title: 'Sign Up',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </ApiProvider>
  );
}
