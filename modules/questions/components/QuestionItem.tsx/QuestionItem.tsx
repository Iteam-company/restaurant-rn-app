import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IQuestionInfo } from "../../types";
import {
  Card,
  Chip,
  IconButton,
  Menu,
  Title,
  useTheme,
} from "react-native-paper";

type Props = {
  question: IQuestionInfo;
};

const QuestionItem = ({ question }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Card style={styles.container}>
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
                console.log("ToDo");
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
                console.log("ToDo");
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
