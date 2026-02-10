import FormWrapper from "@/modules/common/components/FormWrapper";
import VariantsCreator from "@/modules/common/components/VariantsCreator";
import { useGetQuizByRestaurantQuery } from "@/lib/redux/slices/quiz-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useCreateQuestionMutation } from "../../../../lib/redux/slices/question-api";
import { initialValues, quizItems, validationSchema } from "./utils";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";

const AddQuestion = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();

  const { data: quizzes, isLoading } = useGetQuizByRestaurantQuery(
    restaurantId,
    { skip: !restaurantId },
  );
  const [createQuestion, { isLoading: isCreating }] =
    useCreateQuestionMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: { ...initialValues, quizId: quizId },
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        try {
          await createQuestion({
            ...formData,
            multipleCorrect: formData.correct.length < 1,
            quizId: parseInt(formData.quizId),
          });
          router.back();
        } catch (e) {
          toastErrorHandler(e as FetchBaseQueryError);
        }
      },
    });

  const handleVariantsChange = useCallback(
    (values: { variants: string[]; correct: number[] }) => {
      setFieldValue("variants", values.variants);
      setFieldValue("correct", values.correct);
    },
    [setFieldValue],
  );

  const options = useMemo(() => quizItems(quizzes || []), [quizzes]);

  const currentQuizIdStr =
    parseInt(quizId) !== -1 ? String(quizId) : String(values.quizId || "");

  const currentQuizItem = options.find(
    (item) => String(item.value) === currentQuizIdStr,
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
     className="w-full"
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
            onChange={handleVariantsChange}
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
          <Button
            onPress={() => handleSubmit()}
            disabled={isLoading || isCreating}
          >
            {isCreating ? (
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

export default AddQuestion;
