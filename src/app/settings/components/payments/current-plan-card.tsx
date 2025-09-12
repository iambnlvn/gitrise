"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, HardDrive, Clock } from "lucide-react";

type CurrentPlanCardProps = {
  onChangePlan: () => void;
};

export function CurrentPlanCard({ onChangePlan }: CurrentPlanCardProps) {
  return (
    <Card className="border-[#947bd3]/20 bg-gradient-to-br from-[#947bd3]/10 to-[#b9a5e3]/5 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-2xl font-bold">Pro Plan</h3>
            <Badge className="bg-[#947bd3] text-white">Current</Badge>
          </div>
          <p className="text-muted-foreground">$20/month • Billed monthly</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Next billing date: October 11, 2025
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-transparent transition-all duration-200 hover:bg-[#947bd3] hover:text-white"
          onClick={onChangePlan}
        >
          Change Plan
        </Button>
      </div>
      <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Users className="size-5 text-[#947bd3]" />
          <div>
            <p className="text-muted-foreground text-sm">Team Members</p>
            <p className="font-semibold">Unlimited</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HardDrive className="size-5 text-[#947bd3]" />
          <div>
            <p className="text-muted-foreground text-sm">Storage</p>
            <p className="font-semibold">500 GB</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="size-5 text-[#947bd3]" />
          <div>
            <p className="text-muted-foreground text-sm">Build Minutes</p>
            <p className="font-semibold">3,000/month</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
