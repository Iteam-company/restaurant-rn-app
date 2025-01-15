import { Platform } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

type ScrollViewOptions = {
  isTopMargin?: boolean;
  botttomOffset?: number;
  topOffset?: number;
  default?: any;
};

const getScrollViewUiSettings = (
  insets: EdgeInsets,
  options: ScrollViewOptions = {}
) => {
  const { isTopMargin = false, botttomOffset = 0, topOffset = 0 } = options;

  return Platform.select({
    ios: {
      marginBottom: insets.bottom + 49 - 10 + botttomOffset,
      marginTop: isTopMargin ? insets.top - 10 + topOffset : 0,
    },
    default: options.default,
  });
};

export default getScrollViewUiSettings;
