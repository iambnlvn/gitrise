import { INITIAL_WIZARD_DATA } from "@/app/wizard/components/constants";
import { WizardData } from "@/app/wizard/components/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WizardStore {
  currentStep: number;
  data: WizardData;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof WizardData>(
    field: K,
    value: WizardData[K],
  ) => void;
  toggleArrayItem: (field: keyof WizardData, item: string) => void;
  resetWizard: () => void;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      data: { ...INITIAL_WIZARD_DATA },

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        })),

      updateField: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
        })),

      toggleArrayItem: (field, item) =>
        set((state) => {
          const currentArray = state.data[field] as string[];
          const newArray = currentArray.includes(item)
            ? currentArray.filter((i) => i !== item)
            : [...currentArray, item];

          return {
            data: { ...state.data, [field]: newArray },
          };
        }),

      resetWizard: () =>
        set({
          currentStep: 0,
          data: { ...INITIAL_WIZARD_DATA },
        }),
    }),
    {
      name: "wizard-storage",
    },
  ),
);
