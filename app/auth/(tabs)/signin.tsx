import { View, StyleSheet } from 'react-native';
import React from 'react';

import Wrapper from '@/modules/common/components/Wrapper';
import SignUpForm from '@/modules/auth/components/SignUpForm/SignUpForm';

export default function Signin() {
  return (
    <Wrapper centered>
      <SignUpForm />
    </Wrapper>
  );
}

const styles = StyleSheet.create({});
