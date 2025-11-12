import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";
import { useAuthToken } from "@/modules/common/hooks/useAuthToken";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
} from "@/lib/redux/slices/user-api";
import { FC, useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import * as Linking from "expo-linking";
import UserAvatar from "./UserAvatar";
import Loader from "@/components/loader";

const InfoBlock = ({
  value,
  title,
  onPress,
}: {
  value: string;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <View
      className="flex flex-row items-center"
      style={{ justifyContent: "space-between" }}
    >
      <Text>{title}</Text>
      <Button variant="link" className="p-0" onPress={onPress}>
        <Text>{value}</Text>
      </Button>
    </View>
  );
};

type Props = { userId?: string };

const UserProfile: FC<Props> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: userById } = useGetUserByIdQuery(userId!, { skip: !userId });
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !!userId,
  });

  const user = useMemo(
    () => (userId ? userById : currentUser),
    [userId, userById, currentUser]
  );

  const { setToken, setRefreshToken } = useAuthToken();

  const handleOpenURI = useCallback(async (uri: string) => {
    setIsLoading(true);
    await Linking.openURL(uri);
    setIsLoading(false);
  }, []);

  const handleLogOut = useCallback(async () => {
    setToken(null);
    setRefreshToken(null);
    await SecureStore.deleteItemAsync(USER_ROLE);

    router.push("/auth/signin");
  }, [setToken, setRefreshToken]);

  if (!user) return null;

  return (
    <Loader isLoading={isLoading}>
      <Card className="w-full py-4 gap-4">
        <CardHeader className="px-4">
          <View className="flex-row gap-2">
            <UserAvatar userId={userId} size={50} />
            <View className="h-full flex">
              <Text>{`${user.firstName} ${user.lastName}`}</Text>
              <View className="flex flex-row gap-2 w-min">
                <Badge>
                  <Text>{user.role}</Text>
                </Badge>
              </View>
            </View>
          </View>
        </CardHeader>
        <Separator />
        <CardContent className="flex px-4">
          <InfoBlock
            title="Email: "
            value={user.email}
            onPress={() => handleOpenURI(`mailto:${user.email}`)}
          />

          <InfoBlock
            title="Phone number: "
            value={user.phoneNumber}
            onPress={() => handleOpenURI(`tel:${user.phoneNumber}`)}
          />
        </CardContent>
        {!userId && (
          <CardContent className="px-4">
            <Button onPress={handleLogOut}>
              <Text>Log out</Text>
            </Button>
          </CardContent>
        )}
      </Card>
    </Loader>
  );
};

export default UserProfile;
