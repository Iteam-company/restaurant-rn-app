import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import Wrapper from '@/modules/common/components/Wrapper';

export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToAuth = useCallback(() => {
    navigation.reset({
      index: 0,
      //   @ts-ignore
      routes: [{ name: 'auth/(tabs)' }],
    });
  }, [navigation]);

  useEffect(() => {
    navigateToAuth();
  }, []);

  return (
    <Wrapper centered>
      <ActivityIndicator animating />
    </Wrapper>
  );
}
