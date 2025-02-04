import { statusIcons } from "@/modules/menu/components/MenuList/utils";
import {
  DifficultyLevelEnum,
  IQuizResultInfo,
  StatusEnum,
} from "@/modules/quiz/types";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Card,
  Chip,
  IconButton,
  Menu,
  Title,
  useTheme,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";
import { useDeleteQuizResultMutation } from "@/modules/quiz/redux/slices/quiz-api";
import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";

interface Props {
  quizResult: IQuizResultInfo;
}

export const QuizResultItem = ({ quizResult }: Props) => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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

  const [removeQuizResult, { isLoading }] = useDeleteQuizResultMutation();

  const date = new Date(quizResult.raitingDate);

  return (
    <Card
      style={styles.container}
      onPress={() =>
        router.push({
          pathname:
            SecureStore.getItem(USER_ROLE) === "waiter"
              ? "/user-dashboard/[id]/(quiz)/(quizResult)/[quizResultId]/(quizResult)/quizResultDetails/quizResultDetails"
              : "/restaurant/[id]/(quiz)/(quizResult)/[quizResultId]/quizResultDetailsPage",
          params: { id: restaurantId, quizResultId: quizResult.id },
        })
      }
    >
      <Card.Content>
        {!isLoading ? (
          <>
            <View
              style={[
                styles.headerContainer,
                {
                  height:
                    SecureStore.getItem(USER_ROLE) === "waiter" ? "auto" : 40,
                },
              ]}
            >
              <Title>{quizResult.quiz.title}</Title>
              {SecureStore.getItem(USER_ROLE) === "waiter" ? (
                <></>
              ) : (
                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      onPress={openMenu}
                      size={20}
                    />
                  }
                  anchorPosition="bottom"
                >
                  <Menu.Item
                    theme={{
                      colors: {
                        onSurfaceVariant: colors.error,
                      },
                    }}
                    titleStyle={{ color: colors.error }}
                    leadingIcon="trash-can-outline"
                    onPress={() => setIsOpenDialog(true)}
                    title="Remove"
                  />
                </Menu>
              )}
            </View>
            <View
              style={[
                styles.tagsContainer,
                {
                  height:
                    SecureStore.getItem(USER_ROLE) === "waiter" ? 50 : 100,
                },
              ]}
            >
              <Chip icon="trophy" mode="outlined">
                {quizResult?.score}
              </Chip>
              <Chip
                mode="outlined"
                style={[
                  {
                    borderColor: getColorForDifficulty(
                      quizResult?.quiz.difficultyLevel ||
                        DifficultyLevelEnum.EASY
                    ),
                  },
                ]}
              >
                {quizResult?.quiz.difficultyLevel}
              </Chip>
              <Chip
                icon={
                  statusIcons[quizResult?.quiz.status || StatusEnum.NOT_STARTED]
                }
                mode="outlined"
              >
                {quizResult?.quiz.status || "Active"}
              </Chip>
              {SecureStore.getItem(USER_ROLE) === "waiter" ? (
                <></>
              ) : (
                <Chip
                  icon="account"
                  mode="outlined"
                >{`${quizResult.user.firstName} ${quizResult.user.lastName}`}</Chip>
              )}
              <Chip icon="calendar" mode="outlined">{`${date.getDate()}.${
                date.getMonth() + 1
              }.${date.getFullYear()}`}</Chip>
            </View>
          </>
        ) : (
          <ActivityIndicator animating={true} color={"#7c8ebf"} />
        )}
      </Card.Content>
      <ConfirmationDialog
        title="Remove Quiz Result?"
        text="Are you sure?"
        action={() => removeQuizResult(quizResult.id)}
        close={() => setIsOpenDialog(false)}
        isOpen={isOpenDialog}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},

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
