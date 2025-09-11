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
import { Plan } from "../../types";

type ChangePlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plans: Plan[];
};

export function ChangePlanDialog({
  open,
  onOpenChange,
  plans,
}: ChangePlanDialogProps) {
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
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 transition-all duration-200 ${
                plan.current
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
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.current ? "bg-[#947bd3] hover:bg-[#a58ddb]" : "bg-transparent"}`}
                variant={plan.current ? "default" : "outline"}
                disabled={plan.current}
              >
                {plan.current
                  ? "Current Plan"
                  : plan.price !== null
                    ? "Upgrade"
                    : "Contact Sales"}
              </Button>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
