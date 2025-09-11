"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

type UsageItem = {
  label: string;
  current: number;
  total: number;
  unit: string;
};

const usageItems: UsageItem[] = [
  { label: "Storage", current: 245, total: 500, unit: "GB" },
  { label: "Build Minutes", current: 1847, total: 3000, unit: "" },
  { label: "Bandwidth", current: 78, total: 100, unit: "GB" },
];

export function UsageCard() {
  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Current Usage</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-6">
                <HelpCircle className="text-muted-foreground size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Track your resource usage for the current billing period.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-6">
        {usageItems.map((item) => {
          const percentage = (item.current / item.total) * 100;
          return (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-muted-foreground text-sm">
                  {item.current} {item.unit} / {item.total} {item.unit}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
