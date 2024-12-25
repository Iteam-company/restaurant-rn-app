import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useCallback } from 'react';

type FileSelectOptionsType = {
  type: string[];
  copyToCacheDirectory: boolean;
};

export const useFileSelect = (
  callback: (file: DocumentPicker.DocumentPickerAsset) => void,
  options: Partial<FileSelectOptionsType>
) => {
  const { type = ['image/*', 'application/pdf'], copyToCacheDirectory = true } =
    options;

  const handleFileSelect = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync(options);

    if (result.canceled) {
      return;
    }

    callback(result.assets[0]);
  }, []);

  return { handleFileSelect };
};
