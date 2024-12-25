import React, { useEffect } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

const RestaurantList = () => {
  useEffect(() => {
    console.log('get restaurants');
  }, []);

  return (
    <View>
      <Text>Restaurants</Text>
    </View>
  );
};

export default RestaurantList;
