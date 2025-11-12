import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";
import { MenuIcon } from "lucide-react-native";

const QuizResultSkeleton = () => {
  return (
    <Card className="gap-2 w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="w-52 h-6" />
        {SecureStore.getItem(USER_ROLE) !== "waiter" && <MenuIcon size={20} />}
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap gap-2 w-[90%]">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-12" />
        {SecureStore.getItem(USER_ROLE) === "waiter" ? (
          <></>
        ) : (
          <Skeleton className="h-5 w-24" />
        )}
        <Skeleton className="h-5 w-24" />
      </CardContent>
    </Card>
  );
};

export default QuizResultSkeleton;
