import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  useGetMenuItemsBySearchQuery,
  useGetMenuQuery,
} from "../../redux/slices/menu-api";
import { ScrollView } from "react-native";
import {
  ActivityIndicator,
  Searchbar,
  Title,
  useTheme,
} from "react-native-paper";
import { MenuItemCard } from "./components/MenuItemCard";
import useDebounce from "@/modules/common/hooks/useDebounce";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MenuDetails = () => {
  const { colors } = useTheme();
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const insets = useSafeAreaInsets();

  const { data, isLoading } = useGetMenuItemsBySearchQuery({
    menuId,
    search: debouncedSearchTerm,
  });
  // const { data, isLoading } = useGetMenuQuery(menuId);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <ScrollView
      style={Platform.select({
        ios: { marginBottom: insets.bottom * 2.5 - 10 },
        default: {},
      })}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
          {data?.map((el) => (
            <MenuItemCard
              key={el.id}
              id={el.id}
              ingredients={el.ingredients}
              name={el.name}
              price={el.price}
            />
          ))}
        </>
      )}
      {!data?.length && !isLoading && <Title>Not found any menu</Title>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    marginBottom: 15,
  },
});
