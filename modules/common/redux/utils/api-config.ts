export const TagTypes = {
  USER: "User",
  RESTAURANT: "Restaurant",
  QUIZ: "Quiz",
  QUESTION: "Question",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
