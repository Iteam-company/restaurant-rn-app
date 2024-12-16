import { View, StyleSheet, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { useTheme } from 'react-native-paper';

type WrapperProps = PropsWithChildren & {
  centered?: boolean;
};

export default function Wrapper({ children, centered = false }: WrapperProps) {
  const { colors } = useTheme();

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(centered && styles.centered),
    backgroundColor: colors.background,
  };

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
