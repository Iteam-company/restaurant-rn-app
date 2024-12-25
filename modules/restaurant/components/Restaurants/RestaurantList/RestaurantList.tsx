import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { useGetRestaurantsQuery } from "@/modules/restaurant/redux/slices/restaurant-api";
import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, useNavigation } from "expo-router";

const RestaurantList = () => {
  const navigation = useNavigation();

  const { data, isLoading, isError } = useGetRestaurantsQuery();
  const { colors } = useTheme();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator animating={true} color={"#7c8ebf"} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {data?.map((restaurant) => (
          <Card key={restaurant.id} style={styles.card}>
            {restaurant.image ? (
              <Card.Cover
                source={{ uri: restaurant.image }}
                style={styles.cardImage}
              />
            ) : (
              <Card.Cover
                source={require("@/assets/images/mock/premium_photo-1661883237884-263e8de8869b.jpg")}
                style={styles.cardImage}
              />
            )}
            <Card.Content style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <Title style={styles.titleLeft}>{restaurant.name}</Title>
                <View style={styles.workers}>
                  <Title style={styles.workersTitle}>
                    {restaurant.workers.length}
                  </Title>
                  <IconSymbol
                    size={25}
                    name="person.2.fill"
                    weight="medium"
                    color={colors.primary}
                  />
                </View>
              </View>
              <Paragraph style={styles.address}>{restaurant.address}</Paragraph>
              <Button
                mode="outlined"
                style={styles.button}
                onPress={() => {
                  router.push({
                    pathname: "/restaurant/[id]",
                    params: { id: restaurant.id },
                  });
                }}
              >
                View Details
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    marginTop: 30,
  },
  scrollContent: {
    margin: 20,
  },
  card: {
    width: windowWidth - 40,
    marginBottom: 20,
    overflow: "hidden",
    borderRadius:14,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderRadius:14,
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
});

export default RestaurantList;
