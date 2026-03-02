import * as DocumentPicker from "expo-document-picker";
import { View } from "react-native";
import { FC } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { useFileSelect } from "@/hooks/useFileSelect";

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
    <View className="my-2 gap-4 justify-center">
      <View className="gap-1">
        <Label nativeID="file-upload-label" className="font-semibold">
          Upload Files (Required)
        </Label>
        <Text className="text-sm text-muted-foreground">
          Upload PDF, DOC, DOCX, or image files
        </Text>
      </View>

      <Button
        variant="outline"
        onPress={handleFileSelect}
        className="w-full flex-row gap-2 border-dashed border-2"
      >
        <Upload size={18} className="text-foreground" />
        <Text>Select Files</Text>
      </Button>

      {data.length > 0 && (
        <View className="gap-2 mt-2">
          {data.map((file, index) => (
            <View
              key={`${file.name}-${index}`}
              className="flex-row items-center justify-between p-3 rounded-md border border-border bg-card"
            >
              <View className="flex-row items-center gap-2 flex-1 mr-2">
                <FileText size={16} className="text-muted-foreground" />
                <Text
                  className="text-sm font-medium text-foreground"
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {file.name}
                </Text>
              </View>

              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onPress={() => onChipClick?.(file)}
              >
                <X size={16} className="text-muted-foreground" />
              </Button>
            </View>
          ))}
        </View>
      )}

      {errors && (
        <Text className="text-xs font-medium text-destructive mt-1">
          {errors}
        </Text>
      )}
    </View>
  );
};

export default FileUploader;
