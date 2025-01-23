import React, { useEffect } from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import SignUpForm from "@/modules/auth/components/SignUpForm/SignUpForm";
import { resetStore } from "@/modules/common/constants/resetStore";

export default function Signup() {
  useEffect(() => {
    resetStore();
  }, []);

  return (
    <Wrapper centered>
      <SignUpForm />
    </Wrapper>
  );
}
