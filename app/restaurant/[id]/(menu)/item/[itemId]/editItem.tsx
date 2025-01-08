import Wrapper from "@/modules/common/components/Wrapper";
import { EditItem } from "@/modules/menu/components/Item/components/EditItem";
import React from "react";
import { Title } from "react-native-paper";

export default function EditItemPage() {
  return (
    <Wrapper>
      <Title>
        <EditItem />
      </Title>
    </Wrapper>
  );
}
