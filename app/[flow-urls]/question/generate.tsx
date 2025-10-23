import Wrapper from "@/modules/common/components/Wrapper";
import GenerateQuestion from "@/modules/questions/components/GenerateQuestion/GenerateQuestion";

const GenerateQuestionsPage = () => {
  return (
    <Wrapper paddingOff headerTitle={"Generate Questions"}>
      <GenerateQuestion />
    </Wrapper>
  );
};

export default GenerateQuestionsPage;
