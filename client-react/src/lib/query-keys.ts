export const pointsKeys = {
  all: ["points"],
};

export const creditsKeys = {
  all: ["credits"],
};

export const rewardsKeys = {
  all: ["rewards"],
};

export const productsKeys = {
  all: ["products"],
};

export const rewardVouchersKeys = {
  all: ["rewardVouchers"],
};

export const productVouchersKeys = {
  all: ["productVoucher"],
  lists: () => [...productVouchersKeys.all, "list"],
  list: (filters: unknown) => [...productVouchersKeys.lists(), filters],
};

export const businessesKeys = {
  all: ["businesses"],
};

export const branchesKeys = {
  all: ["branches"],
};

export const bookingsKeys = {
  all: ["bookings"],
  lists: () => [...bookingsKeys.all, "list"],
  list: (filters: unknown) => [...bookingsKeys.lists(), filters],
};

export const spacesKeys = {
  all: ["spaces"],
  lists: () => [...spacesKeys.all, "list"],
  list: (filters: unknown) => [...spacesKeys.lists(), filters],
};

export const spaceUnitsKeys = {
  all: ["spaceUnits"],
  lists: () => [...spaceUnitsKeys.all, "list"],
  list: (filters: unknown) => [...spaceUnitsKeys.lists(), filters],
};

export const spaceAvailabilityKeys = {
  all: ["spaceAvailabilityKeys"],
  lists: () => [...spaceAvailabilityKeys.all, "list"],
  list: (filters: unknown) => [...spaceAvailabilityKeys.lists(), filters],
};