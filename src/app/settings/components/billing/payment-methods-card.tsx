"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus, MoreVertical } from "lucide-react";
import { PaymentCardPreview } from "./payment-card-preview";
import { PaymentMethod } from "./billing-types";

type PaymentMethodsCardProps = {
  paymentMethods: PaymentMethod[];
  onAddMethod: () => void;
  onSetDefault: (methodId: string) => void;
  onDelete: (methodId: string) => void;
};

export function PaymentMethodsCard({
  paymentMethods,
  onAddMethod,
}: PaymentMethodsCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {paymentMethods.length > 0 && (
        <div className="relative">
          <PaymentCardPreview
            cardData={{
              cardNumber: "6020010033566888",
              cardName: "David Martinez",
              expiryDate: "12/27",
              cvc: "129",
            }}
            isFlipped={false}
          />
          <button className="absolute top-2 right-1.5 rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30 md:top-2 md:right-8">
            <MoreVertical size={20} className="text-white" />{" "}
            {/* TODO: Implement edit and delete functionality */}
          </button>
        </div>
      )}

      <Card
        className="flex h-56 w-96 cursor-pointer items-center justify-center border-2 border-dashed border-slate-300 shadow-lg transition-colors hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500"
        onClick={onAddMethod}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <Plus size={32} className="text-muted-foreground" />
          <p className="text-foreground text-lg font-semibold">Add New Card</p>
          <p className="text-muted-foreground text-sm">
            Add a new payment method
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
