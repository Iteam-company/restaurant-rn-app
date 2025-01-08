import { useGetMenuItemQuery } from "@/modules/menu/redux/slices/menu-api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Chip,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";

export const Item = () => {
  const { colors } = useTheme();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();

  const { data } = useGetMenuItemQuery(itemId);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover
          source={require("@/assets/images/mock/dish-mock.jpg")}
          style={styles.image}
        />

        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>{data?.name}</Title>
            <Title style={styles.price}>{data?.price} $</Title>
          </View>

          <View style={styles.infoContainer}>
            <Chip icon="clock" mode="outlined" style={styles.chip}>
              {data?.timeForCook}
            </Chip>
            <Chip icon="scale" mode="outlined" style={styles.chip}>
              {data?.weight} grams
            </Chip>
          </View>

          <Paragraph style={styles.description}>{data?.description}</Paragraph>
          <Divider
            style={(styles.divider, [{ backgroundColor: colors.primary }])}
          />
          <Title style={styles.ingredientsTitle}>Ingredients:</Title>
          <Paragraph style={styles.ingredients}>{data?.ingredients}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  card: {
    borderRadius: 12,
  },
  image: {
    height: "50%",
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 20,
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontSize: 24,
  },
  price: {
    fontSize: 26,
    color: "#85BB65",
  },
  description: {
    fontSize: 16,
    marginVertical: 16,
    lineHeight: 24,
  },
  infoContainer: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
  },
  chip: {
    marginRight: 8,
  },
  ingredientsTitle: {
    color: "#A1A7AC",
    marginTop: 10,
    fontSize: 18,
    marginBottom: 8,
  },
  ingredients: {
    color: "#A1A7AC",
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
  },
});
