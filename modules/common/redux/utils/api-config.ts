export const TagTypes = {
  USER: "User",
  RESTAURANT: "Restaurant",
  QUIZ: "Quiz",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
