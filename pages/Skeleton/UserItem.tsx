import { Skeleton } from "@/components/ui/skeleton";
import { View } from "react-native";
import UserAvatarSkeleton from "./UserAvatar";
import { useEffect, useState } from "react";

const UserItemSkeleton = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <View className="flex flex-row gap-2">
      <UserAvatarSkeleton size={50} />
      <View className="gap-2">
        <Skeleton className="h-5 w-32" />
        <View className="flex flex-row">
          <Skeleton className="h-5 w-20" />
        </View>
      </View>
    </View>
  );
};

export default UserItemSkeleton;
