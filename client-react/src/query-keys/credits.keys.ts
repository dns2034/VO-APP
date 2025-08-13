// src/query-keys/credits.keys.ts
export const creditsKeys = {
  all: ["credits"] as const,

  lists: () => [...creditsKeys.all, "list"] as const,

  list: (filters: unknown) => [...creditsKeys.lists(), filters] as const,

  byUser: (userId: string) => [...creditsKeys.all, "user", userId] as const,
};
