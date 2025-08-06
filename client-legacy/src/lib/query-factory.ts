export const clientKeys = {
  all: ["clients"],
  lists: () => [...clientKeys.all, "list"],
  list: (filters: unknown) => [...clientKeys.lists(), filters],
  details: () => [...clientKeys.all, "detail"],
  detail: (id: string) => [...clientKeys.details(), id],
};

export const pointsKeys = {
  all: ["points"],
  lists: () => [...pointsKeys.all, "list"],
  list: (filters: unknown) => [...pointsKeys.lists(), filters],
  details: () => [...pointsKeys.all, "detail"],
  detail: (id: string) => [...pointsKeys.details(), id],
};

export const creditsKeys = {
  all: ["credits"],
  lists: () => [...creditsKeys.all, "list"],
  list: (filters: unknown) => [...creditsKeys.lists(), filters],
  details: () => [...creditsKeys.all, "detail"],
  detail: (id: string) => [...creditsKeys.details(), id],
};
