import FormWrapper from "@/modules/common/components/FormWrapper";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { useGetQuizByRestaurantQuery } from "@/modules/quiz/redux/slices/quiz-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useCreateQuestionMutation } from "../../redux/slices/question-api";
import { initialValues, quizItems, validationSchema } from "./utils";

const AddQuestion = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();

  const { data: quizes, isLoading } = useGetQuizByRestaurantQuery(restaurantId);
  const [createQuestion, { isLoading: isCreating }] =
    useCreateQuestionMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: { ...initialValues, quizId: quizId },
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        await createQuestion({
          ...formData,
          multipleCorrect: formData.correct.length < 1,
          quizId: parseInt(formData.quizId),
        });
        router.back();
      },
    });

  const handleVariantsChange = useCallback(
    (values: { variants: string[]; correct: number[] }) => {
      setFieldValue("variants", values.variants);
      setFieldValue("correct", values.correct);
    },
    [setFieldValue]
  );

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <FormWrapper>
        <TextInput
          mode="outlined"
          label="Question"
          value={values.text}
          onChangeText={(text) => setFieldValue("text", text)}
          onBlur={handleBlur("text")}
          error={!!(errors.text && touched.text)}
          left={<TextInput.Icon icon="pencil" />}
        />
        <VariantsCreator
          onChange={handleVariantsChange}
          errorVariants={errors.variants}
          touchedVariants={touched.variants}
          errorCorrects={errors.correct}
        />

        <Dropdown
          label={"Quiz"}
          disabled={parseInt(quizId) !== -1}
          mode="outlined"
          value={`${parseInt(quizId) !== -1 ? quizId : values.quizId}`}
          options={quizItems(quizes || [])}
          onSelect={(value) => setFieldValue("quizId", value ? parseInt : 0)}
          error={touched.quizId && !!errors.quizId}
        />
        <Button
          loading={isLoading || isCreating}
          mode="contained-tonal"
          onPress={() => handleSubmit()}
        >
          Submit
        </Button>
      </FormWrapper>
    </ScrollView>
  );
};

export default AddQuestion;
