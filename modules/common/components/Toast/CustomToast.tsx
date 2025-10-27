import { ComponentProps, FC, useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { ToastConfig } from "react-native-toast-message";

interface CustomToastStyles {
  container: ViewStyle;
  text1: TextStyle;
  text2: TextStyle;
}

const CustomToast: FC<ComponentProps<ToastConfig["success"]>> = ({
  text1,
  text1Style,
  text2,
  text2Style,
  onPress,
  type,
}) => {
  const { colors, fonts } = useTheme();

  const styles = useMemo<CustomToastStyles>(() => {
    const styles: CustomToastStyles = {
      container: {
        width: "90%",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
      },
      text1: {},
      text2: {},
    };

    switch (type) {
      case "success":
        styles.container.backgroundColor = "#3A8B44";
        styles.text1.color = colors.onPrimary;
        styles.text2.color = colors.onPrimary;
        break;
      case "error":
        styles.container.backgroundColor = colors.errorContainer;
        styles.text1.color = colors.onPrimary;
        styles.text2.color = colors.onPrimary;
        break;
      case "info":
        styles.container.backgroundColor = colors.surface;
        styles.text1.color = colors.onPrimary;
        styles.text2.color = colors.onPrimary;
        break;
    }

    return styles;
  }, [type, colors]);

  return (
    <View style={[styles.container]} onTouchStart={onPress}>
      {text1 && (
        <Text style={[styles.text1, fonts.bodyMedium, text1Style]}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={[styles.text2, fonts.bodySmall, text2Style]}>{text2}</Text>
      )}
    </View>
  );
};

export default CustomToast;
