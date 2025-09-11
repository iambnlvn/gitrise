"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { PaymentMethod } from "../../types";

type PaymentMethodsCardProps = {
  paymentMethods: PaymentMethod[];
  onAddMethod: () => void;
  onSetDefault: (methodId: string) => void;
  onDelete: (methodId: string) => void;
};

export function PaymentMethodsCard({
  paymentMethods,
  onAddMethod,
  onSetDefault,
  onDelete,
}: PaymentMethodsCardProps) {
  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent transition-all duration-200"
          onClick={onAddMethod}
        >
          <Plus className="size-4" />
          Add Method
        </Button>
      </div>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="border-border bg-accent/50 hover:bg-accent flex items-center gap-4 rounded-lg border p-4 transition-all duration-200"
          >
            <CreditCard className="text-muted-foreground size-8" />
            <div className="flex-1">
              <p className="font-medium">
                {method.brand} ending in {method.last4}
              </p>
              <p className="text-muted-foreground text-sm">
                Expires {method.expiryMonth}/{method.expiryYear}
              </p>
            </div>
            {method.isDefault ? (
              <Badge variant="secondary">Default</Badge>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetDefault(method.id)}
                className="transition-all duration-200"
              >
                Set Default
              </Button>
            )}
            {!method.isDefault && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(method.id)}
                className="hover:text-destructive transition-all duration-200"
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
