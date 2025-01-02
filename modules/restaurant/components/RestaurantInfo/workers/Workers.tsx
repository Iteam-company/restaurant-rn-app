import { router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  useTheme,
  List,
  Title,
  FAB,
  Searchbar,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import Feather from "@expo/vector-icons/Feather";
import { useRemoveWorkerMutation } from "@/modules/restaurant/redux/slices/restaurant-api";
import useDebounce from "@/modules/common/hooks/useDebounce";

import { useSearchUsersQuery } from "@/modules/common/redux/slices/user-api";

const Workers = () => {
  const { id: restaurantId } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data: findedUsers, isLoading } = useSearchUsersQuery({
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              {findedUsers?.map((el) => (
                <List.Item
                  key={el.id}
                  title={el.firstName}
                  description={el.email}
                  onPress={() => {
                    router.push({
                      pathname: "/restaurant/[id]/(workers)/worker/[workerId]",
                      params: { id: restaurantId, workerId: el.id },
                    });
                  }}
                  left={(props) =>
                    el.icon ? (
                      <Avatar.Image
                        {...props}
                        size={24}
                        source={{ uri: el.icon }}
                      />
                    ) : (
                      <Feather
                        {...props}
                        name="user"
                        size={24}
                        color={colors.primary}
                      />
                    )
                  }
                />
              ))}
              {!findedUsers?.length && !isLoading && (
                <Title>We don't have workers now 💔</Title>
              )}
            </View>
          </ScrollView>
        )}
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
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
