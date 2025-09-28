"use client";

import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingHeader } from "../shared";
import { UsageCard } from "./usage-card";
import { PaymentMethodsCard } from "./payment-methods-card";
import { BillingHistoryCard } from "./billing-history-card";
import { ChangePlanDialog } from "./change-plan-dialog";
import { AddPaymentDialog } from "./add-payment-dialog";
import { BillingOverview } from "./billing-overview";
import { PLANS } from "./constants";
import { useBilling } from "@/hooks/use-billing";

/**
 * Main billing and subscription management component.
 *
 * Provides a comprehensive interface for users to manage their subscription,
 * payment methods, view usage statistics, and access billing history.
 *
 */
export function BillingSettings() {
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const {
    state,
    changePlan,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    downloadInvoice,
  } = useBilling({
    onPlanChange: async (planId) => {
      console.log("Changing plan to:", planId);
    },
    onPaymentMethodAdd: async (method) => {
      console.log("Adding payment method:", method);
    },
    onPaymentMethodSetDefault: async (methodId) => {
      console.log("Setting default payment method:", methodId);
    },
    onPaymentMethodDelete: async (methodId) => {
      console.log("Deleting payment method:", methodId);
    },
    onInvoiceDownload: async (invoiceId) => {
      console.log("Downloading invoice:", invoiceId);

      // const response = await fetch(`/api/billing/invoices/${invoiceId}/download`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `invoice-${invoiceId}.pdf`;
      // a.click();
    },
  });

  /**
   * Handles plan selection from the change plan dialog.
   */
  const handleSelectPlan = async (planId: string) => {
    await changePlan(planId);
    setPlanModalOpen(false);
  };

  /**
   * Handles adding a new payment method.
   */
  const handleAddPayment = async () => {
    // In a real app, you'd get the payment method details from the dialog
    // For now, we'll just close the dialog
    setShowAddPayment(false);

    // Example of how you might add a payment method:
    // const newMethod: PaymentMethod = {
    //   id: generateId(),
    //   type: "card",
    //   brand: "Visa",
    //   last4: "1234",
    //   expiry: "12/26",
    //   isDefault: false,
    // };
    // await addPaymentMethod(newMethod);
  };

  return (
    <TooltipProvider>
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
        <SettingHeader
          title="Billing & Plan"
          description="Manage your subscription and billing information"
        />

        {/* Subscription Overview Section */}
        <section className="space-y-3">
          <h3 className="text-foreground text-xl font-semibold">
            Subscription Overview
          </h3>
          <BillingOverview
            currentPlan={state.currentPlan}
            plans={PLANS}
            onChangePlan={() => setPlanModalOpen(true)}
          />
        </section>

        {/* Usage Summary Section */}
        <section className="space-y-3">
          <h3 className="text-foreground text-xl font-semibold">
            Usage Summary
          </h3>
          <UsageCard usage={state.usage} />
        </section>

        {/* Payment Methods Section */}
        <section className="space-y-3">
          <h3 className="text-foreground text-xl font-semibold">
            Payment Methods
          </h3>
          <PaymentMethodsCard
            paymentMethods={state.paymentMethods}
            onAddMethod={() => setShowAddPayment(true)}
            onSetDefault={setDefaultPaymentMethod}
            onDelete={deletePaymentMethod}
          />
        </section>

        {/* Billing History Section */}
        <section className="space-y-3">
          <h3 className="text-foreground text-xl font-semibold">
            Billing History
          </h3>
          <BillingHistoryCard
            invoices={state.invoices}
            isDownloading={state.isDownloading}
            onDownload={downloadInvoice}
          />
        </section>

        {/* Dialogs */}
        <ChangePlanDialog
          open={planModalOpen}
          onOpenChange={setPlanModalOpen}
          onSelectPlan={handleSelectPlan}
          plans={PLANS}
          currentPlan={state.currentPlan}
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
