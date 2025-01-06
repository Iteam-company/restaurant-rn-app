import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useGetMenuQuery } from "../../redux/slices/menu-api";
import { ScrollView } from "react-native";
import { ActivityIndicator, Title, useTheme } from "react-native-paper";
import { MenuItemCard } from "./components/MenuItemCard";

export const MenuDetails = () => {
  const { colors } = useTheme();
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const { data, isLoading } = useGetMenuQuery(menuId);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        data?.menuItems.map((el) => (
          <MenuItemCard
            key={el.id}
            id={el.id}
            ingredients={el.ingredients}
            name={el.name}
            price={el.price}
          />
        ))
      )}
      {!data?.menuItems.length && !isLoading && (
        <Title>Not found any menu</Title>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
