import { useGetAllMenuQuery } from "../../redux/slices/menu-api";
import { MenuCard } from "./components/MenuCard";
import { Title, useTheme } from "react-native-paper";
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export const MenuList = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetAllMenuQuery(id);
  const { colors } = useTheme();
  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        data?.map((el) => (
          <MenuCard
            key={el.id}
            id={el.id}
            title={el.name}
            category={el.categories}
            season={el.season}
          />
        ))
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
});
