import Wrapper from "@/modules/common/components/Wrapper";
import EditQuestion from "@/modules/questions/components/EditQuestion/EditQuestion";

const EditQuestionScreen = () => {
  return (
    <Wrapper paddingOff headerTitle={"Edit Question"}>
      <EditQuestion />
    </Wrapper>
  );
};

export default EditQuestionScreen;
