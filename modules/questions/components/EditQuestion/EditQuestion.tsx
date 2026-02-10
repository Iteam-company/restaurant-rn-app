import FormWrapper from "@/modules/common/components/FormWrapper";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { useGetQuizByRestaurantQuery } from "@/lib/redux/slices/quiz-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import {
  useGetOneQuestionQuery,
  useUpdateQuestionMutation,
} from "../../../../lib/redux/slices/question-api";
import { quizItems, validationSchema } from "../AddQuestion/utils";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Loader from "@/components/loader";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
    { skip: !restaurantId },
  );

  const [editQuestion, { isLoading: isEditing }] = useUpdateQuestionMutation();

  const formik = useFormik({
    initialValues: { ...initialValues, quizId: quizId },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      try {
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
      } catch (e) {
        const error = e as FetchBaseQueryError;
        toastErrorHandler(error);
      }
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

  const options = useMemo(() => quizItems(quizzes || []), [quizzes]);

  const currentQuizIdStr =
    parseInt(quizId) !== -1 ? String(quizId) : String(values.quizId || "");

  const currentQuizItem = options.find(
    (item) => String(item.value) === currentQuizIdStr,
  );

  if (
    !initialValues ||
    isLoading ||
    isLoadingQuestion ||
    !values.correct ||
    !values.variants
  )
    return <Loader isLoading={true} />;

  return (
    <ScrollView
      className="w-full bg-background"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <FormWrapper>
          <View className="mb-4 space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Question
            </Label>
            <Input
              placeholder="Enter question text"
              value={values.text}
              onChangeText={(text) => setFieldValue("text", text)}
              onBlur={handleBlur("text")}
              className={errors.text && touched.text ? "border-red-500" : ""}
            />
            {errors.text && touched.text && (
              <Text className="text-xs text-red-500">{errors.text}</Text>
            )}
          </View>
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

          <View className="mb-6 gap-2">
            <Label>Quiz</Label>
            <Select
              disabled={parseInt(quizId) !== -1}
              value={currentQuizItem}
              onValueChange={(option) => {
                if (option) {
                  setFieldValue("quizId", parseInt(option.value));
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a quiz" />
              </SelectTrigger>
              <SelectContent>
                {options.map((item) => (
                  <SelectItem
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </SelectContent>
            </Select>

            {touched.quizId && errors.quizId && (
              <Text className="text-xs text-red-500">{errors.quizId}</Text>
            )}
          </View>

          <Button onPress={() => handleSubmit()} disabled={isEditing}>
            {isEditing ? (
              <Loader />
            ) : (
              <Text className="text-primary-foreground font-semibold">
                Submit
              </Text>
            )}
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onPress={() => router.back()}
          >
            <Text>Back</Text>
          </Button>
        </FormWrapper>
      </Card>
    </ScrollView>
  );
};

export default EditQuestion;
