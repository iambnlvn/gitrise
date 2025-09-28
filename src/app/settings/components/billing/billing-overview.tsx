import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Plan } from "./billing-types";

type BillingOverviewProps = {
  currentPlan: string;
  plans: Plan[];
  onChangePlan: () => void;
};

export function BillingOverview({
  currentPlan,
  plans,
  onChangePlan,
}: BillingOverviewProps) {
  const plan = plans.find((p) => p.id === currentPlan) || plans[0];

  return (
    <Card className="h-full border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Current Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              {plan.name}
            </Badge>
            <p className="text-foreground text-4xl font-bold">${plan.price}</p>
            <p className="text-muted-foreground text-sm">/{plan.period}</p>
          </div>
          <Button onClick={onChangePlan}>Change Plan</Button>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4">
          <p className="text-foreground text-sm font-semibold">
            Plan Features:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="text-muted-foreground flex items-start gap-2 text-sm"
              >
                <Check
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-green-500"
                />
                <span>
                  {typeof feature === "string"
                    ? feature
                    : `${feature.name}: ${feature.value}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
