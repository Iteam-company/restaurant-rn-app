import Wrapper from "@/modules/common/components/Wrapper";
import EditWorker from "@/modules/restaurant/components/RestaurantInfo/editWorker/EditWorker";

const EditUserScreen = () => {
  return (
    <Wrapper paddingOff headerTitle={"Edit Worker Profile"}>
      <EditWorker />
    </Wrapper>
  );
};

export default EditUserScreen;
