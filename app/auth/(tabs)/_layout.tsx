import { HapticTab } from '@/modules/common/components/HapticTab';
import { IconSymbol } from '@/modules/common/components/ui/IconSymbol';
import TabBarBackground from '@/modules/common/components/ui/TabBarBackground';
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function AuthTabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
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
  );
}
