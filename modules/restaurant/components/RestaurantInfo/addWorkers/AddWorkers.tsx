import useDebounce from "@/modules/common/hooks/useDebounce";
import { useSearchUsersQuery } from "@/modules/common/redux/slices/user-api";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Searchbar, Title } from "react-native-paper";

const AddWorkers = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data, isLoading } = useSearchUsersQuery({
    search: debouncedSearchTerm,
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    console.log(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return <View>Add worker form</View>;
};

export default AddWorkers;
