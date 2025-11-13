import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { navigateToEditQuestion } from "@/modules/common/utils/flowNavigation";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { useDeleteQuestionMutation } from "../../lib/redux/slices/question-api";
import { IQuestionInfo } from "@/lib/redux/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chip from "@/components/chip";
import {
  CheckCircleIcon,
  CircleQuestionMarkIcon,
  MenuIcon,
} from "lucide-react-native";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";

type Props = {
  question: IQuestionInfo;
};

const QuestionItem = ({ question }: Props) => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const [removeQuestion] = useDeleteQuestionMutation();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname:
            "/admin-dashboard/[id]/(quiz)/[quizId]/(questions)/[questionId]/questionItemInfo",
          params: { id: restaurantId, quizId, questionId: question.id },
        })
      }
    >
      <Card className="gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="w-[90%]">{question.text}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onPress={() => {
                    navigateToEditQuestion(question.id, quizId, restaurantId);
                  }}
                >
                  <Text>Edit</Text>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onPress={async () => {
                    setIsOpenDialog(true);
                  }}
                >
                  <Text>Delete</Text>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex flex-row gap-2">
          <Chip
            icon={CircleQuestionMarkIcon}
            value={` Count: ${question.variants.length}`}
          />
          <Chip
            icon={CheckCircleIcon}
            value={question.multipleCorrect ? "Multiple" : "Single"}
          />

          <ConfirmationDialog
            title="Delete Question?"
            text={`Are you sure you want to delete "${question.text}"? This action cannot be undone.`}
            action={async () => {
              await removeQuestion(question.id);
            }}
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

export default QuestionItem;
