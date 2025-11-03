import { router } from "expo-router";

export enum FlowType {
  USER = "user",
  RESTAURANT = "restaurant",
  QUIZ = "quiz",
  QUESTION = "question",
}

export enum ActionType {
  EDIT = "edit",
  CREATE = "create",
  GENERATE = "generate",
}

export interface FlowNavigationParams {
  userId?: string;
  restaurantId?: string;
  quizId?: string;
  questionId?: string;
  action?: ActionType;
}

// Navigate to forms using the new flow-urls structure
export const navigateToFlow = (
  flowType: FlowType,
  params: FlowNavigationParams = {}
) => {
  const { action = ActionType.EDIT } = params;

  let baseUrl = "/forms/";
  let idParam = "";

  switch (flowType) {
    case FlowType.USER:
      baseUrl += "user/";
      if (action === ActionType.EDIT) {
        baseUrl += "[userId]/";
        idParam = params.userId || "";
      }
      break;
    case FlowType.RESTAURANT:
      baseUrl += "restaurant/";
      if (action === ActionType.EDIT) {
        baseUrl += "[restaurantId]/";
        idParam = params.restaurantId || "";
      }
      break;
    case FlowType.QUIZ:
      baseUrl += "quiz/";
      if (action === ActionType.EDIT) {
        baseUrl += "[quizId]/";
        idParam = params.quizId || "";
      }
      break;
    case FlowType.QUESTION:
      baseUrl += "question/";
      if (action === ActionType.EDIT) {
        baseUrl += "[questionId]/";
        idParam = params.questionId || "";
      }
      break;
  }

  let url = baseUrl + action;

  const searchParams: Record<string, string> = {};

  switch (flowType) {
    case FlowType.USER:
      searchParams.userId = idParam;
      break;
    case FlowType.RESTAURANT:
      searchParams.restaurantId = idParam;
      break;
    case FlowType.QUIZ:
      searchParams.quizId = idParam;
      break;
    case FlowType.QUESTION:
      searchParams.questionId = idParam;
      break;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== "action") {
      searchParams[key] = String(value);
    }
  });

  console.log(url, searchParams, "~~~navigateToFlow");
  router.push({
    pathname: url as any,
    params: searchParams,
  });
};

export const navigateToEditUser = (
  userId: string | number,
  restaurantId?: string
) => {
  navigateToFlow(FlowType.USER, {
    userId: String(userId),
    restaurantId,
    action: ActionType.EDIT,
  });
};

export const navigateToCreateUser = (restaurantId?: string) => {
  navigateToFlow(FlowType.USER, { restaurantId, action: ActionType.CREATE });
};

export const navigateToEditRestaurant = (restaurantId: string | number) => {
  navigateToFlow(FlowType.RESTAURANT, {
    restaurantId: String(restaurantId),
    action: ActionType.EDIT,
  });
};

export const navigateToCreateRestaurant = () => {
  navigateToFlow(FlowType.RESTAURANT, { action: ActionType.CREATE });
};

export const navigateToEditQuiz = (
  quizId: string | number,
  restaurantId?: string
) => {
  navigateToFlow(FlowType.QUIZ, {
    quizId: String(quizId),
    restaurantId,
    action: ActionType.EDIT,
  });
};

export const navigateToCreateQuiz = (restaurantId?: string) => {
  navigateToFlow(FlowType.QUIZ, {
    restaurantId,
    action: ActionType.CREATE,
  });
};

export const navigateToGenerateQuiz = (restaurantId?: string) => {
  navigateToFlow(FlowType.QUIZ, {
    restaurantId,
    action: ActionType.GENERATE,
  });
};

export const navigateToEditQuestion = (
  questionId: string | number,
  quizId?: string,
  restaurantId?: string
) => {
  navigateToFlow(FlowType.QUESTION, {
    questionId: String(questionId),
    quizId,
    restaurantId,
    action: ActionType.EDIT,
  });
};

export const navigateToCreateQuestion = (
  quizId?: string,
  restaurantId?: string
) => {
  navigateToFlow(FlowType.QUESTION, {
    quizId,
    restaurantId,
    action: ActionType.CREATE,
  });
};

export const navigateToGenerateQuestions = (
  quizId?: string,
  restaurantId?: string
) => {
  navigateToFlow(FlowType.QUESTION, {
    quizId,
    restaurantId,
    action: ActionType.GENERATE,
  });
};
