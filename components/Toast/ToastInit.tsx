import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, { ToastConfig } from "react-native-toast-message";
import { ComponentProps } from "react";
import CustomToast from "./CustomToast";

const toastConfig = {
  success: (props: ComponentProps<ToastConfig["success"]>) => (
    <CustomToast {...props} type="success" />
  ),
  error: (props: ComponentProps<ToastConfig["error"]>) => (
    <CustomToast {...props} type="error" />
  ),
  info: (props: ComponentProps<ToastConfig["info"]>) => (
    <CustomToast {...props} />
  ),
};

const ToastInit = () => {
  const insets = useSafeAreaInsets();
  return (
    <Toast
      topOffset={insets.top}
      bottomOffset={insets.bottom}
      config={toastConfig}
      swipeable
    />
  );
};

export default ToastInit;
