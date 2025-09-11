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

type AddPaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
};
// wish i got the css skills to make a payment card ui typa thing for this component
export function AddPaymentDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddPaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>Add a new credit or debit card</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input placeholder="1234 5678 9012 3456" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label>CVC</Label>
              <Input placeholder="123" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cardholder Name</Label>
            <Input placeholder="David Martinez" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-[#947bd3] hover:bg-[#a58ddb]"
          >
            Add Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
