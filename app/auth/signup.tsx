import React, { useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import SignUpForm from "@/pages/SignUp";
import { resetStore } from "@/modules/common/constants/resetStore";

export default function Signup() {
  useEffect(() => {
    resetStore();
  }, []);

  return (
    <Wrapper isScrollable>
      <SignUpForm />
    </Wrapper>
  );
}
