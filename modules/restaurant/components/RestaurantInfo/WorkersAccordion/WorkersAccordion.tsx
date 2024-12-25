import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { UserInfo } from "@/modules/common/types/user.types";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { List, useTheme } from "react-native-paper";

interface WorkersAccordionProps {
  workersList?: UserInfo[];
}

export const WorkersAccordion: FC<WorkersAccordionProps> = ({
  workersList,
}) => {
  const { colors } = useTheme();

  return (
    <View>
      <List.Accordion
        title="Workers list"
        style={[styles.accordion, { backgroundColor: colors.surface }]}
        left={(props) => (
          <IconSymbol
            {...props}
            size={25}
            name="person.2.fill"
            weight="medium"
            color={colors.primary}
          />
        )}
      >
        {workersList?.map((el) => (
          <List.Item
            title={el.firstName}
            description={el.email}
            key={el.id}
            style={{ backgroundColor: colors.surface }}
          />
        ))}
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderRadius: 15,
  },

  container: {
    width: "100%",
  },
  content: {
    width: "100%",
    flex: 1,
    padding: 16,
  },
  accordion: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
});
