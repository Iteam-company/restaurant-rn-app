import { useValidateTokenQuery } from "@/modules/auth/redux/slices/auth-api";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
} from "@/modules/common/redux/slices/user-api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Surface,
  Text,
  Title,
  Avatar,
  Divider,
  Icon,
  useTheme,
  Button,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "@/modules/common/constants/api";
import TabBarOffset from "@/modules/common/components/TabBarOffset";

const CurrentUserInfo = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { data: currentUser } = useValidateTokenQuery();
  const { data } = useGetCurrentUserQuery();

  if (!data) return null;

  const InfoBlock = ({
    icon,
    label,
    value,
  }: {
    icon: string;
    label: string;
    value: string;
  }) => (
    <Surface style={styles.infoBlock}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.secondaryContainer },
        ]}
      >
        <Icon source={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="labelLarge"
          style={[styles.label, { color: colors.primary }]}
        >
          {label}
        </Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </Surface>
  );

  function handleLogOut() {
    SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);

    router.push("/auth/(tabs)/signin");
  }

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <View style={styles.container}>
        <Surface style={styles.headerSurface}>
          <View style={styles.header}>
            {data.icon ? (
              <Avatar.Image size={100} source={{ uri: data.icon }} />
            ) : (
              <Avatar.Text
                size={100}
                label={`${data.firstName.charAt(0)}${data.lastName.charAt(0)}`}
              />
            )}
            <Title
              style={styles.name}
            >{`${data.firstName} ${data.lastName}`}</Title>
            <Surface
              style={[
                styles.roleContainer,
                { backgroundColor: colors.secondaryContainer },
              ]}
            >
              <Icon
                source="badge-account-horizontal"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.role}>{data.role}</Text>
            </Surface>
          </View>
        </Surface>

        <View style={styles.infoGrid}>
          <InfoBlock icon="account" label="Username" value={data.username} />

          <InfoBlock icon="email" label="Email" value={data.email} />

          <InfoBlock icon="phone" label="Phone" value={data.phoneNumber} />

          <InfoBlock
            icon="card-account-details"
            label="ID"
            value={data.id.toString()}
          />
        </View>

        <Button
          onPress={handleLogOut}
          style={[styles.logOutButton]}
          labelStyle={styles.logOutLabel}
        >
          Log out
        </Button>
      </View>
      <TabBarOffset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    paddingVertical: 16,
  },
  headerSurface: {
    padding: 24,
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  role: {
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },
  infoGrid: {
    marginVertical: 16,
    gap: 16,
  },
  infoBlock: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 18,
    color: "#fff",
  },
  logOutButton: {
    borderColor: "#E16D7A",
    paddingVertical: 5,
    borderRadius: 40,
    borderWidth: 1,
  },
  logOutLabel: {
    color: "#E16D7A",
  },
});

export default CurrentUserInfo;
