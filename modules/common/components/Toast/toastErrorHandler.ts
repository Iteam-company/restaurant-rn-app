import Toast, { ToastConfig } from "react-native-toast-message";
import { ErrorResponseType } from "../../types";
import { ComponentProps } from "react";

export const toastErrorHandler = (
  error: ErrorResponseType,
  props?: Partial<ComponentProps<ToastConfig["error"]>>
) => {
  const text1 = props?.text1 || "Error";
  const text2 = props?.text2;

  if (error.data) {
    Toast.show({
      type: "error",
      text1: text1,
      text2: error.data.message,
    });
  } else {
    Toast.show({
      type: "error",
      text1: text1,
      text2: text2 || "Something went wrong, try again!",
    });
  }
};
