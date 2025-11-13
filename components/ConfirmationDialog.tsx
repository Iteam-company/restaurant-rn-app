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
  PropsWithChildren<
    ConfirmationDialogProps & {
      open?: boolean;
      onOpenChange?: (open: boolean) => void;
    }
  >
> = ({
  open,
  onOpenChange,
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  action,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <Text variant="large">{title}</Text>
        </DialogHeader>
        <Text className="mr-4">{text}</Text>
        <DialogFooter className="flex flex-row justify-end">
          <DialogClose>
            <Button>
              <Text>{cancelButtonText || "Cancel"}</Text>
            </Button>
          </DialogClose>
          <Button variant="destructive" onPress={action}>
            <Text>{confirmButtonText || "Delete"}</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
