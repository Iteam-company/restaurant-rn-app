import Wrapper from "@/components/Wrapper";
import AddWorker from "@/modules/restaurant/components/RestaurantInfo/addWorker/AddWorker";

const CreateUserScreen = () => {
  return (
    <Wrapper headerTitle={"Create and add new User"}>
      <AddWorker />
    </Wrapper>
  );
};

export default CreateUserScreen;
