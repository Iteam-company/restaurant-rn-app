import FormWrapper from "@/modules/common/components/FormWrapper";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { useGetQuizByRestaurantQuery } from "@/modules/quiz/redux/slices/quiz-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import {
  useGetOneQuestionQuery,
  useUpdateQuestionMutation,
} from "../../redux/slices/question-api";
import { quizItems, validationSchema } from "../AddQuestion/utils";

const EditQuestion = () => {
  const {
    id: restaurantId,
    quizId,
    questionId,
  } = useGlobalSearchParams<{
    id: string;
    questionId: string;
    quizId: string;
  }>();

  const { data: initialValues, isLoading: isLoadingQuestion } =
    useGetOneQuestionQuery(questionId);

  const { data: quizzes, isLoading } = useGetQuizByRestaurantQuery(
    restaurantId,
    { skip: !restaurantId }
  );

  const [editQuestion, { isLoading: isEditing }] = useUpdateQuestionMutation();

  const formik = useFormik({
    initialValues: { ...initialValues, quizId: quizId },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      await editQuestion({
        body: {
          ...formData,
          multipleCorrect:
            Array.isArray(formData.correct) && formData.correct.length > 1,
          quizId: undefined,
        },
        questionId: parseInt(questionId),
      });
      router.back();
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    setValues,
  } = formik;

  useEffect(() => {
    if (initialValues) {
      setValues({ ...initialValues, quizId });
    }
  }, [initialValues, quizId, setValues]);

  if (
    !initialValues ||
    isLoading ||
    isLoadingQuestion ||
    !values.correct ||
    !values.variants
  )
    return <ActivityIndicator size="large" />;

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
          value={{
            variants: values.variants || [],
            corrects: values.correct || [],
          }}
          onChange={(values) => {
            setFieldValue("variants", values.variants);
            setFieldValue("correct", values.correct);
          }}
          errorVariants={errors.variants}
          touchedVariants={touched.variants}
          errorCorrects={errors.correct}
        />

        <Dropdown
          label={"Quiz"}
          disabled={parseInt(quizId) !== -1}
          mode="outlined"
          value={`${parseInt(quizId) !== -1 ? quizId : values.quizId}`}
          options={quizItems(quizzes || [])}
          onSelect={(value) => setFieldValue("quizId", value ? parseInt : 0)}
          error={touched.quizId && !!errors.quizId}
        />
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isEditing ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Submit"
          )}
        </Button>
      </FormWrapper>
    </ScrollView>
  );
};

export default EditQuestion;
