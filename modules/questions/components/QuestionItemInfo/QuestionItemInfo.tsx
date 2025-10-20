import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { navigateToEditQuestion } from "@/modules/common/utils/flowNavigation";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Title,
  useTheme,
} from "react-native-paper";
import {
  useDeleteQuestionMutation,
  useGetOneQuestionQuery,
} from "../../redux/slices/question-api";

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
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);
  const { colors } = useTheme();

  const [removeQuestion] = useDeleteQuestionMutation();

  const { data, isLoading: isLoadingData } = useGetOneQuestionQuery(questionId);

  if (isLoadingData)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <View style={styles.scrollContainer}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <Title>{data?.text}</Title>
          <View>
            {data?.variants.map((elem, index) => (
              <Checkbox.Item
                key={index}
                disabled={true}
                label={elem}
                status={
                  data.correct.findIndex((elem) => elem === index) !== -1
                    ? "checked"
                    : "unchecked"
                }
              />
            ))}
          </View>
        </View>
        <Button
          mode="elevated"
          onPress={() =>
            navigateToEditQuestion(questionId, quizId, restaurantId)
          }
        >
          Edit
        </Button>
        <Button
          mode="outlined"
          labelStyle={{ color: colors.error }}
          onPress={() => setIsOpenDialog(true)}
        >
          Delete
        </Button>
      </View>
      <ConfirmationDialog
        title="Delete Question?"
        text={`Are you sure you want to delete "${data?.text}"? This action cannot be undone.`}
        action={async () => {
          await removeQuestion(data?.id || 0);
        }}
        close={() => {
          setIsOpenDialog(false);
        }}
        isOpen={isOpenDialg}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },

  container: {
    width: "100%",
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
});

export default QuestionItemInfo;
