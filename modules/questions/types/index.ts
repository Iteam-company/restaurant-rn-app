import { IQuizInfo } from "@/modules/quiz/types";

export interface IQuestionInfo {
  id: number;
  text: string;
  variants: string[];
  correct: number[];
  multipleCorrect: boolean;
  quiz: IQuizInfo;
}
