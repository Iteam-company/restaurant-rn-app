import { Slot, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";
import React from "react";

export default function QuizLayout() {
  const router = useRouter();

  return (
    <>
      <Slot />
    </>
  );
}
