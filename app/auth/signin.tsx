import { useEffect } from "react";

import Wrapper from "@/components/Wrapper";
import SignInForm from "@/pages/SignIn";
import { resetStore } from "@/constants/resetStore";

export default function Signin() {
  useEffect(() => {
    resetStore();
  }, []);

  return (
    <Wrapper>
      <SignInForm />
    </Wrapper>
  );
}
