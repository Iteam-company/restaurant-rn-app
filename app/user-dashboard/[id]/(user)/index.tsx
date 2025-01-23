import Wrapper from "@/modules/common/components/Wrapper";
import { useRouter } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useValidateTokenQuery } from "@/modules/auth/redux/slices/auth-api";
import CurrentUserInfo from "@/modules/restaurant/components/RestaurantInfo/userInfo/CurrentUserInfo";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";

export default function User() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: currentUser } = useValidateTokenQuery();

  return (
    <Wrapper centered>
      <CurrentUserInfo />
      {currentUser && (
        <FAB
          icon="pencil"
          style={[styles.fab, getFabUiSettings(insets)]}
          onPress={() => {
            router.push({
              pathname: "./[userId]/edit",
              params: { userId: currentUser?.id },
            });
          }}
        />
      )}
    </Wrapper>
  );
}

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
