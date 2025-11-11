import {
  CircleCheckBigIcon,
  LucideIcon,
  PauseIcon,
  RefreshCwIcon,
} from "lucide-react-native";

export const TagTypes = {
  USER: "User",
  RESTAURANT: "Restaurant",
  QUIZ: "Quiz",
  QUESTION: "Question",
  QUIZ_RESULT: "QuizResult",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];

export type AuthCredentials = {
  email?: string;
  phoneNumber?: string;
  password: string;
};

export type UserType = {
  id: number;
  username: "";
  firstName: "";
  lastName: "";
  email: "";
  phoneNumber: "";
  password: "";
  role: UserROLES;
  icon: "";
  restaurantId: number;
};

export enum UserROLES {
  OWNER = "owner",
  WAITER = "waiter",
  ADMIN = "admin",
}

export const UserRolesArray: string[] = Object.values(UserROLES).filter(
  (value) => typeof value === "string"
) as string[];

export interface UserInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserROLES;
  icon: string;
}
export type SearchUser = Record<
  "limit" | "page" | "search" | "restaurantId",
  string
>;

export interface CreateRestaurantRequest {
  restaurantName: string;
  address: string;
  ownerId: number;
}

export interface CreateRestaurantResponse {
  id: string;
  name: string;
  address: string;
}

export interface RestaurantInfo {
  id: number;
  name: string;
  workers: UserInfo[];
  address: string;
  ownerId: number;
  image: string;
  owner: UserInfo;
}

export interface UpdateUserInfoI {
  params: {
    userId: string;
    restaurantId: string;
  };
  body: Partial<UserInfo>;
}

export type DeleteWorker = Record<"userId" | "restaurantId", string | number>;

export interface IQuestionInfo {
  id: number;
  text: string;
  variants: string[];
  correct: number[];
  multipleCorrect: boolean;
  quiz: IQuizInfo;
}

export interface ICreateQuestionDTO {
  text: string;
  variants: string[];
  correct: number[];
  multipleCorrect: boolean;
  quizId: number;
}

export enum StatusEnum {
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  NOT_STARTED = "not-started",
}

export const statusIcons: Record<StatusEnum, LucideIcon> = {
  [StatusEnum.COMPLETED]: CircleCheckBigIcon,
  [StatusEnum.IN_PROGRESS]: RefreshCwIcon,
  [StatusEnum.NOT_STARTED]: PauseIcon,
};

export enum DifficultyLevelEnum {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface IQuizInfo {
  id: number;
  title: string;
  createdAt: Date;
  difficultyLevel: DifficultyLevelEnum;
  timeLimit: number;
  status: StatusEnum;
  questions: IQuestionInfo[];
}

export interface IQuizSearchDTO {
  restaurantId: string;
  search?: string;
  limit?: number;
  page?: number;
}

export interface ICreateQuizDTO {
  title: string;
  difficultyLevel: DifficultyLevelEnum;
  timeLimit: number;
  status: StatusEnum;
  questions: ICreateQuestionDTO[];
  restaurantId: number;
}

export interface IQuizResultInfo {
  id: number;
  score: string;
  ratingDate: Date;
  user: UserInfo;
  quiz: IQuizInfo;
}

export interface IQuizResultDto {
  answers: IResultAnswersDto[];
  quizId: number;
}

export interface IResultAnswersDto {
  questionId: number;
  answers: number[];
}
