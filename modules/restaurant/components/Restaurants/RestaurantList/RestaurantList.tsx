import { useGetRestaurantsQuery } from "@/modules/restaurant/redux/slices/restaurant-api";
import React from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { router } from "expo-router";
import { RestaurantListItem } from "./components/RestaurantListItem";
import TabBarOffset from "@/modules/common/components/TabBarOffset";

const RestaurantList = () => {
  const { data, isLoading } = useGetRestaurantsQuery();

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
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Array.isArray(data) &&
          data?.map((restaurant) => (
            <RestaurantListItem
              id={restaurant.id}
              key={restaurant.id}
              address={restaurant.address}
              name={restaurant.name}
              workersCount={restaurant.workers.length}
              image={restaurant.image}
            />
          ))}
        <Button
          style={styles.addButton}
          onPress={() => router.push("/restaurant/create")}
        >
          Add new Restaurant
        </Button>
        <TabBarOffset />
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
    paddingBottom: 30,
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
  addButton: {
    paddingVertical: 5,
    borderRadius: 40,
    borderColor: "#3A4150",
    borderWidth: 1,
  },
});

export default RestaurantList;
