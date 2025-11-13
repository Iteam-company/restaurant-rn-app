import { FC, useState } from "react";
import UserProfilePopover from "./UserProfilePopover";
import { View } from "react-native";
import { useGetUserByIdQuery } from "@/lib/redux/slices/user-api";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import UserItemSkeleton from "../Skeleton/UserItem";
import UserRoleBadge from "@/components/user-role-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react-native";
import { navigateToEditUser } from "@/modules/common/utils/flowNavigation";
import { useGlobalSearchParams } from "expo-router";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useRemoveWorkerMutation } from "@/lib/redux/slices/restaurant-api";

type Props = {
  userId: string;
};

const UserCard: FC<Props> = ({ userId }) => {
  const { colors } = useTheme();
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();

  const { data, isLoading } = useGetUserByIdQuery(userId);
  const [removeWorker] = useRemoveWorkerMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return isLoading ? (
    <UserItemSkeleton />
  ) : (
    <View className="flex flex-row justify-between">
      <View className="flex flex-row gap-2">
        <UserProfilePopover
          userId={userId}
          size={50}
          contentClassName={`border-[${colors.border}]`}
        />
        <View>
          <Text>
            {data?.lastName} {data?.firstName}
          </Text>
          <View className="flex flex-row">
            <UserRoleBadge value={data?.role} />
          </View>
        </View>
      </View>
      <ConfirmationDialog
        title="Remove this worker?"
        text="Are you sure that you want to remove this worker from this restaurant?"
        confirmButtonText="Remove"
        action={async () => await removeWorker({ userId, restaurantId })}
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="pr-2 pt-2">
          <MenuIcon size={20} color={colors.text} className="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onPress={() => navigateToEditUser(userId, restaurantId)}
            >
              <Text>Edit</Text>
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onPress={() => setIsDialogOpen(true)}
            >
              <Text>Remove</Text>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
};

export default UserCard;
