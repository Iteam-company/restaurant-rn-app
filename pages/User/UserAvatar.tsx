import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
} from "@/lib/redux/slices/user-api";
import { FC, useMemo } from "react";

type Props = {
  userId?: string;
  size?: number;
};

const UserAvatar: FC<Props> = ({ userId, size = 30 }) => {
  const { data: userById, isLoading: isLoadingById } = useGetUserByIdQuery(
    userId!,
    { skip: !userId }
  );
  const { data: currentUser, isLoading: isLoadingCurrent } =
    useGetCurrentUserQuery(undefined, {
      skip: !!userId,
    });

  const user = useMemo(
    () => (userId ? userById : currentUser),
    [userId, userById, currentUser]
  );

  const isLoading = isLoadingById || isLoadingCurrent;

  return (
    <Avatar
      alt={`${user?.username} icon`}
      style={{ width: size, height: size }}
    >
      <AvatarImage source={{ uri: user?.icon }} />
      <AvatarFallback>
        {isLoading ? (
          <Loader />
        ) : (
          <Text>
            {user?.firstName[0].toUpperCase()}
            {user?.lastName[0].toUpperCase()}
          </Text>
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
