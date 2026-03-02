import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "./UserAvatar";
import UserProfile from "./UserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useIos26 from "@/lib/hook/useIos26";
import { FC, useRef } from "react";
import { TriggerRef } from "@rn-primitives/popover";

type Props = React.ComponentProps<typeof UserAvatar> &
  React.ComponentProps<typeof UserProfile>;

const UserProfilePopover: FC<Props> = ({ ...props }) => {
  const popoverTriggerRef = useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const { isIOS26 } = useIos26();

  return (
    <Popover>
      <PopoverTrigger ref={popoverTriggerRef}>
        <UserAvatar
          size={35}
          contentClassName={isIOS26 && "bg-transparent"}
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={insets.top}
        className="p-0 border-0 bg-transparent"
        insets={insets}
      >
        <UserProfile
          {...props}
          onClosePopover={() => {
            popoverTriggerRef.current?.close();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfilePopover;
