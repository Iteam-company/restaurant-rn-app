import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

export default function HomeScreen() {
  const { navigate } = useNavigation();

  useEffect(() => {
    // @ts-ignore
    navigate('auth');
  }, []);

  return (
    <View>
      <ActivityIndicator animating />
    </View>
  );
}
