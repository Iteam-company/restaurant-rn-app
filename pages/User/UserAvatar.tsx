import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
} from "@/lib/redux/slices/user-api";
import { FC, useMemo } from "react";
import { ClassNameValue } from "tailwind-merge";

type Props = {
  userId?: string;
  size?: number;
  className?: ClassNameValue;
  contentClassName?: ClassNameValue;
};

const UserAvatar: FC<Props> = ({
  userId,
  size = 30,
  className,
  contentClassName,
}) => {
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
      className={className?.toString()}
    >
      <AvatarImage
        source={{ uri: user?.icon }}
        className={contentClassName?.toString()}
      />
      <AvatarFallback className={contentClassName?.toString()}>
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
