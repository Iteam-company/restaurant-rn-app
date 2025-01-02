import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import Wrapper from '@/modules/common/components/Wrapper';

export default function HomeScreen() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.push('/auth/signin');
    }, [router])
  );

  return (
    <Wrapper centered>
      <ActivityIndicator animating />
    </Wrapper>
  );
}
