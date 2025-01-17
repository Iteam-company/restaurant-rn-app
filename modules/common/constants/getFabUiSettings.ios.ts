import { Platform } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

type Options = {
  isFABGroup: boolean;
};

const getFabUiSettings = (insets: EdgeInsets, options?: Options) => {
  const { isFABGroup = false } = options || {};
  return Platform.select({
    ios: {
      bottom: insets.bottom + 49 + (isFABGroup && insets.top !== 20 ? -34 : 0),
    },
    default: { bottom: 0 },
  });
};

export default getFabUiSettings;
