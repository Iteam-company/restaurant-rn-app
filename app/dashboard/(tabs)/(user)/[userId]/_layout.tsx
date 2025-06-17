import { Slot, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Appbar, useTheme } from 'react-native-paper';
import React from 'react';

export default function QuizLayout() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Appbar.Header
        statusBarHeight={0}
        style={{ backgroundColor: colors.background }}
      >
        <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
      </Appbar.Header>
      <Slot />
    </>
  );
}
