import React, { useEffect } from "react";

import Wrapper from "@/modules/common/components/Wrapper";
import SiginInForm from "@/modules/auth/components/SignInForm/SiginInForm";
import { resetStore } from "@/modules/common/constants/resetStore";

export default function Signin() {
  useEffect(() => {
    resetStore();
  }, []);

  return (
    <Wrapper centered>
      <SiginInForm />
    </Wrapper>
  );
}
