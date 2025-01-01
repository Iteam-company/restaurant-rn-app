import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  useTheme,
} from "react-native-paper";

interface ConfirmationDialogProps {
  title?: string;
  text?: string;
  action: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  close: () => void;
  isOpen: boolean;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  title = "Confirm Deletion",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  action,
  text = "Are you sure?",
  close,
  isOpen,
}) => {
  const { colors } = useTheme();

  const confirmAction = () => {
    action();
    close();
  };

  if (!isOpen) return;
  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={close} style={styles.dialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>{cancelButtonText}</Button>
          <Button textColor={colors.error} onPress={confirmAction}>
            {confirmButtonText}
          </Button>
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
