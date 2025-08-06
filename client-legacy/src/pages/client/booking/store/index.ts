import type { TBookingWorkflow } from "@/lib/types";
import type { TResource } from "@/types";
import { create } from "zustand";

type TUseResourcesStore = {
  resources: TResource[];
  setResources: (resources: TResource[]) => void;
};

export const useResourcesStore = create<TUseResourcesStore>((set) => ({
  resources: [],
  setResources: (resources) => {
    set({ resources });
  },
}));

type TUseBookingWorkflowStore = {
  workflow: TBookingWorkflow;
  setWorkflow: (workflow: TBookingWorkflow) => void;
};

export const useBookingWorkflowStore = create<TUseBookingWorkflowStore>(
  (set) => ({
    workflow: "date",
    setWorkflow: (workflow) => set({ workflow }),
  })
);
