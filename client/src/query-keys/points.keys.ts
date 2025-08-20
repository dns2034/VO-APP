// src/query-keys/points.keys.ts
export const pointsKeys = {
  all: ["points"] as const,

  lists: () => [...pointsKeys.all, "list"] as const,

  list: (filters: unknown) => [...pointsKeys.lists(), filters] as const,

  byUser: (userId: string) => [...pointsKeys.all, "user", userId] as const,
};
