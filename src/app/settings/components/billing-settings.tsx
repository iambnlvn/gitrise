"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CreditCard,
  Download,
  Zap,
  Users,
  HardDrive,
  Clock,
  HelpCircle,
  Loader2,
  Plus,
  Check,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

type PaymentMethod = {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
};

type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
  downloadUrl: string;
};

export function BillingSettings() {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: false,
    },
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: "jan-2025",
      date: "Jan 1, 2025",
      amount: 29.0,
      status: "paid",
      description: "Pro Plan - January 2025",
      downloadUrl: "#",
    },
    {
      id: "dec-2024",
      date: "Dec 1, 2024",
      amount: 29.0,
      status: "paid",
      description: "Pro Plan - December 2024",
      downloadUrl: "#",
    },
    {
      id: "nov-2024",
      date: "Nov 1, 2024",
      amount: 29.0,
      status: "paid",
      description: "Pro Plan - November 2024",
      downloadUrl: "#",
    },
  ]);

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      features: [
        "1 team member",
        "10 GB storage",
        "500 build minutes/month",
        "Community support",
      ],
      current: false,
    },
    {
      name: "Pro",
      price: 20,
      period: "month",
      features: [
        "Unlimited team members",
        "500 GB storage",
        "3,000 build minutes/month",
        "Priority support",
      ],
      current: true,
    },
    {
      name: "Enterprise",
      price: null,
      period: "custom",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Unlimited build minutes",
        "24/7 dedicated support",
        "SLA guarantee",
      ],
      current: false,
    },
  ];

  const handleDownloadInvoice = (invoiceId: string) => {
    setIsDownloading(invoiceId);
    setTimeout(() => {
      setIsDownloading(null);
      toast("Invoice downloaded", {
        description: "Your invoice has been downloaded successfully.",
      });
    });
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

  return (
    <TooltipProvider>
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
        <div>
          <h2 className="text-foreground text-2xl font-bold">Billing & Plan</h2>
          <p className="text-muted-foreground mt-1">
            Manage your subscription and billing information
          </p>
        </div>

        <Card className="border-[#947bd3]/20 bg-gradient-to-br from-[#947bd3]/10 to-[#b9a5e3]/5 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/10">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <Badge className="bg-[#947bd3] text-white">Current</Badge>
              </div>
              <p className="text-muted-foreground">
                $20/month • Billed monthly
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Next billing date: October 11, 2025
              </p>
            </div>
            <Button
              variant="outline"
              className="bg-transparent transition-all duration-200 hover:bg-[#947bd3] hover:text-white"
              onClick={() => setShowChangePlan(true)}
            >
              Change Plan
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
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

        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current Usage</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-6">
                    <HelpCircle className="text-muted-foreground size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Track your resource usage for the current billing period.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-muted-foreground text-sm">
                  245 GB / 500 GB
                </span>
              </div>
              <Progress value={49} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Build Minutes</span>
                <span className="text-muted-foreground text-sm">
                  1,847 / 3,000
                </span>
              </div>
              <Progress value={62} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Bandwidth</span>
                <span className="text-muted-foreground text-sm">
                  78 GB / 100 GB
                </span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent transition-all duration-200"
              onClick={() => setShowAddPayment(true)}
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
                    onClick={() => handleSetDefaultPayment(method.id)}
                    className="transition-all duration-200"
                  >
                    Set Default
                  </Button>
                )}
                {!method.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePayment(method.id)}
                    className="hover:text-destructive transition-all duration-200"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Billing History</h3>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent transition-all duration-200"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="border-border bg-accent/50 hover:bg-accent flex flex-col justify-between gap-3 rounded-lg border p-3 transition-all duration-200 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <p className="font-medium">{invoice.description}</p>
                  <p className="text-muted-foreground text-sm">
                    {invoice.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      invoice.status === "paid"
                        ? "border-green-500/20 bg-green-500/10 text-green-500"
                        : invoice.status === "pending"
                          ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                          : "border-red-500/20 bg-red-500/10 text-red-500"
                    }
                  >
                    {invoice.status}
                  </Badge>
                  <span className="font-semibold">
                    ${invoice.amount.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    disabled={isDownloading === invoice.id}
                    className="transition-all duration-200"
                  >
                    {isDownloading === invoice.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[#947bd3]/10 p-3">
              <Zap className="size-6 text-[#947bd3]" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-semibold">
                Upgrade to Enterprise
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Get unlimited everything, priority support, and advanced
                security features for your organization.
              </p>
              <Button className="bg-[#947bd3] text-white transition-all duration-200 hover:bg-[#a58ddb] hover:shadow-lg hover:shadow-[#947bd3]/30">
                Contact Sales
              </Button>
            </div>
          </div>
        </Card>

        <Dialog open={showChangePlan} onOpenChange={setShowChangePlan}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Change Plan</DialogTitle>
              <DialogDescription>
                Choose the plan that best fits your needs
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-6 transition-all duration-200 ${
                    plan.current
                      ? "border-[#947bd3] bg-[#947bd3]/5"
                      : "border-border hover:border-[#947bd3]/50"
                  }`}
                >
                  <div className="mb-4 text-center">
                    <h4 className="mb-2 text-xl font-bold">{plan.name}</h4>
                    {plan.price !== null ? (
                      <div>
                        <span className="text-3xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground">
                          /{plan.period}
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold">Custom</div>
                    )}
                  </div>

                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-[#947bd3]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.current ? "bg-[#947bd3] hover:bg-[#a58ddb]" : "bg-transparent"}`}
                    variant={plan.current ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current
                      ? "Current Plan"
                      : plan.price !== null
                        ? "Upgrade"
                        : "Contact Sales"}
                  </Button>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new credit or debit card
              </DialogDescription>
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
              <Button
                variant="outline"
                onClick={() => setShowAddPayment(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAddPayment(false);
                  toast("Payment method added", {
                    description: "Your new payment method has been saved.",
                  });
                }}
                className="bg-[#947bd3] hover:bg-[#a58ddb]"
              >
                Add Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
