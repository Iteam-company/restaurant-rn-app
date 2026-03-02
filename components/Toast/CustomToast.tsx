import { FC, useMemo } from "react";
import { Pressable, View } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

type CustomToastProps = ToastConfigParams<any>;

const CustomToast: FC<CustomToastProps> = ({ text1, text2, onPress, type }) => {
  const config = useMemo(() => {
    switch (type) {
      case "success":
        return {
          containerClass: "bg-green-600 border-green-700",
          textClass: "text-white",
          subTextClass: "text-green-50",
        };
      case "error":
        return {
          containerClass: "bg-destructive border-destructive",
          textClass: "text-destructive-foreground",
          subTextClass: "text-destructive-foreground/90",
        };
      case "info":
      default:
        return {
          containerClass: "bg-card border-border",
          textClass: "text-foreground",
          subTextClass: "text-muted-foreground",
        };
    }
  }, [type]);

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "w-[90%] flex-row items-center p-4 rounded-lg border shadow-sm gap-3",
        config.containerClass,
      )}
    >
      <View className="flex-1 gap-0.5">
        {text1 && (
          <Text className={cn("font-semibold text-base", config.textClass)}>
            {text1}
          </Text>
        )}
        {text2 && (
          <Text className={cn("text-sm", config.subTextClass)}>{text2}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomToast;
