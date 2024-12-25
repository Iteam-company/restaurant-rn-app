import Wrapper from '@/modules/common/components/Wrapper';
import RestaurantsComponent from '@/modules/restaurant/components/Restaurants/Restaurants';
import { useRouter } from 'expo-router';
import { FAB } from 'react-native-paper';

export default function Restaurants() {
  const router = useRouter();

  return (
    <Wrapper centered>
      <RestaurantsComponent />
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => router.push('/restaurant/create')}
      />
    </Wrapper>
  );
}
