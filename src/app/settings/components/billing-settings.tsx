"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PaymentMethod } from "../types";
import { UsageCard } from "./payments/usage-card";
import { PaymentMethodsCard } from "./payments/payment-methods-card";
import { BillingHistoryCard } from "./payments/billing-history-card";
import { ChangePlanDialog } from "./payments/change-plan-dialog";
import { AddPaymentDialog } from "./payments/add-payment-dialog";
import { INITIAL_PAYMENT_METHODS, INVOICES, PLANS } from "./constants";
import { BillingOverview } from "./payments/billing-overview";

export function BillingSettings() {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState("pro");
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    INITIAL_PAYMENT_METHODS,
  );

  const handleSelectPlan = (planId: string) => {
    setCurrentPlan(planId);
    setPlanModalOpen(false);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    setIsDownloading(invoiceId);
    setTimeout(() => {
      setIsDownloading(null);
      toast("Invoice downloaded", {
        description: "Your invoice has been downloaded successfully.",
      });
    }, 1000);
  };

  const handleSetDefaultPayment = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      })),
    );
    toast("Default payment method updated", {
      description: "Your default payment method has been changed.",
    });
  };

  const handleDeletePayment = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.filter((method) => method.id !== methodId),
    );
    toast("Payment method removed", {
      description: "The payment method has been deleted.",
    });
  };

  const handleAddPayment = () => {
    setShowAddPayment(false);
    toast("Payment method added", {
      description: "Your new payment method has been saved.",
    });
  };

  return (
    <TooltipProvider>
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
        <div>
          <h2 className="text-foreground text-2xl font-bold">Billing & Plan</h2>
          <p className="text-muted-foreground mt-1">
            Manage your subscription and billing information
          </p>
        </div>
        <h2 className="text-foreground text-2xl font-semibold">
          Subscription Overview
        </h2>
        <BillingOverview
          currentPlan={currentPlan}
          plans={PLANS}
          onChangePlan={() => setPlanModalOpen(true)}
        />
        <h2 className="text-foreground text-2xl font-semibold">
          Usage Summary
        </h2>
        <UsageCard />
        <h2 className="text-foreground text-2xl font-semibold">
          Payment Methods
        </h2>
        <PaymentMethodsCard
          paymentMethods={paymentMethods}
          onAddMethod={() => setShowAddPayment(true)}
          onSetDefault={handleSetDefaultPayment}
          onDelete={handleDeletePayment}
        />
        <BillingHistoryCard
          invoices={INVOICES}
          isDownloading={isDownloading}
          onDownload={handleDownloadInvoice}
        />
        <ChangePlanDialog
          open={planModalOpen}
          onOpenChange={setPlanModalOpen}
          onSelectPlan={handleSelectPlan}
          plans={PLANS}
          currentPlan={currentPlan}
        />
        <AddPaymentDialog
          open={showAddPayment}
          onOpenChange={setShowAddPayment}
          onSubmit={handleAddPayment}
        />
      </div>
    </TooltipProvider>
  );
}
