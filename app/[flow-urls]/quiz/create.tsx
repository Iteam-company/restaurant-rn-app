import Wrapper from "@/modules/common/components/Wrapper";
import AddQuiz from "@/modules/quiz/components/AddQuiz/AddQuiz";

const CreateQuizScreen = () => {
  return (
    <Wrapper paddingOff headerTitle={"Add New Quiz"}>
      <AddQuiz />
    </Wrapper>
  );
};

export default CreateQuizScreen;
