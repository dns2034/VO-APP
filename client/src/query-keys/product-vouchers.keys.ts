// src/query-keys/product-vouchers.keys.ts
export const productVouchersKeys = {
  all: ["product_vouchers"] as const,

  lists: () => [...productVouchersKeys.all, "list"] as const,

  list: (filters: unknown) =>
    [...productVouchersKeys.lists(), filters] as const,

  byUser: (userId: string) =>
    [...productVouchersKeys.all, "users", userId] as const,

  bySpace: (spaceId: string) =>
    [...productVouchersKeys.all, "spaces", spaceId] as const,
};
