import { View, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

export default function FormWrapper({ children }: PropsWithChildren) {
  return (
    <View style={{ ...styles.container}}>
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
