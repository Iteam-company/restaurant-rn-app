import Wrapper from "@/modules/common/components/Wrapper";
import { AddMenuItem } from "@/modules/menu/components/MenuDetails/components/AddMenuItem";
import React from "react";
import { Title } from "react-native-paper";

const AddMenuItemPage = () => {
  return (
    <Wrapper centered>
      <AddMenuItem />
    </Wrapper>
  );
};

export default AddMenuItemPage;
