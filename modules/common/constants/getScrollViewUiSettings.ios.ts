import { Platform } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

type ScrollViewOptions = {
  isTopMargin?: boolean;
  default?: any;
};

const getScrollViewUiSettings = (
  insets: EdgeInsets,
  options: ScrollViewOptions = {}
) => {
  const { isTopMargin = false } = options;

  return Platform.select({
    ios: {
      marginBottom: insets.bottom + 49 - 10,
      marginTop: isTopMargin ? insets.top - 10 : 0,
    },
    default: options.default,
  });
};

export default getScrollViewUiSettings;
