import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { USER_ROLE } from "@/modules/common/constants/api";
import { useDeleteQuizResultMutation } from "@/lib/redux/slices/quiz-api";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IQuizResultInfo } from "@/lib/redux/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, MenuIcon, TrophyIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import Chip from "@/components/chip";

interface Props {
  quizResult: IQuizResultInfo;
}

export const QuizResultItem = ({ quizResult }: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [removeQuizResult, { isLoading }] = useDeleteQuizResultMutation();

  const date = new Date(quizResult.ratingDate);

  return (
    <Loader isLoading={isLoading}>
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="w-[90%]">{quizResult.quiz.title}</CardTitle>
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
                    variant="destructive"
                    onPress={() => setIsOpenDialog(true)}
                  >
                    <Text>Remove</Text>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent>
          <View style={[styles.tagsContainer]}>
            <Chip value={quizResult?.quiz.status} />
            <Chip value={quizResult?.quiz.difficultyLevel} />
            <Chip icon={TrophyIcon} value={quizResult?.score} />
            {SecureStore.getItem(USER_ROLE) === "waiter" ? (
              <></>
            ) : (
              <Chip
                value={`${quizResult.user.lastName} ${quizResult.user.firstName}`}
              />
            )}
            <Chip
              icon={CalendarIcon}
              value={`${date.getDate()}.${
                date.getMonth() + 1
              }.${date.getFullYear()}`}
            />
          </View>
        </CardContent>
        <ConfirmationDialog
          title="Remove Quiz Result?"
          text="Are you sure?"
          action={() => removeQuizResult(quizResult.id)}
          close={() => setIsOpenDialog(false)}
          isOpen={isOpenDialog}
        />
      </Card>
    </Loader>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 16 },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 50,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
});

export default QuizResultItem;
