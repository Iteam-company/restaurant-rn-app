import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { USER_ROLE } from "@/modules/common/constants/api";
import { navigateToEditQuiz } from "@/modules/common/utils/flowNavigation";
import { statusIcons } from "@/modules/common/utils/menuUtils";
import { router, useGlobalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Chip,
  Icon,
  IconButton,
  Menu,
  Title,
  useTheme,
} from "react-native-paper";
import { useDeleteQuizMutation } from "../../redux/slices/quiz-api";
import { DifficultyLevelEnum, IQuizInfo } from "../../types";

type Params = {
  quiz: IQuizInfo;
};

const QuizItem = ({ quiz }: Params) => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();

  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const [deleteQuiz] = useDeleteQuizMutation();

  const { colors } = useTheme();

  const getColorForDifficulty = (level: DifficultyLevelEnum): string => {
    switch (level) {
      case DifficultyLevelEnum.EASY:
        return "green";
      case DifficultyLevelEnum.MEDIUM:
        return "orange";
      case DifficultyLevelEnum.HARD:
        return "red";
      default:
        return "gray";
    }
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleDeleteQuiz = () => {
    deleteQuiz(`${quiz.id}`);
  };

  return (
    <Card
      style={styles.container}
      onPress={() =>
        router.push({
          pathname:
            SecureStore.getItem(USER_ROLE) === "waiter"
              ? "/user-dashboard/[id]/(quiz)/[quizId]/(take-quiz)"
              : `/restaurant/[id]/(quiz)/[quizId]/(questions)`,
          params: { id: restaurantId, quizId: quiz.id },
        })
      }
    >
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>{quiz.title}</Title>
          {SecureStore.getItem(USER_ROLE) === "waiter" ? (
            <></>
          ) : (
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
                  navigateToEditQuiz(quiz.id, restaurantId);
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
                onPress={() => {
                  closeMenu();
                  setIsOpenDialog(true);
                }}
              />
            </Menu>
          )}
        </View>
        <View style={styles.tagsContainer}>
          <Chip
            mode="outlined"
            textStyle={styles.chipText}
            icon={({ size, color }) => (
              <Icon
                source={statusIcons[quiz.status]}
                size={size}
                color={color}
              />
            )}
          >
            {quiz.status}
          </Chip>
          <Chip
            mode="outlined"
            textStyle={styles.chipText}
            style={{ borderColor: getColorForDifficulty(quiz.difficultyLevel) }}
          >
            {quiz.difficultyLevel}
          </Chip>
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
  },
  title: { flex: 1 },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  chipText: {
    fontSize: 12,
  },
});

export default QuizItem;
