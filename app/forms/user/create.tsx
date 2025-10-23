import Wrapper from "@/modules/common/components/Wrapper";
import AddWorker from "@/modules/restaurant/components/RestaurantInfo/addWorker/AddWorker";

const CreateUserScreen = () => {
  return (
    <Wrapper paddingOff headerTitle={"Create and add new User"}>
      <AddWorker />
    </Wrapper>
  );
};

export default CreateUserScreen;
