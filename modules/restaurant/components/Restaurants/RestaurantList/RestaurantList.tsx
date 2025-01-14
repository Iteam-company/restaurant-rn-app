import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { useGetRestaurantsQuery } from "@/modules/restaurant/redux/slices/restaurant-api";
import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import { ScrollView } from "react-native";
import {
  ActivityIndicator,
  Divider,
  Menu,
  Text,
  useTheme,
} from "react-native-paper";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { RestaurantListItem } from "./components/RestaurantListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";

const RestaurantList = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError } = useGetRestaurantsQuery();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator animating={true} color={"#7c8ebf"} />
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <ScrollView
        style={getScrollViewUiSettings(insets, {
          isTopMargin: true,
          default: { marginTop: 30 },
        })}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {data?.map((restaurant) => (
          <RestaurantListItem
            id={restaurant.id}
            key={restaurant.id}
            address={restaurant.address}
            name={restaurant.name}
            workersCount={restaurant.workers.length}
            image={restaurant.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  scrollContent: {
    margin: 20,
  },
  card: {
    width: windowWidth - 40,
    marginBottom: 20,
    overflow: "hidden",
    borderRadius: 14,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderRadius: 14,
  },
  cardContent: {
    width: "100%",
    padding: 16,
  },
  address: {
    color: "#666",
    marginBottom: 16,
  },
  button: {
    alignSelf: "flex-start",
  },
  titleLeft: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    marginRight: 10,
  },
  titleRight: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    textAlign: "right",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  workersTitle: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    padding: 8,
  },
});

export default RestaurantList;
