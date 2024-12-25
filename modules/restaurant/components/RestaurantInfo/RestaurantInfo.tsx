import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Appbar, List, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import { useGetRestaurantQuery } from "../../redux/slices/restaurant-api";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { WorkersAccordion } from "./WorkersAccordion/WorkersAccordion";

export default function RestaurantInfo() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  const { data, isLoading, isError } = useGetRestaurantQuery(id);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
          <Appbar.Content
            title={`${data?.name}`}
            titleStyle={{ color: "white" }}
          />
        </Appbar.Header>
        <Wrapper centered>
          <View style={styles.content}>
            <WorkersAccordion workersList={data?.workers} />
          </View>
        </Wrapper>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 15,
  },

  container: {
    width: "100%",
  },
  content: {
    width: "100%",
    flex: 1,
    padding: 16,
  },
  accordion: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
});
