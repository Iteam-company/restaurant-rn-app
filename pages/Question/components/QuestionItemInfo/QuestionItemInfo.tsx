import { navigateToEditQuestion } from "@/modules/common/utils/flowNavigation";
import { useGlobalSearchParams, router } from "expo-router";
import { ScrollView, View } from "react-native";
import {
  useDeleteQuestionMutation,
  useGetOneQuestionQuery,
} from "../../../../lib/redux/slices/question-api";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import Loader from "@/components/loader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";

const QuestionItemInfo = () => {
  const {
    id: restaurantId,
    quizId,
    questionId,
  } = useGlobalSearchParams<{
    id: string;
    quizId: string;
    questionId: string;
  }>();

  const [removeQuestion] = useDeleteQuestionMutation();

  const { data, isLoading: isLoadingData } = useGetOneQuestionQuery(questionId);

  if (isLoadingData) return <Loader />;

  return (
    <ScrollView
      className="w-full bg-background"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <View className="py-5 px-4 w-full gap-4">
          <View className="w-full p-4 py-6 rounded-3xl">
            <Text className="font-bold text-xl mb-2">{data?.text}</Text>
            <View className="gap-3 mt-4 w-full">
              {data?.variants.map((elem, index) => {
                const isCorrect = data.correct.includes(index);
                return (
                  <View
                    key={index}
                    className="flex-1 p-2 flex-row items-center gap-3 px-4 border rounded-md w-full"
                  >
                    <Checkbox
                      disabled={true}
                      checked={isCorrect}
                      onCheckedChange={() =>
                        data.correct.findIndex((elem) => elem === index) !== -1
                          ? true
                          : false
                      }
                    />
                    <Text className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {elem}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Button
            onPress={() =>
              navigateToEditQuestion(questionId, quizId, restaurantId)
            }
          >
            <Text className="text-primary-foreground font-semibold">Edit</Text>
          </Button>
          <ConfirmationDialog
            title="Delete this Question?"
            text={`Are you sure you want to delete "${data?.text}"? This action cannot be undone.`}
            action={async () => {
              await removeQuestion(data?.id || 0);
              router.back();
            }}
          >
            <View pointerEvents="none">
              <Button className="bg-destructive w-full">
                <Text className="text-primary-foreground font-semibold">
                  Delete
                </Text>
              </Button>
            </View>
          </ConfirmationDialog>
          <Button variant="outline" onPress={() => router.back()}>
            <Text>Back</Text>
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
};

export default QuestionItemInfo;
