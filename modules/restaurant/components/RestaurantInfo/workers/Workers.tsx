import Wrapper from "@/modules/common/components/Wrapper";
import useDebounce from "@/modules/common/hooks/useDebounce";
import { navigateToCreateUser } from "@/modules/common/utils/flowNavigation";
import Feather from "@expo/vector-icons/Feather";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  FAB,
  List,
  Searchbar,
  Title,
  useTheme,
} from "react-native-paper";

import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSearchUsersQuery } from "@/lib/redux/slices/user-api";

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
    <Wrapper>
      <Searchbar
        placeholder="Search"
        style={{ marginTop: 10 }}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <ScrollView style={[styles.scrollView]}>
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
                      pathname:
                        "/admin-dashboard/(tabs)/restaurants/[id]/(workers)/worker/[workerId]",
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
                <Title>We don&apos;t have workers now 💔</Title>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, getFabUiSettings(insets)]}
        onPress={() => {
          navigateToCreateUser(restaurantId);
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
