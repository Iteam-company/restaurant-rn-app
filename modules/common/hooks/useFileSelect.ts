import * as DocumentPicker from "expo-document-picker";
import { useCallback, useRef } from "react";

type FileSelectOptionsType = {
  type: string[];
  copyToCacheDirectory: boolean;
  multiple?: boolean;
};

export const useFileSelect = (
  callback: (files: DocumentPicker.DocumentPickerAsset[]) => void,
  options: Partial<FileSelectOptionsType> = {}
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const handleFileSelect = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/*",
      ],
      ...options,
    });

    if (result.canceled) {
      return;
    }

    callbackRef.current(result.assets);
  }, [options]);

  return { handleFileSelect };
};
