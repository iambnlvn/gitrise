"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Shield } from "lucide-react";
import { z } from "zod";
import { PaymentCardPreview } from "./payment-card-preview";

type AddPaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
};

//TODO!: move this to a separate file later
const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((val) => {
      const cleaned = val.replace(/\s/g, "");
      return /^\d+$/.test(cleaned);
    }, "Card number must contain only digits")
    .refine((val) => {
      const cleaned = val.replace(/\s/g, "");
      return cleaned.length >= 13 && cleaned.length <= 19;
    }, "Invalid card number length"),
  cardName: z
    .string()
    .min(1, "Cardholder name is required")
    .min(3, "Name too short"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^\d{2}\/\d{2}$/, "Invalid format (MM/YY)")
    .refine((val) => {
      const [month] = val.split("/");
      const monthNum = Number.parseInt(month, 10);
      return monthNum >= 1 && monthNum <= 12;
    }, "Invalid month")
    .refine((val) => {
      const [month, year] = val.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const monthNum = Number.parseInt(month, 10);
      const yearNum = Number.parseInt(year, 10);
      return !(
        yearNum < currentYear ||
        (yearNum === currentYear && monthNum < currentMonth)
      );
    }, "Card has expired"),
  cvc: z
    .string()
    .min(1, "CVC is required")
    .min(3, "Invalid CVC")
    .max(4, "Invalid CVC")
    .regex(/^\d+$/, "CVC must contain only digits"),
});

export type CardFormData = z.infer<typeof cardSchema>;

export function AddPaymentDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddPaymentDialogProps) {
  const [cardForm, setCardForm] = useState<CardFormData>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [cardErrors, setCardErrors] = useState<
    Partial<Record<keyof CardFormData, string>>
  >({});
  const [isPending, startTransition] = useTransition();

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const validateField = (field: keyof CardFormData, value: string) => {
    try {
      cardSchema.shape[field].parse(value);
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || "";
      }
      return "";
    }
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardForm({ ...cardForm, cardNumber: formatted });
    setCardErrors({ ...cardErrors, cardNumber: "" });
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setCardForm({ ...cardForm, expiryDate: formatted });
    setCardErrors({ ...cardErrors, expiryDate: "" });
  };
  const handleCVCChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").substring(0, 4);
    setCardForm({ ...cardForm, cvc: cleaned });
    setCardErrors({ ...cardErrors, cvc: "" });
  };

  const handleCardNameChange = (value: string) => {
    setCardForm({ ...cardForm, cardName: value });
    setCardErrors({ ...cardErrors, cardName: "" });
  };

  const isCardFormValid = () => {
    try {
      cardSchema.parse(cardForm);
      return true;
    } catch {
      return false;
    }
  };

  const resetForm = () => {
    setCardForm({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvc: "",
    });
    setCardErrors({});
    setFocusedInput(null);
  };

  const handleAddPaymentMethod = () => {
    try {
      cardSchema.parse(cardForm);

      startTransition(() => {
        onSubmit();
        onOpenChange(false);
        resetForm();

        toast("Payment method added", {
          description: "Your new payment method has been saved successfully.",
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof CardFormData, string>> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof CardFormData;
          if (field && !errors[field]) {
            errors[field] = err.message;
          }
        });
        setCardErrors(errors);
      }
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a new payment method to your account
          </DialogDescription>
        </DialogHeader>

        <PaymentCardPreview
          cardData={cardForm}
          isFlipped={focusedInput === "cvc"}
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardForm.cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              onFocus={() => setFocusedInput("cardNumber")}
              onBlur={() => {
                setFocusedInput(null);
                const error = validateField("cardNumber", cardForm.cardNumber);
                setCardErrors({
                  ...cardErrors,
                  cardNumber: error,
                });
              }}
              maxLength={19}
              className={`transition-all duration-200 ${
                focusedInput === "cardNumber"
                  ? "scale-105 ring-2 ring-[#7C3AED]"
                  : ""
              } ${cardErrors.cardNumber ? "border-red-500" : ""}`}
            />
            {cardErrors.cardNumber && (
              <p className="animate-in fade-in slide-in-from-top-1 text-xs text-red-500">
                {cardErrors.cardNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="JOHN DOE"
              value={cardForm.cardName}
              onChange={(e) =>
                handleCardNameChange(e.target.value.toUpperCase())
              }
              onFocus={() => setFocusedInput("cardName")}
              onBlur={() => {
                setFocusedInput(null);
                const error = validateField("cardName", cardForm.cardName);
                setCardErrors({
                  ...cardErrors,
                  cardName: error,
                });
              }}
              className={`transition-all duration-200 ${
                focusedInput === "cardName"
                  ? "scale-105 ring-2 ring-[#7C3AED]"
                  : ""
              } ${cardErrors.cardName ? "border-red-500" : ""}`}
            />
            {cardErrors.cardName && (
              <p className="animate-in fade-in slide-in-from-top-1 text-xs text-red-500">
                {cardErrors.cardName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={cardForm.expiryDate}
                onChange={(e) => handleExpiryDateChange(e.target.value)}
                onFocus={() => setFocusedInput("expiryDate")}
                onBlur={() => {
                  setFocusedInput(null);
                  const error = validateField(
                    "expiryDate",
                    cardForm.expiryDate,
                  );
                  setCardErrors({
                    ...cardErrors,
                    expiryDate: error,
                  });
                }}
                maxLength={5}
                className={`transition-all duration-200 ${
                  focusedInput === "expiryDate"
                    ? "scale-105 ring-2 ring-[#7C3AED]"
                    : ""
                } ${cardErrors.expiryDate ? "border-red-500" : ""}`}
              />
              {cardErrors.expiryDate && (
                <p className="animate-in fade-in slide-in-from-top-1 text-xs text-red-500">
                  {cardErrors.expiryDate}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cardForm.cvc}
                onChange={(e) => handleCVCChange(e.target.value)}
                onFocus={() => setFocusedInput("cvc")}
                onBlur={() => {
                  setFocusedInput(null);
                  const error = validateField("cvc", cardForm.cvc);
                  setCardErrors({
                    ...cardErrors,
                    cvc: error,
                  });
                }}
                maxLength={4}
                type="password"
                className={`transition-all duration-200 ${
                  focusedInput === "cvc"
                    ? "scale-105 ring-2 ring-[#7C3AED]"
                    : ""
                } ${cardErrors.cvc ? "border-red-500" : ""}`}
              />
              {cardErrors.cvc && (
                <p className="animate-in fade-in slide-in-from-top-1 text-xs text-red-500">
                  {cardErrors.cvc}
                </p>
              )}
            </div>
          </div>

          <div className="bg-accent/50 border-border flex items-center gap-2 rounded-lg border p-3">
            <Shield className="size-5 text-[#7C3AED]" />
            <p className="text-muted-foreground text-xs">
              Your payment information is encrypted and secure. We never store
              your full card details.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="bg-[#7C3AED] transition-all duration-200 hover:bg-[#7C3AED]/90 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAddPaymentMethod}
            disabled={!isCardFormValid() || isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : null}
            Add Payment Method
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
