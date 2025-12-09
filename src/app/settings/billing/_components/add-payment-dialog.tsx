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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Shield } from "lucide-react";
import { z } from "zod";
import { PaymentCardPreview } from "./payment-card-preview";
import { useIsMobile } from "@/hooks/use-mobile";

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

const formatters = {
  cardNumber: (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substring(0, 19);
  },
  expiryDate: (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  },
  cvc: (value: string) => value.replace(/\D/g, "").substring(0, 4),
  cardName: (value: string) => value.toUpperCase(),
} as const;

function PaymentForm({
  cardForm,
  cardErrors,
  onFieldChange,
  onFieldFocus,
  onFieldBlur,
  getInputClassName,
}: {
  cardForm: CardFormData;
  cardErrors: Partial<Record<keyof CardFormData, string>>;
  focusedInput: string | null;
  onFieldChange: (field: keyof CardFormData, value: string) => void;
  onFieldFocus: (field: string) => void;
  onFieldBlur: (field: keyof CardFormData) => void;
  getInputClassName: (field: keyof CardFormData) => string;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardForm.cardNumber}
            onChange={(e) => onFieldChange("cardNumber", e.target.value)}
            onFocus={() => onFieldFocus("cardNumber")}
            onBlur={() => onFieldBlur("cardNumber")}
            className={getInputClassName("cardNumber")}
            maxLength={19}
          />
          {cardErrors.cardNumber && (
            <p className="text-sm text-red-500">{cardErrors.cardNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input
            id="cardName"
            type="text"
            placeholder="JOHN DOE"
            value={cardForm.cardName}
            onChange={(e) => onFieldChange("cardName", e.target.value)}
            onFocus={() => onFieldFocus("cardName")}
            onBlur={() => onFieldBlur("cardName")}
            className={getInputClassName("cardName")}
          />
          {cardErrors.cardName && (
            <p className="text-sm text-red-500">{cardErrors.cardName}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={cardForm.expiryDate}
              onChange={(e) => onFieldChange("expiryDate", e.target.value)}
              onFocus={() => onFieldFocus("expiryDate")}
              onBlur={() => onFieldBlur("expiryDate")}
              className={getInputClassName("expiryDate")}
              maxLength={5}
            />
            {cardErrors.expiryDate && (
              <p className="text-sm text-red-500">{cardErrors.expiryDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              type="text"
              placeholder="123"
              value={cardForm.cvc}
              onChange={(e) => onFieldChange("cvc", e.target.value)}
              onFocus={() => onFieldFocus("cvc")}
              onBlur={() => onFieldBlur("cvc")}
              className={getInputClassName("cvc")}
              maxLength={4}
            />
            {cardErrors.cvc && (
              <p className="text-sm text-red-500">{cardErrors.cvc}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-muted/50 flex items-center gap-2 rounded-lg p-3">
        <Shield className="h-4 w-4 text-green-600" />
        <p className="text-muted-foreground text-sm">
          Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  );
}

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
  const isMobile = useIsMobile();
  const handleFieldChange = (field: keyof CardFormData, value: string) => {
    const formatter = formatters[field];
    const formattedValue = formatter ? formatter(value) : value;

    setCardForm((prev) => ({ ...prev, [field]: formattedValue }));
    setCardErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFieldFocus = (field: string) => {
    setFocusedInput(field);
  };

  const handleFieldBlur = (field: keyof CardFormData) => {
    setFocusedInput(null);
    try {
      cardSchema.shape[field].parse(cardForm[field]);
      setCardErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues[0]?.message || "";
        setCardErrors((prev) => ({ ...prev, [field]: errorMessage }));
      }
    }
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

  const getInputClassName = (field: keyof CardFormData) => {
    return `transition-all duration-200 ${
      focusedInput === field ? "scale-105 ring-2 ring-[#7C3AED]" : ""
    } ${cardErrors[field] ? "border-red-500" : ""}`;
  };
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Payment Method</DrawerTitle>
            <DrawerDescription>
              Add a new payment method to your account
            </DrawerDescription>
            <PaymentCardPreview
              cardData={cardForm}
              isFlipped={focusedInput === "cvc"}
            />
          </DrawerHeader>

          <div className="flex-1 overflow-auto px-4 pb-4">
            <PaymentForm
              cardForm={cardForm}
              cardErrors={cardErrors}
              focusedInput={focusedInput}
              onFieldChange={handleFieldChange}
              onFieldFocus={handleFieldFocus}
              onFieldBlur={handleFieldBlur}
              getInputClassName={getInputClassName}
            />
          </div>

          <DrawerFooter className="pt-2">
            <Button
              className="bg-[#7C3AED] transition-all duration-200 hover:bg-[#7C3AED]/90 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleAddPaymentMethod}
              disabled={!isCardFormValid() || isPending}
              size="lg"
            >
              {isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              Add Payment Method
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" size="lg" onClick={handleCancel}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a new payment method to your account
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <PaymentCardPreview
            cardData={cardForm}
            isFlipped={focusedInput === "cvc"}
          />
        </div>
        <PaymentForm
          cardForm={cardForm}
          cardErrors={cardErrors}
          focusedInput={focusedInput}
          onFieldChange={handleFieldChange}
          onFieldFocus={handleFieldFocus}
          onFieldBlur={handleFieldBlur}
          getInputClassName={getInputClassName}
        />

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
