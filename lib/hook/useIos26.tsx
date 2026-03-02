import * as Device from "expo-device";

const useIos26 = () => {
  const isIOS26 =
    Device.osName === "iOS" && Device.osVersion && Device.osVersion >= "26";

  return { isIOS26 };
};

export default useIos26;
