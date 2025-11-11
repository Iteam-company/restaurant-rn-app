import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { USER_ROLE } from "@/modules/common/constants/api";
import { navigateToEditQuiz } from "@/modules/common/utils/flowNavigation";
import { useGlobalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useDeleteQuizMutation } from "../../lib/redux/slices/quiz-api";
import { IQuizInfo } from "@/lib/redux/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chip from "@/components/chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";

type Params = {
  quiz: IQuizInfo;
};

const QuizItem = ({ quiz }: Params) => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const router = useRouter();

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const [deleteQuiz] = useDeleteQuizMutation();

  const handleDeleteQuiz = () => {
    deleteQuiz(`${quiz.id}`);
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname:
            SecureStore.getItem(USER_ROLE) === "waiter"
              ? "/user-dashboard/[id]/(quiz)/[quizId]/(take-quiz)"
              : `/admin-dashboard/[id]/(quiz)/[quizId]/(questions)`,
          params: { id: restaurantId, quizId: quiz.id },
        })
      }
    >
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle ellipsizeMode="tail" numberOfLines={1} className="w-[90%]">
            {quiz.title}
          </CardTitle>
          {SecureStore.getItem(USER_ROLE) === "waiter" ? (
            <></>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onPress={() => {
                      navigateToEditQuiz(quiz.id, restaurantId);
                    }}
                  >
                    <Text>Edit</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onPress={() => {
                      setIsOpenDialog(true);
                    }}
                  >
                    <Text>Delete</Text>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent>
          <View className="flex flex-row gap-2">
            <Chip value={quiz.status} />
            <Chip value={quiz.difficultyLevel} />
          </View>
          <ConfirmationDialog
            title="Delete Menu?"
            text={`Are you sure you want to delete ${quiz.title} ? This action cannot be undone.`}
            action={handleDeleteQuiz}
            close={() => {
              setIsOpenDialog(false);
            }}
            isOpen={isOpenDialog}
          />
        </CardContent>
      </Card>
    </Pressable>
  );
};

export default QuizItem;
