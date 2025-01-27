import FormWrapper from "@/modules/common/components/FormWrapper";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { quizItems, validationSchema } from "../AddQuestion/utils";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { Dropdown } from "react-native-paper-dropdown";
import {
  useGetQuizByRestaurantQuery,
  useGetQuizQuery,
} from "@/modules/quiz/redux/slices/quiz-api";
import {
  useGetOneQuestionQuery,
  useUpdateQuestionMutation,
} from "../../redux/slices/question-api";
import { useEffect } from "react";

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
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log(questionId);
  }, [questionId]);

  const { data: initialValues, isLoading: isLoadingQuestion } =
    useGetOneQuestionQuery(questionId);

  const { data: quizes, isLoading } = useGetQuizByRestaurantQuery(restaurantId);

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

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    formik;

  useEffect(() => {
    if (initialValues) {
      formik.setValues({ ...initialValues, quizId });
    }
  }, [initialValues]);

  if (
    !initialValues ||
    isLoading ||
    isLoadingQuestion ||
    !values.correct ||
    !values.variants
  )
    return <ActivityIndicator size="large" />;

  return (
    <ScrollView
      style={[
        { width: "100%" },
        getScrollViewUiSettings(insets, { botttomOffset: 16 }),
      ]}
    >
      <FormWrapper>
        <Headline>Add New Question</Headline>
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
          options={quizItems(quizes || [])}
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
