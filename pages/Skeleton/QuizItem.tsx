import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { USER_ROLE } from "@/modules/common/constants/api";
import { useTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { MenuIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

const QuizItemSkeleton = () => {
  const [mounted, setMounted] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <Skeleton className="w-40 h-6" />
        {SecureStore.getItem(USER_ROLE) !== "waiter" && (
          <MenuIcon size={20} color={colors.text} />
        )}
      </CardHeader>
      <CardContent>
        <View className="flex flex-row gap-2">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-16 h-5" />
        </View>
      </CardContent>
    </Card>
  );
};

export default QuizItemSkeleton;
