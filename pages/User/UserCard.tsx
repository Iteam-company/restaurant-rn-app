import { FC } from "react";
import UserProfilePopover from "./UserProfilePopover";
import { View } from "react-native";
import { useGetUserByIdQuery } from "@/lib/redux/slices/user-api";
import { Text } from "@/components/ui/text";
import { useTheme } from "@react-navigation/native";
import UserItemSkeleton from "../Skeleton/UserItem";
import UserRoleBadge from "@/components/user-role-badge";

type Props = {
  userId: string;
};

const UserCard: FC<Props> = ({ userId }) => {
  const { colors } = useTheme();
  const { data, isLoading } = useGetUserByIdQuery(userId);

  return isLoading ? (
    <UserItemSkeleton />
  ) : (
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
  );
};

export default UserCard;
