import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import { navigateToEditUser } from "@/modules/common/utils/flowNavigation";
import WorkerInfo from "@/modules/restaurant/components/RestaurantInfo/workerInfo/WorkerInfo";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
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
        style={[styles.fab, getFabUiSettings(insets)]}
        onPress={() => {
          navigateToEditUser(workerId, restaurantId);
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
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
