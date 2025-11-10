import React, { useEffect } from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import SignUpForm from "@/pages/SignUp";
import { resetStore } from "@/modules/common/constants/resetStore";

export default function Signup() {
  useEffect(() => {
    resetStore();
  }, []);

  return (
    <Wrapper centered isScrollable>
      <SignUpForm />
    </Wrapper>
  );
}
