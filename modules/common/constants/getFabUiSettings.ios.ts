import { Platform } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

const getFabUiSettings = (insets: EdgeInsets) => {
  return Platform.select({
    ios: { bottom: insets.bottom + 49 },
    default: { bottom: 0 },
  });
};

export default getFabUiSettings;
