import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

interface InformationDialogProps {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

const InformationDialog: React.FC<InformationDialogProps> = ({
  visible,
  title,
  message,
  onClose,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 14,
  },
});

export default InformationDialog;
