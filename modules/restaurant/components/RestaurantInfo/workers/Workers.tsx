import { router, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";

const Workers = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const insets = useSafeAreaInsets();

  const { data: findedUsers, isLoading } = useSearchUsersQuery({
    search: debouncedSearchTerm,
    restaurantId,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <Wrapper paddingOff>
      <Searchbar
        placeholder="Search"
        style={{ marginTop: 10 }}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <ScrollView
        style={[
          styles.scrollView,
          getScrollViewUiSettings(insets, { botttomOffset: 10 }),
        ]}
      >
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
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
          )}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, getFabUiSettings(insets)]}
        onPress={() => {
          router.push({
            pathname: "/restaurant/[id]/(workers)/addWorker",
            params: { id: restaurantId },
          });
        }}
      />
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
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
