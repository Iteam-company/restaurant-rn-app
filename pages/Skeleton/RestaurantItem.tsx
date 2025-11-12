import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@react-navigation/native";
import { MenuIcon, Users } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

const RestaurantItemSkeleton = () => {
  const [mounted, setMounted] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card className="pt-0">
      <AspectRatio
        ratio={16 / 9}
        className="relative aspect-video w-full overflow-hidden rounded-md"
      >
        <Skeleton className="absolute bottom-0 left-0 right-0 top-0 object-cover w-full h-full" />
      </AspectRatio>
      <CardHeader className=" flex flex-row justify-between">
        <View className="gap-1 w-[80%]">
          <Skeleton className="w-44 h-5" />
          <Skeleton className="w-52 h-4" />
        </View>
        <View className="flex flex-row gap-1 items-center">
          <Skeleton className="w-3 h-6" />
          <Users size={22} color={colors.text} />
        </View>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <Button>
          <Skeleton className="w-20 h-4" />
        </Button>

        <Button variant="outline">
          <MenuIcon size={20} color={colors.text} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantItemSkeleton;
