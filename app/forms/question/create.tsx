import Wrapper from "@/modules/common/components/Wrapper";
import AddQuestion from "@/modules/questions/components/AddQuestion/AddQuestion";

const CreateQuestionScreen = () => {
  return (
    <Wrapper headerTitle={"Add New Question"}>
      <AddQuestion />
    </Wrapper>
  );
};

export default CreateQuestionScreen;
