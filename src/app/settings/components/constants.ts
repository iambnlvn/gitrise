import { Invoice, PaymentMethod } from "../types";

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
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
    last4: "2142",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2027,
    isDefault: false,
  },
];

export const INVOICES: Invoice[] = [
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
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    period: "month",
    features: [
      { name: "API Requests", value: "1,000/month" },
      { name: "Storage", value: "1 GB" },
      { name: "Build Minutes", value: "100/month" },
      { name: "Support", value: "Community" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "month",
    features: [
      { name: "API Requests", value: "10,000/month" },
      { name: "Storage", value: "5 GB" },
      { name: "Build Minutes", value: "1,000/month" },
      { name: "Support", value: "Priority Email" },
      { name: "Analytics", value: "Advanced" },
      { name: "Custom Domain", value: "Included" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    period: "month",
    features: [
      { name: "API Requests", value: "Unlimited" },
      { name: "Storage", value: "100 GB" },
      { name: "Build Minutes", value: "Unlimited" },
      { name: "Support", value: "24/7 Phone & Email" },
      { name: "Account Manager", value: "Dedicated" },
    ],
  },
];
