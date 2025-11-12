import useDebounce from "@/modules/common/hooks/useDebounce";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSearchUsersQuery } from "@/lib/redux/slices/user-api";
import { Input } from "@/components/ui/input";
import UserItem from "./UserItem";
import { Separator } from "@/components/ui/separator";

const Workers = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();

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
        className="w-full py-4"
        contentContainerClassName="gap-3"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        data={foundedUsers}
        refreshing={isLoading || isFetching}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => refetch()}
        renderItem={({ item }) => <UserItem userId={item.id.toString()} />}
      />
    </>
  );
};

export default Workers;
