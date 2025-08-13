"use client";

import { useWizardStore } from "../store/wizard-store";
import { WizardData } from "./components/types";
import { WizardLayout } from "./components/wizard-layout";

export default function WizardPage() {
  const resetWizard = useWizardStore((state) => state.resetWizard);

  const handleComplete = (data: WizardData) => {
    console.log("Wizard data:", data);

    resetWizard();
  };

  const handleSkip = () => {
    console.log("Wizard skipped");
    resetWizard();
  };

  return <WizardLayout onComplete={handleComplete} onSkip={handleSkip} />;
}
