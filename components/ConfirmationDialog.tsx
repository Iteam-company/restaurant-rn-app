import { FC, PropsWithChildren } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

interface ConfirmationDialogProps {
  title?: string;
  text?: string;
  action: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const ConfirmationDialog: FC<
  PropsWithChildren<ConfirmationDialogProps>
> = ({
  title = "Confirm Deletion",
  text = "Are you sure? This action cannot be undone.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  action,
  children,
}) => {
  const confirmAction = () => {
    action();
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Text variant="large">{title}</Text>
        </DialogHeader>
        <Text className="mr-4">{text}</Text>
        <DialogFooter className="flex flex-row justify-end">
          <DialogClose>
            <Button>
              <Text>{cancelButtonText}</Text>
            </Button>
          </DialogClose>
          <Button variant="destructive" onPress={confirmAction}>
            <Text>{confirmButtonText}</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
