import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { RTKMutationPayloadType } from "@/modules/common/types";
import {
  useDeleteMenuConnectionMutation,
  useDeleteMenuMutation,
} from "@/modules/menu/redux/slices/menu-api";
import { CategoriesEnum, SeasonsEnum } from "@/modules/menu/types";
import { router, useLocalSearchParams } from "expo-router";
import React, { FC, useState } from "react";
import { View, StyleSheet, ScrollViewBase } from "react-native";
import {
  Card,
  Chip,
  Icon,
  IconButton,
  Menu,
  Title,
  useTheme,
} from "react-native-paper";

interface MenuCardProps {
  id: number;
  title: string;
  category: CategoriesEnum;
  season: SeasonsEnum;
}

const seasonIcons: Record<SeasonsEnum, string> = {
  [SeasonsEnum.WINTER]: "snowflake",
  [SeasonsEnum.SPRING]: "flower",
  [SeasonsEnum.SUMMER]: "white-balance-sunny",
  [SeasonsEnum.FALL]: "leaf",
};

const categoryIcons: Record<CategoriesEnum, string> = {
  [CategoriesEnum.APPETIZERS]: "silverware-variant",
  [CategoriesEnum.MAIN_COURSES]: "food-variant",
  [CategoriesEnum.DESSERTS]: "cake-variant",
};

export const MenuCard: FC<MenuCardProps> = ({
  id,
  title,
  category,
  season,
}) => {
  const { id: restaurantId } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const [deleteMenuConnection, { isLoading: isDisconnecting }] =
    useDeleteMenuConnectionMutation<RTKMutationPayloadType>();
  const [deleteMenu, { isLoading: isDeleting }] =
    useDeleteMenuMutation<RTKMutationPayloadType>();
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleDeleteMenu = () => {
    deleteMenuConnection({ restaurantId, menuId: id });
    deleteMenu(id);
  };
  return (
    <View>
      <Card
        style={styles.card}
        onPress={() => {
          router.push(`./menu/${id}`);
        }}
      >
        <Card.Content>
          <View style={styles.headerContainer}>
            <Title>{title}</Title>

            <View style={styles.menuContainer}>
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
                contentStyle={styles.menuContent}
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
          </View>

          <View style={styles.tagsContainer}>
            <Chip
              mode="outlined"
              textStyle={styles.chipText}
              icon={({ size, color }) => (
                <Icon
                  source={categoryIcons[category]}
                  size={size}
                  color={color}
                />
              )}
            >
              {category}
            </Chip>

            <Chip
              mode="outlined"
              textStyle={styles.chipText}
              icon={({ size, color }) => (
                <Icon source={seasonIcons[season]} size={size} color={color} />
              )}
            >
              {season}
            </Chip>
          </View>
        </Card.Content>
      </Card>
      <ConfirmationDialog
        title="Delete Menu?"
        text={`Are you sure you want to delete ${title} ? This action cannot be undone.`}
        action={handleDeleteMenu}
        close={() => {
          setIsOpenDialog(false);
        }}
        isOpen={isOpenDialg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    margin: 8,
    elevation: 4,
    borderRadius: 12,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  menuContainer: {},
  menuContent: {},
  tagsContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  chipText: {
    fontSize: 12,
  },
});
