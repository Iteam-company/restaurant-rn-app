import FormWrapper from "@/modules/common/components/FormWrapper";
import { router } from "expo-router";
import { useFormik } from "formik";
import { ScrollView, View } from "react-native";
import { useCreateQuizMutation } from "../../../../lib/redux/slices/quiz-api";
import {
  difficultyLevelItem,
  initialValues,
  statusItem,
  validationSchema,
} from "./utils";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Loader from "@/components/loader";

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
        } catch (e) {
          const error = e as FetchBaseQueryError;
          toastErrorHandler(error);
        }
      },
    });

  const currentDifficulty = difficultyLevelItem.find(
    (item) => item.value === values.difficultyLevel,
  );

  const currentStatus = statusItem.find((item) => item.value === values.status);

  return (
    <ScrollView
    className="w-full"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Card>
        <FormWrapper>
          <View className="mb-4 space-y-2">
            <Label className="text-sm font-medium text-foreground">Title</Label>
            <Input
              placeholder="Enter quiz text"
              value={values.title}
              onChangeText={(text) => setFieldValue("title", text)}
              onBlur={handleBlur("title")}
              className={
                touched.title && !!errors.title ? "border-red-500" : ""
              }
            />
            {touched.title && !!errors.title && (
              <Text className="text-xs text-red-500">{touched.title}</Text>
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
              placeholder="Enter time limit"
              value={`${values.timeLimit}`}
              keyboardType="numeric"
              onChangeText={(text) =>
                setFieldValue("timeLimit", parseInt(text) || 0)
              }
              onBlur={handleBlur("timeLimit")}
              className={
                touched.title && !!errors.title ? "border-red-500" : ""
              }
            />
            {touched.timeLimit && !!errors.timeLimit && (
              <Text className="text-xs text-red-500">{touched.timeLimit}</Text>
            )}
          </View>
          <Button onPress={() => handleSubmit()} disabled={isCreatingQuiz}>
            {isCreatingQuiz ? (
              <Loader isLoading={true} />
            ) : (
              <Text className="text-primary-foreground font-semibold">
                Submit
              </Text>
            )}
          </Button>
          <Button
            disabled={isCreatingQuiz}
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

export default AddQuiz;
