import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "./UserAvatar";
import UserProfile from "./UserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useIos26 from "@/lib/hook/useIos26";

const UserProfilePopover = () => {
  const insets = useSafeAreaInsets();
  const { isIOS26 } = useIos26();

  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar size={35} contentClassName={isIOS26 && "bg-transparent"} />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={insets.top}
        className="p-0 border-0 bg-transparent"
        insets={insets}
      >
        <UserProfile />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfilePopover;
