import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ICreateQuestionDTO, IQuestionInfo } from "../../types";
import {
  Checkbox,
  IconButton,
  Menu,
  Title,
  useTheme,
} from "react-native-paper";
import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { IQuizInfo } from "@/modules/quiz/types";

interface Props {
  question: ICreateQuestionDTO;
  onChange?: (params: ICreateQuestionDTO) => void;
}

const QuestionElement = ({ question, onChange }: Props) => {
  const { colors } = useTheme();
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleOnChange = (values: {
    variants: string[];
    correct: number[];
  }) => {
    onChange && onChange({ ...question, ...values });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.headerContainer}>
        <Title style={styles.headerTitle}>{question.text}</Title>
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
            onPress={async () => {
              setIsOpenDialog(true);
              closeMenu();
            }}
          />
        </Menu>
      </View>
      <VariantsCreator
        value={{ variants: question.variants, corrects: question.correct }}
        onChange={handleOnChange}
      />
      {/* <View>
        {question?.variants.map((elem, index) => (
          <Checkbox.Item
            key={index}
            disabled={true}
            label={elem}
            status={
              question.correct.findIndex((elem) => elem === index) !== -1
                ? "checked"
                : "unchecked"
            }
          />
        ))}
      </View> */}

      <ConfirmationDialog
        title="Delete Question?"
        text={`Are you sure you want to delete "${question.text}"? This action cannot be undone.`}
        action={async () => {
          console.log("remove");
        }}
        close={() => {
          setIsOpenDialog(false);
        }}
        isOpen={isOpenDialg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 24,
    padding: 16,
    gap: 16,
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerTitle: {
    width: "85%",
  },
});

export default QuestionElement;
