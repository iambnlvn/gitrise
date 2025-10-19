import { CardType } from "./billing-types";

import type {
  Plan,
  Invoice,
  PaymentMethod,
  UsageStats,
  BillingState,
} from "./billing-types";

export const CARD_GRADIENTS: Record<CardType, string> = {
  visa: "from-blue-600/90 via-blue-700/80 to-blue-800/90",
  mastercard: "from-slate-800/95 via-slate-900/90 to-black/95",
  amex: "from-teal-600/95 via-teal-700/90 to-teal-800/95",
  discover: "from-orange-500/95 via-orange-600/90 to-red-700/95",
  unknown: "from-gray-700/95 via-gray-800/90 to-gray-900/95",
};

/**
 * Available subscription plans.
 */
export const PLANS: Plan[] = [
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

/**
 * Initial payment methods.
 */
export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "Mastercard",
    last4: "5555",
    expiry: "08/24",
    isDefault: false,
  },
];

/**
 * Sample invoices for billing history.
 */
export const INVOICES: Invoice[] = [
  {
    id: "inv_001",
    date: "2024-10-01",
    amount: 12.0,
    status: "paid",
    description: "Pro Plan - October 2024",
  },
  {
    id: "inv_002",
    date: "2024-09-01",
    amount: 12.0,
    status: "paid",
    description: "Pro Plan - September 2024",
  },
  {
    id: "inv_003",
    date: "2024-08-01",
    amount: 12.0,
    status: "paid",
    description: "Pro Plan - August 2024",
  },
];

/**
 * Default usage statistics.
 */
export const DEFAULT_USAGE: UsageStats = {
  repositories: 12,
  repositoriesLimit: 100,
  collaborators: 5,
  collaboratorsLimit: 10,
  storageUsed: 15.5,
  storageLimit: 50,
  buildMinutes: 450,
  buildMinutesLimit: 2000,
  bandwidthUsed: 120.75,
  bandwidthLimit: 500,
};

/**
 * Default billing state.
 */
export const DEFAULT_BILLING_STATE: BillingState = {
  currentPlan: "pro",
  paymentMethods: INITIAL_PAYMENT_METHODS,
  invoices: INVOICES,
  usage: DEFAULT_USAGE,
  isDownloading: null,
};

type UsageData = {
  date: string;
  storage: number;
  ciMinutes: number;
  bandwidth: number;
};

export const usageData: UsageData[] = [
  { date: "Jan 1", storage: 180, ciMinutes: 1200, bandwidth: 45 },
  { date: "Jan 8", storage: 195, ciMinutes: 1450, bandwidth: 52 },
  { date: "Jan 15", storage: 210, ciMinutes: 1680, bandwidth: 58 },
  { date: "Jan 22", storage: 230, ciMinutes: 1847, bandwidth: 68 },
  { date: "Jan 29", storage: 245, ciMinutes: 2100, bandwidth: 78 },
  { date: "Feb 5", storage: 260, ciMinutes: 2300, bandwidth: 85 },
  { date: "Feb 12", storage: 275, ciMinutes: 2500, bandwidth: 90 },
  { date: "Feb 19", storage: 290, ciMinutes: 2700, bandwidth: 95 },
  { date: "Feb 26", storage: 310, ciMinutes: 2900, bandwidth: 100 },
];
