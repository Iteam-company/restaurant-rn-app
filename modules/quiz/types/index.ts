import { UserInfo } from "@/modules/common/types/user.types";
import { IMenu } from "@/modules/menu/types";

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
  //  questions: Question[];
  difficultyLevel: DifficultyLevelEnum;
  timeLimit: number;
  status: StatusEnum;
  menu: IMenu;
  //  quizResults: QuizResult[];
}

export interface IQuizResultInfo {
  id: number;
  score: string;
  raitingDate: Date;
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
