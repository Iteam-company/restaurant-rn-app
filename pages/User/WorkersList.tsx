import useDebounce from "@/modules/common/hooks/useDebounce";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSearchUsersQuery } from "@/lib/redux/slices/user-api";
import { Input } from "@/components/ui/input";
import UserCard from "./UserCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { navigateToCreateUser } from "@/modules/common/utils/flowNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useIos26 from "@/lib/hook/useIos26";

const Workers = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();
  const { isIOS26 } = useIos26();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const {
    data: foundedUsers,
    isLoading,
    isFetching,
    refetch,
  } = useSearchUsersQuery({
    search: debouncedSearchTerm,
    restaurantId,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <>
      <Input
        className="mt-4 mb-2"
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <Separator className="w-screen" />
      <FlatList
        className="w-full py-3"
        contentContainerClassName="gap-3"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        data={foundedUsers}
        refreshing={isLoading || isFetching}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <>
            <UserCard userId={item.id.toString()} />
            <Separator className="mt-3" />
          </>
        )}
      />
      <View
        className="w-full"
        style={[
          isIOS26
            ? {
                paddingBottom: bottom + 60,
              }
            : { paddingBottom: 16 },
        ]}
      >
        <Button
          className="w-full"
          onPress={() => navigateToCreateUser(restaurantId)}
        >
          <Text className="text-center">Create New User</Text>
        </Button>
      </View>
    </>
  );
};

export default Workers;
