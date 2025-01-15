import { ScrollView } from "react-native-gesture-handler";
import { DifficultyLevelEnum, IQuizInfo } from "../../types";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Chip,
  Icon,
  IconButton,
  Menu,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import {
  categoryIcons,
  statusIcons,
} from "@/modules/menu/components/MenuList/utils";
import { useState } from "react";
import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";

type Params = {
  quiz: IQuizInfo;
};

const QuizItem = ({ quiz }: Params) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);

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
    console.log("ToDo delete quiz");
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Title>{quiz.title}</Title>

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
  },
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
