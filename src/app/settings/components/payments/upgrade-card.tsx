"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

export function UpgradeCard() {
  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-[#947bd3]/10 p-3">
          <Zap className="size-6 text-[#947bd3]" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold">Upgrade to Enterprise</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Get unlimited everything, priority support, and advanced security
            features for your organization.
          </p>
          <Button className="bg-[#947bd3] text-white transition-all duration-200 hover:bg-[#a58ddb] hover:shadow-lg hover:shadow-[#947bd3]/30">
            Contact Sales
          </Button>
        </div>
      </div>
    </Card>
  );
}
