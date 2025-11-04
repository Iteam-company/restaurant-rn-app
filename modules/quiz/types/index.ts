import { UserInfo } from "@/modules/common/types/user.types";
import { ICreateQuestionDTO, IQuestionInfo } from "@/modules/questions/types";

export enum StatusEnum {
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  NOT_STARTED = "not-started",
}

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
