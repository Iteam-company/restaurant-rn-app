import { useValidateTokenQuery } from "@/lib/redux/slices/auth-api";
import Wrapper from "@/components/Wrapper";
import { navigateToEditUser } from "@/modules/common/utils/flowNavigation";
import CurrentUserInfo from "@/pages/User/UserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react-native";

export default function User() {
  const insets = useSafeAreaInsets();

  const { data: currentUser } = useValidateTokenQuery();

  return (
    <Wrapper>
      <CurrentUserInfo />
      {currentUser && (
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-6 h-12 w-12 rounded-xl shadow-md"
          style={{ bottom: insets.bottom + 56 }}
          onPress={() => {
            navigateToEditUser(currentUser?.id || 0);
          }}
        >
          <Pencil size={24} className="text-primary-foreground" />
        </Button>
      )}
    </Wrapper>
  );
}
