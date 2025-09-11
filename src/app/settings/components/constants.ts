import { Invoice, PaymentMethod, Plan } from "../types";

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

export const PLANS: Plan[] = [
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
