import { CardContent, CardHeader } from "@/components/ui/card";
import { View } from "react-native";
import { Card } from "react-native-paper";
import UserAvatarSkeleton from "./UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const UserProfileSkeleton = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card className="w-full py-4 gap-4">
      <CardHeader className="px-4">
        <View className="flex-row gap-2">
          <UserAvatarSkeleton size={50} />
          <View className="h-full flex">
            <Skeleton className="h-6 w-14" />
            <View className="flex flex-row gap-2 w-min">
              <Skeleton className="h-4 w-8" />
            </View>
          </View>
        </View>
      </CardHeader>
      <Separator />
      <CardContent className="flex px-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </CardContent>
    </Card>
  );
};

export default UserProfileSkeleton;
