// src/query-keys/organization-pages.keys.ts
export const organizationPagesKeys = {
  all: ["organization_pages"] as const,

  lists: () => [...organizationPagesKeys.all, "list"] as const,

  list: (filters: unknown) =>
    [...organizationPagesKeys.lists(), filters] as const,

  byUser: (userId: string) =>
    [...organizationPagesKeys.all, "users", userId] as const,
};
