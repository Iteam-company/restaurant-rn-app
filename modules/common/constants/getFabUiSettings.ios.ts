import { Platform, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

type Options = {
  isFABGroup?: boolean;
  bottomOffset?: number;
  defaultStyle?: ViewStyle;
};

const getFabUiSettings = (insets: EdgeInsets, options?: Options) => {
  const {
    isFABGroup = false,
    bottomOffset = 0,
    defaultStyle = { bottom: 0 },
  } = options || {};
  return Platform.select({
    ios: {
      bottom:
        insets.bottom +
        20 +
        bottomOffset +
        (isFABGroup && insets.top !== 20 ? -34 : 0),
    },
    default: defaultStyle,
  });
};

export default getFabUiSettings;
