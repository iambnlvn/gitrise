"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WIZARD_STEPS as STEPS } from "../constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWizardStore } from "@/app/stores/wizard-store";

export default function WizardFooter() {
  const router = useRouter();
  const { currentStepId, isStepComplete } = useWizardStore();

  const currentStepIndex = STEPS.findIndex(
    (step: { id: string }) => step.id === currentStepId,
  );

  const canProceed = isStepComplete(currentStepId);

  const prevStep = () => {
    if (currentStepIndex > 0) {
      const prevStepId = STEPS[currentStepIndex - 1].id;
      router.push(`/system-init/${prevStepId}`);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      const nextStepId = STEPS[currentStepIndex + 1].id;
      router.push(`/system-init/${nextStepId}`);
    } else {
      router.push("/dashboard");
    }
  };

  const completeWizard = () => {
    console.log("Wizard completed!");
    router.push("/dashboard");
  };

  const isLastStep = currentStepIndex === STEPS.length - 1;

  return (
    <footer className="bg-background border-t border-gray-200">
      <div className="mx-auto flex h-20 max-w-2xl items-center justify-between px-6">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>

        <div className="flex items-center gap-1.5">
          {STEPS.map(
            (step: { id: React.Key | null | undefined }, index: number) => (
              <div
                key={step.id}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentStepIndex
                    ? "w-6 bg-violet-600"
                    : index < currentStepIndex
                      ? "w-2 bg-emerald-500"
                      : "w-2 bg-gray-300",
                )}
              />
            ),
          )}
        </div>

        <Button
          onClick={isLastStep ? completeWizard : nextStep}
          disabled={!canProceed}
          className="gap-2"
        >
          {isLastStep ? "Complete" : "Continue"}
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </footer>
  );
}
