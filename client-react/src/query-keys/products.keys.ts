export const productKeys = {
  all: ["productVouchers"] as const,
  bySpace: (spaceId: string) => [...productKeys.all, spaceId] as const,
};
