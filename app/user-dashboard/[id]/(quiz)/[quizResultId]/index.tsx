import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const QuizResult = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Quiz Result Screen</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
});

export default QuizResult;
