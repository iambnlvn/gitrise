"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { NeuralIdStep } from "./neural-id";

import { WIZARD_STEPS as STEPS } from "../constants";

import { useWizardStore } from "@/app/stores/wizard-store";
import WizardFooter from "./wizard-footer";
import { HoloDeckStep } from "./holo-deck";
import { UplinkStep } from "./uplink";
import { NodeInitStep } from "./node-init";

export function SystemInitWizard({
  params,
}: {
  params: Promise<{ step?: string[] }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const { setCurrentStep, isStepComplete } = useWizardStore();

  const paramStepId = resolvedParams.step?.[0] || "neural-id";
  const currentStepIndex = STEPS.findIndex((s) => s.id === paramStepId);
  const currentStep = STEPS[currentStepIndex] || STEPS[0];

  useEffect(() => {
    if (!resolvedParams.step) {
      router.replace("/system-init/neural-id");
    } else {
      setCurrentStep(paramStepId);
    }
  }, [resolvedParams.step, router, paramStepId, setCurrentStep]);

  const goToStep = (stepId: string) => {
    router.push(`/system-init/${stepId}`);
  };

  const stepComponents = {
    "neural-id": <NeuralIdStep />,
    "holo-deck": <HoloDeckStep />,
    uplink: <UplinkStep />,
    "node-init": <NodeInitStep />,
  } as const;

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      {/* TODO: redesign */}
      <div className="bg-background border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-2">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isComplete =
                isStepComplete(step.id) && index < currentStepIndex;
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isComplete && "cursor-pointer hover:bg-emerald-50",
                      isActive && "bg-primary/5",
                      !isComplete &&
                        !isActive &&
                        "cursor-not-allowed opacity-50",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border-2 transition-all",
                        isActive && "bg-primary border-violet-600 text-white",
                        isComplete &&
                          "border-emerald-500 bg-emerald-500 text-white",
                        !isActive &&
                          !isComplete &&
                          "border-gray-300 bg-white text-gray-400",
                      )}
                    >
                      {isComplete ? (
                        <Check className="size-5" />
                      ) : (
                        <Icon className="size-5" />
                      )}
                    </div>
                    <div className="hidden text-left md:block">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isActive && "text-violet-700",
                          isComplete && "text-emerald-600",
                          !isActive && !isComplete && "text-gray-400",
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {step.description}
                      </p>
                    </div>
                  </button>
                  {!isLast && (
                    <div
                      className={cn(
                        "mx-2 hidden h-0.5 flex-1 rounded md:block",
                        index < currentStepIndex
                          ? "bg-emerald-500"
                          : "bg-gray-200",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <main className="bg-background flex-1 py-2">
        <div className="mx-auto max-w-2xl px-6">
          <div className="bg-background shadow-muted rounded-2xl border border-gray-200 p-8 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {stepComponents[currentStep.id as keyof typeof stepComponents]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
}
