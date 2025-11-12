import { ActivityIndicator } from "react-native-paper";
import Wrapper from "@/components/Wrapper";

export default function HomeScreen() {
  return (
    <Wrapper>
      <ActivityIndicator animating />
    </Wrapper>
  );
}
