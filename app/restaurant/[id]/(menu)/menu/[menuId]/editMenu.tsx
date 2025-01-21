import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import EditMenu from "@/modules/menu/components/EditMenu/Editmenu";

const EditMenuPage = () => {
  return (
    <Wrapper centered paddingOff>
      <EditMenu />
    </Wrapper>
  );
};

export default EditMenuPage;
