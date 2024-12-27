import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, List, Title, FAB, Searchbar } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import Feather from "@expo/vector-icons/Feather";
import {
  useRemoveWorkerMutation,
} from "@/modules/restaurant/redux/slices/restaurant-api";
import useDebounce from "@/modules/common/hooks/useDebounce";
import { useSearchUsersQuery } from "@/modules/common/redux/slices/user-api";

const Workers = () => {
  const { id: restaurantId } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  // const { data, isLoading } = useGetRestaurantQuery(restaurantId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data: findedUsers } = useSearchUsersQuery({
    search: debouncedSearchTerm,
    restaurantId,
  });
  const [deleteWorker] = useRemoveWorkerMutation();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <Wrapper>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {findedUsers?.map((el) => (
              <List.Item
                key={el.id}
                title={el.firstName}
                description={el.email}
                onPress={() => {
                  router.push({
                    pathname:
                      "/restaurant/[id]/(workers)/worker/[workerId]",
                    params: { id: restaurantId, workerId: el.id },
                  });
                }}
                left={(props) => (
                  <Feather
                    {...props}
                    name="user"
                    size={24}
                    color={colors.primary}
                  />
                )}
              />
            ))}
            {!findedUsers?.length && (
              <Title>We don`t have workers now 💔</Title>
            )}
          </View>
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            router.push({
              pathname: "/restaurant/[id]/(workers)/addWorker",
              params: { id: restaurantId },
            });
          }}
        />
      </View>
    </Wrapper>
  );
};

export default Workers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width: "100%",
    paddingBottom: 80, // Додаємо відступ знизу, щоб контент не ховався за FAB
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
