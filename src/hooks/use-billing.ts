import {
  BillingState,
  PaymentMethod,
} from "@/app/settings/components/billing/billing-types";
import { DEFAULT_BILLING_STATE } from "@/app/settings/components/billing/constants";
import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * Options for the billing hook.
 */
interface UseBillingOptions {
  onPlanChange?: (planId: string) => Promise<void> | void;
  onPaymentMethodAdd?: (method: PaymentMethod) => Promise<void> | void;
  onPaymentMethodDelete?: (methodId: string) => Promise<void> | void;
  onPaymentMethodSetDefault?: (methodId: string) => Promise<void> | void;
  onInvoiceDownload?: (invoiceId: string) => Promise<void> | void;
}

/**
 * Return type for the billing hook.
 */
interface UseBillingReturn {
  state: BillingState;
  isLoading: boolean;
  changePlan: (planId: string) => Promise<void>;
  addPaymentMethod: (method: PaymentMethod) => Promise<void>;
  setDefaultPaymentMethod: (methodId: string) => Promise<void>;
  deletePaymentMethod: (methodId: string) => Promise<void>;
  downloadInvoice: (invoiceId: string) => Promise<void>;
}

/**
 * Custom hook for managing billing state and operations.
 *
 * This hook provides a centralized way to manage billing-related state
 * including subscription plans, payment methods, and invoices.
 *
 * @param {UseBillingOptions} [options] - Hook configuration options
 * @returns {UseBillingReturn} Billing state and action handlers
 *
 * @example
 * ```tsx
 * function BillingSettings() {
 *   const {
 *     state,
 *     isLoading,
 *     changePlan,
 *     addPaymentMethod,
 *     setDefaultPaymentMethod,
 *     deletePaymentMethod,
 *     downloadInvoice,
 *   } = useBilling({
 *     onPlanChange: async (planId) => {
 *       await api.updateSubscription(planId);
 *     },
 *   });
 *
 *   return (
 *     <BillingOverview
 *       currentPlan={state.currentPlan}
 *       onChangePlan={changePlan}
 *     />
 *   );
 * }
 * ```
 */
export function useBilling(options?: UseBillingOptions): UseBillingReturn {
  const [state, setState] = useState<BillingState>(DEFAULT_BILLING_STATE);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Changes the subscription plan.
   */
  const changePlan = useCallback(
    async (planId: string) => {
      setIsLoading(true);
      try {
        if (options?.onPlanChange) {
          await options.onPlanChange(planId);
        }

        setState((prev) => ({ ...prev, currentPlan: planId }));

        toast.success("Plan updated", {
          description: "Your subscription plan has been changed successfully.",
        });
      } catch (error) {
        toast.error("Failed to update plan", {
          description: "Please try again or contact support.",
        });
        console.error("Plan change error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Adds a new payment method.
   */
  const addPaymentMethod = useCallback(
    async (method: PaymentMethod) => {
      setIsLoading(true);
      try {
        if (options?.onPaymentMethodAdd) {
          await options.onPaymentMethodAdd(method);
        }

        setState((prev) => ({
          ...prev,
          paymentMethods: [...prev.paymentMethods, method],
        }));

        toast.success("Payment method added", {
          description: "Your new payment method has been saved.",
        });
      } catch (error) {
        toast.error("Failed to add payment method", {
          description: "Please try again or contact support.",
        });
        console.error("Add payment method error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Sets a payment method as default.
   */
  const setDefaultPaymentMethod = useCallback(
    async (methodId: string) => {
      setIsLoading(true);
      try {
        if (options?.onPaymentMethodSetDefault) {
          await options.onPaymentMethodSetDefault(methodId);
        }

        setState((prev) => ({
          ...prev,
          paymentMethods: prev.paymentMethods.map((method) => ({
            ...method,
            isDefault: method.id === methodId,
          })),
        }));

        toast.success("Default payment method updated", {
          description: "Your default payment method has been changed.",
        });
      } catch (error) {
        toast.error("Failed to update default payment method", {
          description: "Please try again or contact support.",
        });
        console.error("Set default payment method error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Deletes a payment method.
   */
  const deletePaymentMethod = useCallback(
    async (methodId: string) => {
      setIsLoading(true);
      try {
        if (options?.onPaymentMethodDelete) {
          await options.onPaymentMethodDelete(methodId);
        }

        setState((prev) => ({
          ...prev,
          paymentMethods: prev.paymentMethods.filter(
            (method) => method.id !== methodId,
          ),
        }));

        toast.success("Payment method removed", {
          description: "The payment method has been deleted.",
        });
      } catch (error) {
        toast.error("Failed to delete payment method", {
          description: "Please try again or contact support.",
        });
        console.error("Delete payment method error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Downloads an invoice.
   */
  const downloadInvoice = useCallback(
    async (invoiceId: string) => {
      setState((prev) => ({ ...prev, isDownloading: invoiceId }));

      try {
        if (options?.onInvoiceDownload) {
          await options.onInvoiceDownload(invoiceId);
        }

        // Simulate download delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Invoice downloaded", {
          description: "Your invoice has been downloaded successfully.",
        });
      } catch (error) {
        toast.error("Failed to download invoice", {
          description: "Please try again or contact support.",
        });
        console.error("Download invoice error:", error);
      } finally {
        setState((prev) => ({ ...prev, isDownloading: null }));
      }
    },
    [options],
  );

  return {
    state,
    isLoading,
    changePlan,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    downloadInvoice,
  };
}
