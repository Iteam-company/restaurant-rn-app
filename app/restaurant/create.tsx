import Wrapper from "@/modules/common/components/Wrapper";
import CreateRestaurant from "@/modules/restaurant/components/CreateRestaurant/CreateRestaurant";
import { StyleSheet } from "react-native";

export default function Create() {
  return (
    <Wrapper centered>
      <CreateRestaurant />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
