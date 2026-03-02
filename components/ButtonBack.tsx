import { router } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import useIos26 from "@/lib/hook/useIos26";
import { useTheme } from "@react-navigation/native";

const ButtonBack = () => {
  const { isIOS26 } = useIos26();
  const { colors } = useTheme();

  return (
    <Pressable
      className="flex flex-row items-center"
      style={{ left: !isIOS26 ? -12 : 0 }}
      onPress={() => router.back()}
    >
      <ChevronLeftIcon strokeWidth={2} size={32} color={colors.text} />
    </Pressable>
  );
};

export default ButtonBack;
