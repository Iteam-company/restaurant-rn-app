export const TagTypes = {
  USER: "User",
  RESTAURANT: "Restaurant",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
