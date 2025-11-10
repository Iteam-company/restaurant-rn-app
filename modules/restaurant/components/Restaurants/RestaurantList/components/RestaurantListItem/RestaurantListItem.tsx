import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { navigateToEditRestaurant } from "@/modules/common/utils/flowNavigation";
import { useDeleteRestaurantMutation } from "@/lib/redux/slices/restaurant-api";
import { router } from "expo-router";
import { FC, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Menu,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";

interface RestaurantListItemProps {
  id: number;
  image?: string;
  name: string;
  workersCount: number;
  address: string;
}

export const RestaurantListItem: FC<RestaurantListItemProps> = ({
  id,
  address,
  name,
  workersCount,
  image,
}) => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [deleteRestaurant] = useDeleteRestaurantMutation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDelete = () => {
    closeMenu();
    setShowDeleteDialog(true);
  };

  const confirmDelete = (restaurantId: number) => {
    deleteRestaurant(restaurantId);
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    closeMenu();
    navigateToEditRestaurant(id);
  };

  return (
    <>
      <Card style={styles.card}>
        {image ? (
          <Card.Cover source={{ uri: image }} style={styles.cardImage} />
        ) : (
          <Card.Cover
            source={require("@/assets/images/mock/premium_photo-1661883237884-263e8de8869b.jpg")}
            style={styles.cardImage}
          />
        )}
        <Card.Content style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <Title style={styles.titleLeft}>{name}</Title>
            <View style={styles.workers}>
              <Title style={styles.workersTitle}>{workersCount}</Title>
              <IconSymbol
                size={25}
                name="person.2.fill"
                weight="medium"
                color={colors.primary}
              />
            </View>
          </View>
          <Paragraph style={styles.address}>{address}</Paragraph>
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => {
                router.push({
                  pathname: "/admin-dashboard/(tabs)/restaurants/[id]/(quiz)",
                  params: { id },
                });
              }}
            >
              View Details
            </Button>

            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconButton icon="dots-vertical" onPress={openMenu} size={20} />
              }
            >
              <Menu.Item
                onPress={handleEdit}
                title="Edit"
                leadingIcon="pencil-outline"
              />
              <Divider />
              <Menu.Item
                onPress={handleDelete}
                title="Delete"
                leadingIcon="trash-can-outline"
                titleStyle={{ color: colors.error }}
                theme={{
                  colors: {
                    onSurfaceVariant: colors.error,
                  },
                }}
              />
            </Menu>
          </View>
        </Card.Content>
      </Card>

      <ConfirmationDialog
        text={`Are you sure you want to delete ${name}? This action cannot be undone.`}
        action={() => {
          confirmDelete(id);
        }}
        close={() => {
          setShowDeleteDialog(false);
        }}
        isOpen={showDeleteDialog}
      />

      {/* <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={hideDeleteDialog}
          style={styles.dialog}
        >
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
             
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDeleteDialog}>Cancel</Button>
            <Button
              textColor={colors.error}
              onPress={() => {
               
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
    </>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    width: windowWidth - 40,
    marginBottom: 20,
    overflow: "hidden",
    borderRadius: 14,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderRadius: 14,
  },
  cardContent: {
    width: "100%",
    padding: 16,
  },
  address: {
    color: "#666",
    marginBottom: 16,
  },
  button: {
    alignSelf: "flex-start",
  },
  titleLeft: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    marginRight: 10,
  },
  titleRight: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    textAlign: "right",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  workersTitle: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    padding: 8,
  },
});
