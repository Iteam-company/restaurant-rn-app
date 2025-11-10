import React, { FC } from "react";
import { Text } from "./ui/text";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type Props = {
  error?: string | FetchBaseQueryError | SerializedError;
  touched?: boolean;
};

const ErrorText: FC<Props> = ({ error, touched }) => {
  if (touched !== undefined && !touched) return null;

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

  return (
    <Text variant={"muted"} className="text-red-500">
      {message}
    </Text>
  );
};

export default ErrorText;
