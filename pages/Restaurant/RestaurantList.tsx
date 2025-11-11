import { navigateToCreateRestaurant } from "@/modules/common/utils/flowNavigation";
import { useGetRestaurantsQuery } from "@/lib/redux/slices/restaurant-api";
import { ActivityIndicator, FlatList } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { RestaurantListItem } from "./RestaurantListItem";

const RestaurantList = () => {
  const { data, isLoading, refetch, isFetching } = useGetRestaurantsQuery();

  return (
    <FlatList
      className="w-full"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-6"
      showsVerticalScrollIndicator={false}
      data={Array.isArray(data) ? data : []}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={() => refetch()}
      refreshing={isFetching}
      ListEmptyComponent={() =>
        isLoading && <ActivityIndicator color={"#7c8ebf"} />
      }
      renderItem={({ item }) => (
        <RestaurantListItem
          id={item.id}
          key={item.id}
          address={item.address}
          name={item.name}
          workersCount={item.workers.length}
          image={item.image}
        />
      )}
      ListFooterComponent={
        <>
          <Button onPress={() => navigateToCreateRestaurant()}>
            <Text>Add new Restaurant</Text>
          </Button>
        </>
      }
    />
  );
};

export default RestaurantList;
