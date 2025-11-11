import Wrapper from "@/components/Wrapper";
import useDebounce from "@/modules/common/hooks/useDebounce";

import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSearchUsersQuery } from "@/lib/redux/slices/user-api";
import { Input } from "@/components/ui/input";
import UserItem from "./UserItem";

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
    <Wrapper>
      <View className="w-screen p-4 box">
        <Input
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <FlatList
        className="w-screen"
        contentContainerClassName="px-4 gap-3"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        data={foundedUsers}
        refreshing={isLoading || isFetching}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => refetch()}
        renderItem={({ item }) => <UserItem userId={item.id.toString()} />}
      />
    </Wrapper>
  );
};

export default Workers;
