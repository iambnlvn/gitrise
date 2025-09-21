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
    id: "free",
    name: "Free",
    period: "for ever",
    price: 0,
    features: [
      { name: "Private repositories", value: "Up to 3" },
      { name: "Public repositories", value: "Unlimited" },
      { name: "Collaborators", value: "1 per private repo" },
      { name: "Storage", value: "500 MB total" },
      { name: "CI/CD minutes", value: "200 per month" },
      { name: "Community support", value: true },
      { name: "Advanced code insights", value: false },
      { name: "Custom domain for Pages", value: false },
      { name: "Team management", value: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    period: "month",
    price: 12,
    features: [
      { name: "Private repositories", value: "Unlimited" },
      { name: "Public repositories", value: "Unlimited" },
      { name: "Collaborators", value: "Up to 10 per repo" },
      { name: "Storage", value: "5 GB total" },
      { name: "CI/CD minutes", value: "2000 per month" },
      { name: "Priority support", value: true },
      { name: "Advanced code insights", value: true },
      { name: "Code review automation", value: true },
      { name: "Team management", value: true },
      { name: "Custom domain for Pages", value: true },
      { name: "Access tokens & secrets management", value: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    period: "month",
    price: 49,
    features: [
      { name: "Private repositories", value: "Unlimited" },
      { name: "Collaborators", value: "Unlimited" },
      { name: "Storage", value: "Unlimited" },
      { name: "CI/CD minutes", value: "Unlimited" },
      { name: "Dedicated support & SLA", value: true },
      { name: "SSO / SAML integration", value: true },
      { name: "Advanced security & compliance", value: true },
      { name: "Audit logs", value: true },
      { name: "Organization management", value: true },
      { name: "Custom branding", value: true },
      { name: "Team analytics dashboard", value: true },
      { name: "Custom billing & invoicing", value: true },
    ],
  },
];
