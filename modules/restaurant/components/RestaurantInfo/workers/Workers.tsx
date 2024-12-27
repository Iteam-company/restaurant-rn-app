import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useTheme, List, Title, FAB, Searchbar } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import Feather from "@expo/vector-icons/Feather";
import {
  useGetRestaurantQuery,
  useRemoveWorkerMutation,
} from "@/modules/restaurant/redux/slices/restaurant-api";

const Workers = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading } = useGetRestaurantQuery(id as string);

  const [deleteWorker] = useRemoveWorkerMutation();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            {data && data?.workers.length > 0 ? (
              data?.workers.map((el) => (
                <List.Item
                  key={el.id}
                  title={el.firstName}
                  description={el.email}
                  left={(props) => (
                    <Feather
                      {...props}
                      name="user"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                  right={(props) => (
                    <Feather
                      {...props}
                      name="trash-2"
                      size={24}
                      color={colors.error}
                      onPress={() => {
                        deleteWorker({
                          restaurantId: el.id,
                          userId: parseInt(id as string),
                        });
                      }}
                    />
                  )}
                />
              ))
            ) : (
              <Title>We don`t have workers now :(</Title>
            )}
          </View>
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            router.push({
              pathname: "/restaurant/[id]/(workers)/addWorker",
              params: { id: id as string },
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
