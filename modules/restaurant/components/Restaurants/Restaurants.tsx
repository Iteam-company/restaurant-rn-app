import React from "react";
import RestaurantList from "./RestaurantList/RestaurantList";
import Wrapper from "@/modules/common/components/Wrapper";

const Restaurants = () => {
  return (
    <Wrapper centered>
      <RestaurantList />
    </Wrapper>
  );
};

export default Restaurants;
