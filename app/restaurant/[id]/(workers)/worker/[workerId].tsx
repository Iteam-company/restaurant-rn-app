import Wrapper from "@/modules/common/components/Wrapper";
import { StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FAB, Title } from "react-native-paper";
import WorkerInfo from "@/modules/restaurant/components/RestaurantInfo/workerInfo/WorkerInfo";

const WorkerInfoPage = () => {
  const { id: restaurantId, workerId } = useLocalSearchParams<{
    id: string;
    workerId: string;
  }>();
  return (
    <Wrapper>
      <WorkerInfo />
      <FAB
        icon="pencil"
        style={styles.fab}
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
