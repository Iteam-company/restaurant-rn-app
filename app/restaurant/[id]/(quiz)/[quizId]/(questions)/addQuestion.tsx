import Wrapper from "@/modules/common/components/Wrapper";
import AddQuestion from "@/modules/questions/components/AddQuestion/AddQuestion";
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddQuestionPage = () => {
  return (
    <Wrapper centered paddingOff>
      <AddQuestion />
    </Wrapper>
  );
};

export default AddQuestionPage;
