export const API_TAGS = {
  USER: "User",
  RESTAURANT: "Restaurant",
} as const;

export const createSharedTagTypes = () => [API_TAGS.USER, API_TAGS.RESTAURANT];
