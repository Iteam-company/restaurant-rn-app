import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { navigateToEditQuestion } from "@/modules/common/utils/flowNavigation";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Chip,
  IconButton,
  Menu,
  Title,
  useTheme,
} from "react-native-paper";
import { useDeleteQuestionMutation } from "../../redux/slices/question-api";
import { IQuestionInfo } from "../../types";

type Props = {
  question: IQuestionInfo;
};

const QuestionItem = ({ question }: Props) => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();

  const [removeQuestion, { isLoading }] = useDeleteQuestionMutation();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Card
      style={styles.container}
      onPress={() =>
        router.push({
          pathname:
            "/restaurant/[id]/(quiz)/[quizId]/(questions)/[questionId]/questionItemInfo",
          params: { id: restaurantId, quizId, questionId: question.id },
        })
      }
    >
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={{ width: "90%" }}>{question.text}</Title>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" onPress={openMenu} size={20} />
            }
            anchorPosition="bottom"
          >
            <Menu.Item
              title="Edit"
              leadingIcon="pencil-outline"
              onPress={() => {
                navigateToEditQuestion(question.id, quizId, restaurantId);
                closeMenu();
              }}
            />
            <Menu.Item
              title="Delete"
              leadingIcon="trash-can-outline"
              titleStyle={{ color: colors.error }}
              theme={{
                colors: {
                  onSurfaceVariant: colors.error,
                },
              }}
              onPress={async () => {
                setIsOpenDialog(true);
                closeMenu();
              }}
            />
          </Menu>
        </View>
        <View style={styles.tagContainer}>
          <Chip icon="counter" mode="outlined" onPress={() => {}}>
            Count: {question.variants.length}
          </Chip>
          <Chip icon="check-circle-outline" mode="outlined" onPress={() => {}}>
            {question.multipleCorrect ? "Multiple" : "Single"}
          </Chip>
        </View>
        <ConfirmationDialog
          title="Delete Question?"
          text={`Are you sure you want to delete "${question.text}"? This action cannot be undone.`}
          action={async () => {
            await removeQuestion(question.id);
          }}
          close={() => {
            setIsOpenDialog(false);
          }}
          isOpen={isOpenDialg}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tagContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 8,
  },
});

export default QuestionItem;
