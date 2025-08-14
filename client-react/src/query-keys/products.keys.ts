export const productKeys = {
  all: ["products"] as const,
  bySpace: (spaceId: string) => [...productKeys.all, spaceId] as const,
};
