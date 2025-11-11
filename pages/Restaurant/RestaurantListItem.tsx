import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { navigateToEditRestaurant } from "@/modules/common/utils/flowNavigation";
import { useDeleteRestaurantMutation } from "@/lib/redux/slices/restaurant-api";
import { FC, useState } from "react";
import { Image, View } from "react-native";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { MenuIcon, UserIcon } from "lucide-react-native";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const insets = useSafeAreaInsets();

  const [deleteRestaurant] = useDeleteRestaurantMutation();

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = (restaurantId: number) => {
    deleteRestaurant(restaurantId);
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    navigateToEditRestaurant(id);
  };

  return (
    <>
      <Card className="pt-0">
        <AspectRatio
          ratio={16 / 9}
          className="relative aspect-video w-full overflow-hidden rounded-md"
        >
          {image ? (
            <Image
              source={{ uri: image }}
              className="absolute bottom-0 left-0 right-0 top-0 object-cover w-full h-full"
            />
          ) : (
            <Image
              source={require("@/assets/images/mock/restaurant-mock.jpg")}
              className="absolute bottom-0 left-0 right-0 top-0 object-cover w-full h-full"
            />
          )}
        </AspectRatio>
        <CardHeader className="flex flex-row justify-between">
          <View>
            <Text variant="h4">{name}</Text>
            <Text variant="muted" className="text-muted-foreground">
              {address}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Text>{workersCount}</Text>
            <UserIcon size={25} />
          </View>
        </CardHeader>
        <CardContent className="flex flex-row justify-between">
          <Button
            onPress={() => {
              router.push({
                pathname: "/admin-dashboard/[id]/(quiz)",
                params: { id },
              });
            }}
          >
            <Text>View Details</Text>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MenuIcon size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent insets={insets}>
              <DropdownMenuGroup>
                <DropdownMenuItem onPress={handleEdit}>
                  <Text>Edit</Text>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onPress={handleDelete}>
                  <Text>Delete</Text>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
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
    </>
  );
};
