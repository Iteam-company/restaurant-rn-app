import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator } from "react-native-paper";
import Wrapper from "@/modules/common/components/Wrapper";

export default function HomeScreen() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.push("/auth/signin");
    }, [router])
  );

  return (
    <Wrapper>
      <ActivityIndicator animating />
    </Wrapper>
  );
}
