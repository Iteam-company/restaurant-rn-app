import { FC } from "react";
import UserProfilePopover from "./UserProfilePopover";
import { View } from "react-native";
import { useGetUserByIdQuery } from "@/lib/redux/slices/user-api";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";

type Props = {
  userId: string;
};

const UserItem: FC<Props> = ({ userId }) => {
  const { data } = useGetUserByIdQuery(userId);

  return (
    <View className="flex flex-row gap-2">
      <UserProfilePopover
        userId={userId}
        size={50}
        contentClassName={`bg-[#EEE]`}
      />
      <View>
        <Text>
          {data?.lastName} {data?.firstName}
        </Text>
        <View className="flex flex-row">
          <Badge>
            <Text>{data?.role}</Text>
          </Badge>
        </View>
      </View>
    </View>
  );
};

export default UserItem;
