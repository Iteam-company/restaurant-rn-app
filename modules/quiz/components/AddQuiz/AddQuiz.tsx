import FormWrapper from "@/modules/common/components/FormWrapper";
import { router } from "expo-router";
import { useFormik } from "formik";
import { ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useCreateQuizMutation } from "../../redux/slices/quiz-api";
import {
  difficultyLevelItem,
  initialValues,
  statusItem,
  validationSchema,
} from "./utils";

const AddQuiz = () => {
  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        try {
          await createQuiz(formData).unwrap();
          router.back();
        } catch {}
      },
    });

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <FormWrapper>
        <Headline>Add New Quiz</Headline>
        <TextInput
          mode="outlined"
          label="Title"
          value={values.title}
          onChangeText={(text) => setFieldValue("title", text)}
          onBlur={handleBlur("title")}
          error={touched.title && !!errors.title}
          left={<TextInput.Icon icon="pencil" />}
        />
        <Dropdown
          label={"Difficulty Level"}
          mode="outlined"
          value={values.difficultyLevel}
          options={difficultyLevelItem}
          onSelect={(value) => setFieldValue("difficultyLevel", value)}
          CustomMenuHeader={(props) => <></>}
        />
        <Dropdown
          label={"Status"}
          mode="outlined"
          value={values.status}
          options={statusItem}
          onSelect={(value) => setFieldValue("status", value)}
          CustomMenuHeader={(props) => <></>}
        />
        <TextInput
          mode="outlined"
          label={"Time limit"}
          keyboardType="numeric"
          value={`${values.timeLimit}`}
          onChangeText={(text) =>
            setFieldValue("timeLimit", parseInt(text) || 0)
          }
          onBlur={handleBlur("timeLimit")}
          error={touched.timeLimit && !!errors.timeLimit}
          left={<TextInput.Icon icon="timer" />}
        />
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isCreatingQuiz ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Submit"
          )}
        </Button>
      </FormWrapper>
    </ScrollView>
  );
};

export default AddQuiz;
