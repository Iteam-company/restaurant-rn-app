import Wrapper from "@/modules/common/components/Wrapper";
import { Platform, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FAB, Title } from "react-native-paper";
import WorkerInfo from "@/modules/restaurant/components/RestaurantInfo/workerInfo/WorkerInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WorkerInfoPage = () => {
  const { id: restaurantId, workerId } = useLocalSearchParams<{
    id: string;
    workerId: string;
  }>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper>
      <WorkerInfo />
      <FAB
        icon="pencil"
        style={
          (styles.fab,
          { bottom: Platform.select({ ios: insets.bottom * 2.5, default: 0 }) })
        }
        onPress={() => {
          router.push({
            pathname: "/restaurant/[id]/(workers)/worker/edit/[workerId]",
            params: { id: restaurantId, workerId: workerId },
          });
        }}
      />
    </Wrapper>
  );
};

export default WorkerInfoPage;

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
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
