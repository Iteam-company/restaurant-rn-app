import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme, List, Title, FAB } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import Feather from "@expo/vector-icons/Feather";
import {
  useGetRestaurantQuery,
  useRemoveWorkerMutation,
} from "@/modules/restaurant/redux/slices/restaurant-api";

const Workers = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  const { data, isLoading } = useGetRestaurantQuery(id as string);

  const [deleteWorker] = useRemoveWorkerMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Wrapper centered>
        <View style={styles.contant}>
          {data && data?.workers.length > 0 ? (
            data?.workers.map((el) => (
              <List.Item
                key={el.id}
                title={el.firstName}
                description={el.email}
                left={(props) => (
                  <Feather
                    {...props}
                    name="user"
                    size={24}
                    color={colors.primary}
                  />
                )}
                right={(props) => (
                  <Feather
                    {...props}
                    name="trash-2"
                    size={24}
                    color={colors.error}
                    onPress={() => {
                      deleteWorker({
                        restaurantId: el.id,
                        userId: parseInt(id as string),
                      });
                    }}
                  />
                )}
              />
            ))
          ) : (
            <Title>We don`t have workers now :(</Title>
          )}
        </View>
        <FAB
          icon="plus"
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            router.push({
              pathname: "/restaurant/[id]/(workers)/addWorker",
              params: { id: id as string },
            });
          }}
        />
      </Wrapper>
    </>
  );
};

export default Workers;

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contant: {
    width: "100%",
  },
});
