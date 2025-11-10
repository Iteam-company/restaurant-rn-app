import { useEffect } from "react";

import Wrapper from "@/modules/common/components/Wrapper";
import SignInForm from "@/pages/SignIn";
import { resetStore } from "@/modules/common/constants/resetStore";

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
