import { View, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { useTheme } from 'react-native-paper';

export default function FormWrapper({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  return (
    <View style={{ ...styles.container, backgroundImage: colors.primary }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 15,
    borderRadius: 20,
  },
});
