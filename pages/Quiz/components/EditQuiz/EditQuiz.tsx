import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { ScrollView, View } from "react-native";
import FormWrapper from "@/components/FormWrapper";
import { useEffect } from "react";
import {
  useGetQuizQuery,
  useUpdateQuizMutation,
} from "../../../../lib/redux/slices/quiz-api";
import {
  difficultyLevelItem,
  initialValues as secondaryInitialValues,
  statusItem,
  validationSchema,
} from "../AddQuiz/utils";
import { toastErrorHandler } from "@/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Loader from "@/components/Loader";

const EditQuiz = () => {
  const { quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();

  const { data: initialValues } = useGetQuizQuery(quizId);

  const [updateQuiz, { isLoading: isUpdatingQuiz }] = useUpdateQuizMutation();

  const formik = useFormik({
    initialValues: initialValues
      ? {
          difficultyLevel: initialValues.difficultyLevel,
          status: initialValues.status,
          timeLimit: initialValues.timeLimit,
          title: initialValues.title,
        }
      : { ...secondaryInitialValues },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      try {
        await updateQuiz({
          ...formData,
          id: parseInt(quizId),
        }).unwrap();
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
      setValues({
        difficultyLevel: initialValues.difficultyLevel,
        status: initialValues.status,
        timeLimit: initialValues.timeLimit,
        title: initialValues.title,
      });
    }
  }, [setValues, initialValues]);

  const currentDifficulty = difficultyLevelItem.find(
    (item) => item.value === values.difficultyLevel,
  );

  const currentStatus = statusItem.find((item) => item.value === values.status);

  if (!initialValues) return <Loader />;

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
            <Label className="text-sm font-medium text-foreground">Title</Label>
            <Input
              placeholder="Input title"
              value={values.title}
              onChangeText={(text) => setFieldValue("title", text)}
              onBlur={handleBlur("title")}
              className={
                touched.title && !!errors.title ? "border-red-500" : ""
              }
            />
            {touched.title && !!errors.title && (
              <Text className="text-xs text-red-500">{errors.title}</Text>
            )}
          </View>
          <View>
            <Label>Difficulty Level</Label>
            <Select
              value={currentDifficulty}
              onValueChange={(option) => {
                if (option) {
                  setFieldValue("difficultyLevel", option.value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevelItem.map((item) => (
                  <SelectItem
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </SelectContent>
            </Select>
          </View>
          <View>
            <Label>Status</Label>
            <Select
              value={currentStatus}
              onValueChange={(option) => {
                if (option) {
                  setFieldValue("status", option.value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusItem.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  />
                ))}
              </SelectContent>
            </Select>
          </View>
          <View className="mb-4 space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Time limit
            </Label>
            <Input
              keyboardType="numeric"
              placeholder="Input time limit"
              value={`${values.timeLimit}`}
              onChangeText={(text) =>
                setFieldValue("timeLimit", parseInt(text) || 0)
              }
              onBlur={handleBlur("timeLimit")}
              className={
                touched.timeLimit && !!errors.timeLimit ? "border-red-500" : ""
              }
            />
            {touched.timeLimit && !!errors.timeLimit && (
              <Text className="text-xs text-red-500">{errors.timeLimit}</Text>
            )}
          </View>
          <Button onPress={() => handleSubmit()} disabled={isUpdatingQuiz}>
            {isUpdatingQuiz ? (
              <Loader isLoading={true} />
            ) : (
              <Text className="text-primary-foreground font-semibold">
                Submit
              </Text>
            )}
          </Button>
          <Button
            disabled={isUpdatingQuiz}
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

export default EditQuiz;
