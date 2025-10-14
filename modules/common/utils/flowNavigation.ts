import { router } from "expo-router";

export type FlowType = "user" | "restaurant" | "quiz" | "question";

export interface FlowNavigationParams {
  userId?: string;
  restaurantId?: string;
  quizId?: string;
  questionId?: string;
  menuId?: string;
  action?: "edit" | "create";
}

// Navigate to forms using the new flow-urls structure
export const navigateToFlow = (
  flowType: FlowType,
  params: FlowNavigationParams = {}
) => {
  const { action = "edit" } = params;

  let baseUrl = "/[flow-urls]/";
  let idParam = "";

  switch (flowType) {
    case "user":
      baseUrl += "[userId]/";
      idParam = params.userId || "";
      break;
    case "restaurant":
      baseUrl += "[restaurantId]/";
      idParam = params.restaurantId || "";
      break;
    case "quiz":
      baseUrl += "[quizId]/";
      idParam = params.quizId || "";
      break;
    case "question":
      baseUrl += "[questionId]/";
      idParam = params.questionId || "";
      break;
  }

  const url = baseUrl + action;

  const searchParams: Record<string, string> = {};

  switch (flowType) {
    case "user":
      searchParams.userId = idParam;
      break;
    case "restaurant":
      searchParams.restaurantId = idParam;
      break;
    case "quiz":
      searchParams.quizId = idParam;
      break;
    case "question":
      searchParams.questionId = idParam;
      break;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== "action" && key !== flowType + "Id") {
      searchParams[key] = String(value);
    }
  });

  console.log("url", url);
  console.log("searchParams", searchParams);

  router.push({
    pathname: url as any,
    params: searchParams,
  });
};

export const navigateToEditUser = (
  userId: string | number,
  restaurantId?: string
) => {
  navigateToFlow("user", {
    userId: String(userId),
    restaurantId,
    action: "edit",
  });
};

export const navigateToCreateUser = (restaurantId?: string) => {
  navigateToFlow("user", { restaurantId, action: "create" });
};

export const navigateToEditRestaurant = (restaurantId: string | number) => {
  navigateToFlow("restaurant", {
    restaurantId: String(restaurantId),
    action: "edit",
  });
};

export const navigateToCreateRestaurant = () => {
  navigateToFlow("restaurant", { action: "create" });
};

export const navigateToEditQuiz = (
  quizId: string | number,
  restaurantId?: string
) => {
  navigateToFlow("quiz", {
    quizId: String(quizId),
    restaurantId,
    action: "edit",
  });
};

export const navigateToCreateQuiz = (restaurantId?: string) => {
  navigateToFlow("quiz", {
    restaurantId,
    menuId: restaurantId,
    action: "create",
  });
};

export const navigateToEditQuestion = (
  questionId: string | number,
  quizId?: string,
  restaurantId?: string
) => {
  navigateToFlow("question", {
    questionId: String(questionId),
    quizId,
    restaurantId,
    action: "edit",
  });
};

export const navigateToCreateQuestion = (
  quizId?: string,
  restaurantId?: string
) => {
  navigateToFlow("question", { quizId, restaurantId, action: "create" });
};
