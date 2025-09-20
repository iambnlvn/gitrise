"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { PLANS } from "../constants";

type ChangePlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPlan: (planId: string) => void;
  plans: typeof PLANS;
  currentPlan: string;
};

export function ChangePlanDialog({
  open,
  onOpenChange,
  onSelectPlan,
  plans,
  currentPlan,
}: ChangePlanDialogProps) {
  const handleSelectPlan = (planId: string) => {
    onSelectPlan(planId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Change Plan</DialogTitle>
          <DialogDescription>
            Choose the plan that best fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
          {plans.map((plan) => {
            const isPlanCurrent = plan.id === currentPlan;

            return (
              <Card
                key={plan.id}
                className={`p-6 transition-all duration-200 ${
                  isPlanCurrent
                    ? "border-[#947bd3] bg-[#947bd3]/5"
                    : "border-border hover:border-[#947bd3]/50"
                }`}
              >
                <div className="mb-4 text-center">
                  <h4 className="mb-2 text-xl font-bold">{plan.name}</h4>
                  {plan.price !== null ? (
                    <div>
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">Custom</div>
                  )}
                </div>

                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#947bd3]" />
                      <span>
                        {typeof feature === "string"
                          ? feature
                          : `${feature.name}: ${feature.value}`}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  variant={isPlanCurrent ? "outline" : "default"}
                  disabled={isPlanCurrent}
                  className="w-full"
                >
                  {isPlanCurrent ? "Current Plan" : "Select Plan"}
                </Button>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
