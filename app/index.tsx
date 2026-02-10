import Loader from "@/components/loader";
import Wrapper from "@/components/Wrapper";

export default function HomeScreen() {
  return (
    <Wrapper>
      <Loader isLoading={true} />
    </Wrapper>
  );
}
