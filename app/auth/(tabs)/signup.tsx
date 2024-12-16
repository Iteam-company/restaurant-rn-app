import { View, Text } from "react-native";
import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import SiginInForm from "@/modules/auth/components/SignInForm/SiginInForm";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Signup() {
  return (
    <Wrapper centered>
      <SiginInForm />
    </Wrapper>
  );
}
