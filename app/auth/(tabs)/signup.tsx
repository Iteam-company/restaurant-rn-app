import { View, Text } from 'react-native';
import React from 'react';
import Wrapper from '@/modules/common/components/Wrapper';
import SiginInForm from '@/modules/auth/components/SignInForm/SiginInForm';

export default function Signup() {
  return (
    <Wrapper centered>
      <SiginInForm />
    </Wrapper>
  );
}
