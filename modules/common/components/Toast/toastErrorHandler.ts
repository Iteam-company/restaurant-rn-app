import Toast, { ToastConfig } from "react-native-toast-message";

import { ComponentProps } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const toastErrorHandler = (
  error: FetchBaseQueryError | SerializedError,
  props?: Partial<ComponentProps<ToastConfig["error"]>>
) => {
  if (!error) return null;

  let message: string;

  if (typeof error === "string") {
    message = error;
  } else if ("status" in error) {
    // FetchBaseQueryError type
    if (typeof error.data === "string") {
      message = error.data;
    } else if (typeof error.data === "object" && error.data !== null) {
      message =
        (error.data as { message?: string })?.message ?? "An error occurred.";
    } else {
      message = "An unknown error occurred.";
    }
  } else {
    // SerializedError
    message = error.message ?? "An unexpected error occurred.";
  }

  const text1 = props?.text1 || "Error";
  const text2 = props?.text2;

  if (message) {
    Toast.show({
      type: "error",
      text1: text1,
      text2: message,
    });
  } else {
    Toast.show({
      type: "error",
      text1: text1,
      text2: text2 || "Something went wrong, try again!",
    });
  }
};
