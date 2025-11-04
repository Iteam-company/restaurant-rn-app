import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu, TextInput, useTheme } from "react-native-paper";
import { ICreateQuestionDTO } from "../../types";

interface Props {
  question: ICreateQuestionDTO;
  onChange?: (params: ICreateQuestionDTO) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const QuestionElement = ({ question, onChange, onDelete, disabled }: Props) => {
  const { colors } = useTheme();
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleTextChange = useCallback(
    (text: string) => {
      onChange && onChange({ ...question, text });
    },
    [onChange, question]
  );

  const handleOnChange = useCallback(
    (values: { variants: string[]; correct: number[] }) => {
      onChange && onChange({ ...question, ...values });
    },
    [onChange, question]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <TextInput
            mode="outlined"
            label="Question Text"
            value={question.text}
            onChangeText={handleTextChange}
            style={styles.textInput}
            multiline
            disabled={disabled}
          />
        </View>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton icon="dots-vertical" onPress={openMenu} size={20} />
          }
          anchorPosition="bottom"
        >
          <Menu.Item
            disabled={disabled}
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
        disabled={disabled}
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
        action={() => {
          onDelete && onDelete();
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
    alignItems: "flex-start",
    gap: 8,
  },
  titleContainer: {
    flex: 1,
  },
  textInput: {
    flex: 1,
  },
});

export default QuestionElement;
