import { Platform, View } from "react-native";

export const TabBackground = () => {
  return (
    <View
      className="absolute inset-0 border-t border-border bg-background"
      style={
        Platform.OS === "ios"
          ? {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }
          : {
              elevation: 4,
            }
      }
    />
  );
};
