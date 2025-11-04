import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, View } from "react-native";
import { Button, Chip, HelperText, Text } from "react-native-paper";
import { useFileSelect } from "../hooks/useFileSelect";
import { FC } from "react";

type File = DocumentPicker.DocumentPickerAsset;

type Props = {
  data: File[];
  errors?: string;
  onChange?: (files: File[]) => void;
  onChipClick?: (file: File) => void;
};

const FileUploader: FC<Props> = ({ data, onChange, errors, onChipClick }) => {
  const { handleFileSelect } = useFileSelect(onChange || (() => {}));

  return (
    <View style={styles.fileCard}>
      <Text variant="titleMedium" style={styles.fileTitle}>
        Upload Files (Required)
      </Text>
      <Text variant="bodySmall" style={styles.fileSubtitle}>
        Upload PDF, DOC, DOCX, or image files
      </Text>

      <Button
        mode="outlined"
        onPress={handleFileSelect}
        style={styles.uploadButton}
        icon="upload"
      >
        Select Files
      </Button>

      {data.length > 0 && (
        <View style={styles.fileList}>
          {data.map((file) => (
            <Chip
              key={file.name}
              mode="outlined"
              onClose={() => onChipClick?.(file)}
              style={styles.fileChip}
            >
              {file.name}
            </Chip>
          ))}
        </View>
      )}

      {errors && (
        <HelperText type="error" visible={!!errors}>
          {errors}
        </HelperText>
      )}
    </View>
  );
};

export default FileUploader;

const styles = StyleSheet.create({
  fileCard: {
    marginVertical: 8,
  },
  fileTitle: {
    marginBottom: 4,
  },
  fileSubtitle: {
    marginBottom: 16,
    opacity: 0.7,
  },
  uploadButton: {
    marginBottom: 16,
  },
  fileList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  fileChip: {
    width: "100%",
    marginBottom: 8,
  },
});
