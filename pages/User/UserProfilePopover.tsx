import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "./UserAvatar";
import UserProfile from "./UserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserProfilePopover = () => {
  const insets = useSafeAreaInsets();
  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar />
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
