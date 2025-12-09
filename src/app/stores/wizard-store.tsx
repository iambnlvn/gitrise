import { create } from "zustand";

export interface WizardData {
  neuralId: {
    username: string;
    displayName: string;
    avatar: string;
    role: string;
  };
  holoDeck: {
    theme: "dark" | "light" | "system";
    density: "compact" | "comfortable" | "spacious";
    editingMode: "vim" | "emacs" | "standard";
    notifications: boolean;
  };
  uplink: {
    gitProvider: string | null;
    slack: boolean;
    discord: boolean;
    webhooks: string[];
  };
  nodeInit: {
    workspaceName: string;
    projectName: string;
    importUrl: string;
    createNew: boolean;
    template: string | null;
  };
}

interface WizardStore {
  data: WizardData;
  currentStepId: string;
  updateData: <K extends keyof WizardData>(
    section: K,
    updates: Partial<WizardData[K]>,
  ) => void;
  setCurrentStep: (stepId: string) => void;
  resetData: () => void;
  isStepComplete: (stepId: string) => boolean;
}

const initialData: WizardData = {
  neuralId: {
    username: "",
    displayName: "",
    avatar: "",
    role: "developer",
  },
  holoDeck: {
    theme: "system",
    density: "comfortable",
    editingMode: "standard",
    notifications: true,
  },
  uplink: {
    gitProvider: null,
    slack: false,
    discord: false,
    webhooks: [],
  },
  nodeInit: {
    workspaceName: "",
    projectName: "",
    importUrl: "",
    createNew: true,
    template: null,
  },
};

export const useWizardStore = create<WizardStore>()((set, get) => ({
  data: initialData,
  currentStepId: "neural-id",

  updateData: (section, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        [section]: { ...state.data[section], ...updates },
      },
    })),

  setCurrentStep: (stepId) => set({ currentStepId: stepId }),

  resetData: () => set({ data: initialData, currentStepId: "neural-id" }),

  isStepComplete: (stepId) => {
    const { data } = get();
    switch (stepId) {
      case "neural-id":
        return !!(data.neuralId.username && data.neuralId.displayName);
      case "holo-deck":
        return true;
      case "uplink":
        return true;
      case "node-init":
        return !!(
          data.nodeInit.workspaceName &&
          (data.nodeInit.createNew || data.nodeInit.importUrl)
        );
      default:
        return false;
    }
  },
}));
