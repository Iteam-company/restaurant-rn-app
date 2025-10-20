import * as DocumentPicker from "expo-document-picker";
import { useCallback } from "react";

type FileSelectOptionsType = {
  type: string[];
  copyToCacheDirectory: boolean;
};

export const useFileSelect = (
  callback: (file: DocumentPicker.DocumentPickerAsset) => void,
  options: Partial<FileSelectOptionsType>
) => {
  const handleFileSelect = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync(options);

    console.log(result, "~~~");

    if (result.canceled) {
      return;
    }

    callback(result.assets[0]);
  }, [callback, options]);

  return { handleFileSelect };
};
