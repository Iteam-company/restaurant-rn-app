import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Button,
  Chip,
  Title,
  useTheme,
} from "react-native-paper";
import { router, useGlobalSearchParams } from "expo-router";
import { useGetQuizResultQuery } from "@/modules/quiz/redux/slices/quiz-api";
import { DifficultyLevelEnum, StatusEnum } from "@/modules/quiz/types";
import { statusIcons } from "@/modules/menu/components/MenuList/utils";
import Wrapper from "@/modules/common/components/Wrapper";
import QuizResultDetails from "@/modules/quiz/components/quizResult/QuizResultDetails/QuizResultDetails";

const QuizResult = () => {
  return (
    <Wrapper paddingOff>
      <QuizResultDetails />
    </Wrapper>
  );
};

export default QuizResult;
