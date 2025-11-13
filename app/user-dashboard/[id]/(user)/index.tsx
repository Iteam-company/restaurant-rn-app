import { useValidateTokenQuery } from "@/lib/redux/slices/auth-api";
import Wrapper from "@/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import { navigateToEditUser } from "@/modules/common/utils/flowNavigation";
import CurrentUserInfo from "@/pages/User/UserProfile";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function User() {
  const insets = useSafeAreaInsets();

  const { data: currentUser } = useValidateTokenQuery();

  return (
    <Wrapper>
      <CurrentUserInfo />
      {currentUser && (
        <FAB
          icon="pencil"
          style={[styles.fab, getFabUiSettings(insets)]}
          onPress={() => {
            navigateToEditUser(currentUser?.id || 0);
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
