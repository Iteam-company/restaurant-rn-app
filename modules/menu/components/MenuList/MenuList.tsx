import { View } from "react-native";
import { Title } from "react-native-paper";
import { useGetMenuQuery } from "../../redux/slices/menu-api";
import { useEffect } from "react";

export const MenuList = () => {
  const { data } = useGetMenuQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View>
      <Title>hvbbkhvbfgkhbbg</Title>
    </View>
  );
};
