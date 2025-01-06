import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { useDeleteMenuItemMutation } from "@/modules/menu/redux/slices/menu-api";
import { useLocalSearchParams, usePathname } from "expo-router";
import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Title,
  Text,
  IconButton,
  Menu,
  useTheme,
  Divider,
} from "react-native-paper";

interface MenuItemCardProps {
  id: number;
  name: string;
  ingredients: string;
  price: number;
}

export const MenuItemCard: FC<MenuItemCardProps> = ({
  id,
  name,
  ingredients,
  price,
}) => {
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const { colors } = useTheme();
  const [isOpenDialg, setIsOpenDialog] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const [deleteMenuItem] = useDeleteMenuItemMutation<RTKMutationPayloadType>();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleDeleteMenuItem = () => {
    deleteMenuItem({ menuId, itemId: id });
  };
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.infoContainer}>
          <Text variant="titleLarge" style={styles.name}>
            {name}
          </Text>
          <Text
            variant="bodyMedium"
            style={styles.ingredients}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ingredients}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={openMenu}
                size={20}
                style={styles.iconButton}
              />
            }
            anchorPosition="bottom"
          >
            <Menu.Item
              title="Edit"
              leadingIcon="pencil-outline"
              onPress={() => {}}
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
                setIsOpenDialog(true);
              }}
            />
          </Menu>
          <Text variant="titleMedium" style={styles.price}>
            ${price.toFixed(2)}
          </Text>
        </View>
      </Card.Content>
      <ConfirmationDialog
        title="Delete Menu Item?"
        text={`Are you sure you want to delete ${name} ? This action cannot be undone.`}
        action={handleDeleteMenuItem}
        close={() => {
          setIsOpenDialog(false);
        }}
        isOpen={isOpenDialg}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 12,
    paddingBottom: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  infoContainer: {
    flex: 1,
  },
  rightContainer: {
    alignItems: "flex-end",
    paddingLeft: 16,
  },
  iconButton: {
    margin: 0,
    marginTop: -8,
    marginRight: -8,
  },
  name: {
    marginBottom: 4,
  },
  ingredients: {
    color: "#666666",
  },
  price: {
    color: "#235e26",
    marginTop: 8,
  },
});
